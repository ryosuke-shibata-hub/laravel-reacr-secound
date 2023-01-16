import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "@inertiajs/inertia-react";
import axios from 'axios';
import { zeroPadding } from "./Common/common";
import Registerdis from "./Register/register_dis";
import Updatedis from "./Update/update_dis";
import Navigation from "./Navigation/navigation";
import GetSchedule from "./Schedule/get_schedule";

export default function index(props) {
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const last = new Date(year, month, 0).getDate()
    const prevlast = new Date(year, month - 1, 0).getDate()

    const calendar = createCalendear(year, month)

    //スケジュールのデータを取得する
    let rows = GetSchedule();

    //登録用ポップアップ開閉処理
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //新規登録用データ配列
    const [formData, setFormData] = useState({ sch_category: '', sch_contents: '', sch_date: '', sch_hour: '', sch_min: '' });

    //更新用ダイアログ開閉機能
    const [editopen, setEditOpen] = useState(false);

    const editHandleClickOpen = (e) => {
        e.stopPropagation();
        setEditOpen(true);
        getEditData(e);
    };

    const editHandleClose = () => {
        setEditOpen(false);
    };

    //更新用のデータ配列
    const [editData, setEditData] = useState({ id: '', sch_category: '', sch_contents: '', sch_date: '', sch_hour: '', sch_min: '' });

    //バックエンドからデータ一覧を取得
    function getEditData(e) {
        axios
            .post('/api/edit', {
                id: e.currentTarget.id
            })
            .then(res => {
                setEditData({
                    id: res.data.id,
                    sch_category: res.data.sch_category,
                    sch_contents: res.data.sch_contents,
                    sch_date: res.data.sch_date,
                    sch_hour: res.data.sch_time.substr(0, 2),
                    sch_min: res.data.sch_time.substr(3, 2)
                });
            })
            .catch(() => {
                console.log('更新の通信に失敗しました');
            });
    }

    console.log(editData);

    return (
        <Fragment>
            <div className="p-5">
                <h1 className="pt-10 pb-10 text-4xl font-bold text-center text-gray-500 border-b-4">{props.title}</h1>
                <div className="flex justify-between">
                    <div className="p-3 pt-5 mb-2">
                        <Link
                            className="px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-lg"
                            href="/">
                            戻る
                        </Link>
                    </div>
                </div>
            </div>
            <Navigation year={year} month={month} setYear={setYear} setMonth={setMonth} />
            <table className="calender-table">
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, i) => (
                        <tr key={week.join('')}>
                            {week.map((day, j) => (
                                <td key={`${i}${j}`} id={day} onClick={handleClickOpen}>
                                    <div>
                                        <div>
                                            {day > last ? day - last : day <= 0 ? prevlast + day : day}
                                        </div>
                                        <div className="schedule-area">
                                            {rows.map((schedule, k) => (
                                                schedule.sch_date == year + '-' + zeroPadding(month) + '-' + zeroPadding(day) &&
                                                <div className='schedule-title' key={k} onClick={editHandleClickOpen} id={schedule.sch_id}>{schedule.sch_contents}</div>

                                            ))}
                                        </div>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Registerdis
                open={open}
                onClose={handleClose}
                data={formData}
                setFormData={setFormData}
            />
            <Updatedis
                open={editopen}
                onClose={editHandleClose}
                data={editData}
                setEditData={setEditData}
            />
        </Fragment>
    );
}

function createCalendear(year, month) {
    const first = new Date(year, month - 1, 1).getDay()

    return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
        return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first
        })
    })
}
