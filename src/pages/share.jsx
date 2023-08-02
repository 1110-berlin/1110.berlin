import React, { useState } from 'react';
import AWS from 'aws-sdk';


const S3_BUCKET = 'YOUR_BUCKET_NAME_HERE';
const REGION = 'YOUR_DESIRED_REGION_HERE';


AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY_HERE',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY_HERE'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})


const SharePage = () => {

    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }


    document.getElementById('uploadButton').addEventListener('click', async () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        const password = 'your-hardcoded-password'; // Replace with your password

        const bucketName = 'your-bucket-name'; // Replace with your bucket name
        const region = 'your-region'; // Replace with your region

        const s3 = new AWS.S3({
            apiVersion: '2006-03-01',
            params: { Bucket: bucketName }
        });

        // Initiate multipart upload
        const uploadId = await initiateMultipartUpload(s3, file.name);

        const chunkSize = 5 * 1024 * 1024; // 5MB chunks
        const totalChunks = Math.ceil(file.size / chunkSize);
        // Process and upload chunks
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            const { encryptedData, iv } = await encryptFileChunk(chunk, password);

            // Upload encrypted chunk
            await uploadMultipartChunk(s3, file.name, uploadId, i + 1, encryptedData, iv);
        }

        // Complete multipart upload
        await completeMultipartUpload(s3, file.name, uploadId);
    });

    async function initiateMultipartUpload(s3, key) {
        const params = {
            Key: key
        };
        const result = await s3.createMultipartUpload(params).promise();
        return result.UploadId;
    }

    async function uploadMultipartChunk(s3, key, uploadId, partNumber, data, iv) {
        const params = {
            Key: key,
            UploadId: uploadId,
            PartNumber: partNumber,
            Body: data
        };
        await s3.uploadPart(params).promise();
    }

    async function completeMultipartUpload(s3, key, uploadId) {
        const params = {
            Key: key,
            UploadId: uploadId
        };
        await s3.completeMultipartUpload(params).promise();
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

    const uploadFile = (file) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    return (
        <>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <input type="file" accept=".txt, .jpg, .png" onChange={handleFileInput} />
            <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
        </>
    )
}

export default SharePage





