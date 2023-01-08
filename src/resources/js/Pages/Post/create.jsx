import React from "react";
import PostForm from "@/Components/Post/Form";
//editとフォームを共通化する
export default function create(props) {
    const { post, errors } = props;
    return (
        <PostForm type="create" post={post} errors={errors}></PostForm>
    );
}
