import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function Update(props) {

    const { editData } = props;
    console.log(editData);

    //ダイアログデータを登録
    const updateSchedule = async () => {
        //空なら弾く
        if (editData.sch_title == '') {
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/update', {
                id: editData.id,
                sch_category: editData.sch_category,
                sch_contents: editData.sch_contents,
                sch_date: editData.sch_date,
                sch_time: editData.sch_hour + ':' + editData.sch_min
            })
            .then((res) => {
                //戻り値をtodosにセット
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Button href='/calendar' onClick={updateSchedule}>更新</Button>
    );
}
