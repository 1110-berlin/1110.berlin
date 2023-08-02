
import React from "react";

export default function CookieNotice(props) {

    return (
        <>
            <div className="xl:mb-6 xl:mr-6 absolute bottom-0 right-0 p-8 max-h-64 max-w-screen-md bg-black bg-opacity-50 backdrop-blur-xl rounded-lg drop-shadow-lg">
                <div className="mb-4">
                    <p className="font-semibold text-lg">We use cookies</p>
                </div>
                <div className="mb-5">
                    <p>We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from.</p>
                </div>
                <div className="mb-1">
                    <button className="bg-white rounded-full mr-2 pt-2 pb-3 px-4 font-medium">I agree</button>
                    <button className="bg-white rounded-full mr-2 pt-2 pb-3 px-4 font-medium">I decline</button>
                    <button className="font-medium underline">Change my preference</button>
                </div>
            </div>
        </>
    )
}