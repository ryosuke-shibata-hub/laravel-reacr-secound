import React, { useState } from "react";
import Label from "@/Components/Label";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Loading from "@/Components/Loading";
import _from from "lodash";

export default function Form(props) {
    //Data
    const type = props.type; //create or edit
    const post = props.post;
    const errors = props.errors;
    const { data, setData } = useForm({
        title: _.get(post, 'title', ''),
        body: _.get(post, 'body', ''),
    });
    const [Loading, setLoading] = useState(false);

    //Method
    const onFinish = () => setLoading(false);
    const onSubmit = () => {
        setLoading(true);

        if (type === 'create') { //登録(create) or 変更(edit)で切り替え
            const url = route('post.store');
            Inertia.post(url, data, { onFinish });
        } else if (type === 'edit') {
            const url = route('post.update', props.post.id);
            Inertia.put(url, data, { onFinish });
        }
    };

    return (
        <div className="p-4">
            <div className="mb-3">
                <label>タイトル</label>
                <input
                    className="p-2 border border-gray-500 rounded w-80"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                />
                {errors.title &&
                    <div className="p-2 mt-2 text-red-500 bg-red-100 rounded">{errors.title}</div>
                }
            </div>
            <div className="mb-3">
                <label>本文</label>
                <textarea
                    className="p-2 border border-gray-500 rounded w-80"
                    value={data.body}
                    onChange={e => settttttData('body', e.target.value)}
                />
                {errors.body &&
                    <div className="p-2 mt-2 text-red-500 bg-red-100 rounded">{errors.body}</div>
                }
            </div>
            <button
                type="button"
                className="px-4 py-2 mr-5 text-sm text-white bg-blue-700 rounded-lg"
                onClick={onSubmit}>
                送信する
            </button>
            <Link href={route('post.index')}>戻る</Link>
            <br />
            <Loading show={Loading}></Loading>
        </div>
    );
}
