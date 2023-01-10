import React, { useState } from 'react';
// import Label from "@/Components/Label";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Loading from "@/Components/Loading";
import _ from 'lodash';

export default function Form(props) {

    // Data
    const type = props.type; // create or edit
    const post = props.post;
    const errors = props.errors;
    const { data, setData } = useForm({
        title: _.get(post, 'title', ''),
        body: _.get(post, 'body', ''),
    });
    const [loading, setLoading] = useState(false);

    // Methods
    const onFinish = () => setLoading(false);
    const onSubmit = () => {

        setLoading(true);

        if (type === 'create') { // 登録 or 変更で切り替える

            const url = route('post.store');
            Inertia.post(url, data, { onFinish });

        } else if (type === 'edit') {

            const url = route('post.update', props.post.id);
            Inertia.put(url, data, { onFinish });

        }

    };

    return (
        <div className='container w-3/4 mx-auto'>
            <div className='py-20 text-center'>
                <h1 className='pb-20 text-4xl font-bold text-gray-600 border-b-4'>
                    {/* typeによってタイトルを変更 */}
                    {props.type === 'create' && ('タスクの新規作成')}
                    {props.type === 'edit' && ('タスクの変更')}
                </h1>
            </div>
            <div className="block h-full p-6 bg-white rounded-lg shadow-lg max-w">
                <form>
                    <div className="mb-20 form-group">
                        <label className='inline-block mb-2 font-bold text-gray-700 form-label'>タイトル</label>
                        <input value={data.title} onChange={e => setData('title', e.target.value)}
                            className="block w-full px-3 py-1.5 text-base font-normal
                                    text-gray-700 bg-white bg-clip-padding
                                    border border-solid border-gray-300 rounded
                                    transition ease-in-out m-0 focus:text-gray-700
                                    focus:bg-white focus:border-blue-600 focus:outline-none" />
                        {errors.title && <div className="p-2 mt-2 text-red-500 bg-red-100 rounded">{errors.title}</div>}
                    </div>
                    <div className="mb-20 form-group">
                        <label className='inline-block mb-2 font-bold text-gray-700 form-label'>本文</label>
                        <textarea cols="40" rows="4" value={data.body} onChange={e => setData('body', e.target.value)}
                            className="block w-full px-3 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                        {errors.body && <div className="p-2 mt-2 text-red-500 bg-red-100 rounded">{errors.body}</div>}
                    </div>
                    <div className='pt-20 text-center'>
                        <Link className="inline-block px-10 py-2 mx-10 text-xs font-medium leading-tight text-gray-800 uppercase transition duration-150 ease-in-out border-2 border-gray-800 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                            href={route('post.index')}>戻る
                        </Link>
                        <button type="button" onClick={onSubmit}
                            className="inline-block px-10 py-2 mx-10 text-xs font-medium leading-tight text-green-500 uppercase transition duration-150 ease-in-out border-2 border-green-500 rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0">送信する
                        </button>
                    </div>
                    <br />
                    <Loading show={loading}></Loading>
                </form>
            </div>
        </div>
    );

}
