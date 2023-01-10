import React from "react";
import PreviewImageInput from "@/Components/PreviewImageInput";

export default function index() {
    const handleImageChange = e => {
        console.log(e);
    };

    return (
        <div className="p-4">
            {/* <h1 className="mb-3 font-bold">&#x1F4DD;</h1> */}
            <PreviewImageInput onImageChange={e => handleImageChange(e)} />
        </div>
    );
}
