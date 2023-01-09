import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function show(props) {
    const { title, body } = props.post;

    return (
        <div className='container w-3/4 mx-auto'>
            <div className='py-20 text-center'>
                <h1 className='pb-20 text-4xl font-bold text-gray-600 border-b-4'>
                    タスクの確認
                </h1>
            </div>
            <div className="block h-full p-6 bg-white rounded-lg shadow-lg max-w">
                <form>
                    <div className="mb-20 form-group">
                        <label className='inline-block mb-2 font-bold text-gray-700 form-label'>タイトル</label>
                        <input className="block w-full px-3 py-1.5 text-base font-normal
                                    text-gray-700 bg-white bg-clip-padding
                                    border border-solid border-gray-300 rounded
                                    transition ease-in-out m-0 focus:text-gray-700
                                    focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={title} readonly />
                    </div>
                    <div className="mb-20 form-group">
                        <label className='inline-block mb-2 font-bold text-gray-700 form-label'>本文</label>
                        <textarea cols="40" rows="4" value={body}
                            className="block w-full px-3 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" readonly />
                    </div>
                </form>
                <div className="py-10 text-center">
                    <Link
                        className="px-10 py-2 text-sm text-white bg-blue-700 rounded-lg"
                        href={route('post.index')}>
                        戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
