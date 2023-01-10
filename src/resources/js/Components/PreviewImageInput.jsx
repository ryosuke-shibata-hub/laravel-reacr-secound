import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";

export default function PreviewImageInput(props) {
    console.log(props.title);
    //data
    const title = props.title || '画像プレビュー';
    const label = props.label || '画像を選択してください';
    const labelClassName = props.labelClassName || 'bg-gray-200 text-gray-700 text-sm font-bold py-2 px-4 rounded';
    const imageClassName = props.imageClassName || 'container w-3/4 mx-auto shadow-lg rounded ';
    const accept = props.accept || 'image/jpeg,image/png';
    const [imageData, setImageData] = useState(null);

    //Method
    const handleFileChange = e => {
        const files = e.target.files;

        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = e => {
                const imageData = e.target.result;
                setImageData(imageData);
                handleImageChange({
                    status: 'added',
                    file: file,
                    imageData: imageData,
                });
            }
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => {
        if (confirm('画像を削除します。よろしいですか？')) {
            setImageData(null);
            handleImageChange({
                status: 'removed',
                file: null,
                imageData: null
            });
        }
    };
    const handleImageChange = e => {
        if (typeof props.onImageChange === 'function') {
            props.onImageChange(e);
        }
    }

    return (
        <div className="p-5">
            <h1 className="pt-10 pb-10 text-4xl font-bold text-center text-gray-500 border-b-4">
                {title}
            </h1>
            <div className="p-3 pt-5 mb-2">
                <Link
                    className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-lg"
                    href="/">
                    戻る
                </Link>
            </div>
            <div className="pt-5 text-center">
                <label className={labelClassName}>
                    {label}
                    <input
                        type="file"
                        accept={accept}
                        style={{ display: 'none' }}
                        onChange={e => handleFileChange(e)}
                    />
                </label>
                {imageData &&
                    <div className="mt-5">
                        <img src={imageData} className={imageClassName} />
                        <button
                            type="button"
                            className="px-4 py-2 mt-5 font-bold text-white bg-red-500 border-b-4 border-red-700 rounded hover:bg-red-400 hover:border-red-500"
                            onClick={e => handleImageDelete(e)}>
                            削除
                        </button>
                    </div>
                }
            </div>
        </div>
    );

}
