import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";

export default function index(props) {
    //Data
    const { message } = props;
    //Method
    const onDelete = id => {
        if (confirm('削除します。よろしいですか？')) {
            const url = route('post.destroy', id);
            const params = {
                _method: 'delete',
                page: props.posts.current_page
            };
            //delete()ではパラメーターを送信できないからあえてpost()を使う
            Inertia.post(url, params);
        }
    };

    return (
        <div className="p-5">
            <h1 className="pt-10 pb-10 text-4xl font-bold text-center text-gray-500 border-b-4">{props.title}</h1>
            {
                message &&
                <div id="message" className="p-3 mt-2 text-green-700 bg-green-100 rounded-lg">
                    {message}
                </div>
            }
            <div className="flex justify-between">
                <div className="p-3 pt-5 mb-2">
                    <Link
                        className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-lg"
                        href="/">
                        戻る
                    </Link>
                </div>
                <div className="p-3 pt-5 mb-2">
                    <Link
                        className="px-4 py-2 mr-2 text-sm text-white bg-green-700 rounded-lg"
                        href={route('post.create')}>
                        + 追加する
                    </Link>
                </div>
            </div>

            <table className="w-full bg-white">
                <thead className="bg-bulue-100">
                    <tr className="bg-green-300 border-2 border-gray-400">
                        <th>ID</th>
                        <th>タイトル</th>
                        <th>内容</th>
                        <th>操作</th>
                        <th>更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {props.posts.data.map(post => (
                        <tr key={post.id}>
                            <td className="p-2 text-center border-2 border-gray-400">{post.id}</td>
                            <td className="p-2 text-center border-2 border-gray-400 w-75">{post.title}</td>
                            <td className="p-2 text-center border-2 border-gray-400 w-96">{post.body}</td>
                            <td className="p-2 text-center border-2 border-gray-400 w-96">
                                <Link
                                    className="px-4 py-2 mr-2 text-sm text-white bg-gray-400 rounded-lg"
                                    href={route('post.show', { id: post.id })}>
                                    確認
                                </Link>
                                <Link
                                    className="px-4 py-2 mr-2 text-sm text-white bg-blue-700 rounded-lg"
                                    href={route('post.edit', { id: post.id })}>
                                    変更
                                </Link>
                                <button
                                    className="px-4 py-2 mr-2 text-sm text-white bg-red-700 rounded-lg"
                                    onClick={() => onDelete(post.id)}>
                                    削除
                                </button>
                            </td>
                            <td className="w-56 p-2 text-center border-2 border-gray-400 ">{Date(post.updated_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Pagination data={props.posts} />
            </div>
        </div>
    )
}
