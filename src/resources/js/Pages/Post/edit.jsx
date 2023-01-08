import React from "react";
import PostForm from "@/Components/Post/Form";
// ..createとフォームを共通化する

export default function edit(props) {
    const { post, errors } = props;

    return (
        <PostForm type="edit" post={post} errors={errors}></PostForm>
    );
}
