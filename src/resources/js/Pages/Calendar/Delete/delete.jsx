import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Delete(props) {

    const { editData } = props;

    //削除用
    const deletePost = async (e) => {
        //削除機能
        await axios
            .post('/api/delete', {
                id: editData.id
            })
            .then((res) => {
                this.setState({
                    posts: res.posts
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Button href='/calendar' onClick={deletePost}>削除</Button>
    );
}
