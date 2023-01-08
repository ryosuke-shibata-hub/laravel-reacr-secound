import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function show(props) {
    const { title, body } = props.post;

    return (
        <div className="p-4">
            <h1 className="mb-3 font-bold">{title}</h1>
            <div className="mb-3">{body}</div>
            <Link
                className="px-4 py-2 text-sm text-white bg-blue-700 rounded-lg"
                href={route('post.index')}>
                戻る
            </Link>
        </div>
    );
}
