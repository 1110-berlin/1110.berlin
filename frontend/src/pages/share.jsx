import React from 'react';
import {
    S3Client,
    CreateMultipartUploadCommand,
    UploadPartCommand,
    CompleteMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const EncryptedMultipartFileUpload = () => {
    const subfolder = uuidv4();
    const handleUpload = async () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        const password = 'your-hardcoded-password';
        const bucketName = 'your-bucket-name';
        const region = 'your-region';

        const s3 = new S3Client({ region: region });

        const subfolder = uuidv4();
        const uploadId = await initiateMultipartUpload(s3, file.name, bucketName, subfolder);

        const chunkSize = 5 * 1024 * 1024; // 5MB chunks
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const { encryptedData, iv } = await encryptFileChunk(chunk, password);
            await uploadMultipartChunk(s3, file.name, uploadId, i + 1, encryptedData, iv, bucketName);
        }

        await completeMultipartUpload(s3, file.name, uploadId, bucketName);
    };

    async function initiateMultipartUpload(s3, key, bucketName, subfolder) {
        const command = new CreateMultipartUploadCommand({
            Bucket: bucketName,
            Key: `${subfolder}/${key}`
        });

        const response = await s3.send(command);
        return response.UploadId;
    }

    async function uploadMultipartChunk(s3, key, uploadId, partNumber, data, iv, bucketName) {
        const command = new UploadPartCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: data
        });

        await s3.send(command);
    }

    async function completeMultipartUpload(s3, key, uploadId, bucketName) {
        const command = new CompleteMultipartUploadCommand({
            Bucket: bucketName,
            Key: key,
            UploadId: uploadId
        });

        await s3.send(command);
    }

    async function encryptFileChunk(chunk, password) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
                iterations: 1000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv
            },
            derivedKey,
            await chunk.arrayBuffer()
        );

        return {
            iv,
            encryptedData
        };
    }

    return (
        <div>
            <p>{subfolder}</p>
            <input type="file" id="fileInput" accept=".txt, .jpg, .png" />
            <button onClick={handleUpload}>Upload Encrypted File</button>
        </div>
    );
};

export default EncryptedMultipartFileUpload;
