import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function index() {
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const last = new Date(year, month, 0).getDate()
    const prevlast = new Date(year, month - 1, 0).getDate()

    const calendar = createCalendar(year, month)

    const onClick = n => () => {
        const nextMonth = month + n
        if (12 < nextMonth) {
            setMonth(1)
            setYear(year + 1)
        } else if (nextMonth < 1) {
            setMonth(12)
            setYear(year - 1)
        } else {
            setMonth(nextMonth)
        }
    }

    //スケジュールのデータ
    const [schedules, setSche] = useState([]);
    //画面読み込み時に1度だけ実行
    useEffect(() => {
        getPostData();
    }, []);
    //DB(バックエンド)からデータ一覧を取得
    const getPostData = () => {
        axios
            .post('/api/posts')
            .then(response => {
                setSche(response.data);
                console.log(response.data);
            }).catch(() => {
                console.log('通信に失敗しました');
            });
    }

    //データ格納用のから配列を作成
    let rows = [];
    //取得したスケジュールデータをrowに格納する
    schedules.map((post) =>
        rows.push({
            sch_id: post.id,
            sch_category: post.sch_category,
            sch_contents: post.sch_contents,
            sch_date: post.sch_date,
            sch_time: post.sch_time,
        })
    );

    //登録用ポップアップ
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //新規登録用データ配列
    const [formData, setFormData] = useState({ sch_category: '', sch_contents: '', sch_date: '', sch_hour: '', sch_min: '' });


    //入力値を一時保存
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        let datas = Object.assign({}, formData);
        setFormData(datas);
        console.log(formData);
    }
    return (
        <Fragment>
            <main>
                <div className="calender-header">
                    <h1>{`${year}年${month}月`}</h1>
                    <div className="calender-nav">
                        <button className="month_btn" onClick={onClick(-1)}>{'<先月'}</button>
                        <button className="month_btn" onClick={onClick(1)}>{'翌月>'}</button>
                    </div>
                </div>
                <table className="calender-table">
                    <thead>
                        <tr>
                            <th>
                                日
                            </th>
                            <th>
                                月
                            </th>
                            <th>
                                火
                            </th>
                            <th>
                                水
                            </th>
                            <th>
                                木
                            </th>
                            <th>
                                金
                            </th>
                            <th>
                                土
                            </th>
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
                                                    <div className="schedule-title" key={k} id={schedule.sch_id}>
                                                        {schedule.sch_contents}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            スケジュール登録
                        </DialogContentText>
                        <TextField margin="dense" id="sch_date" name="sch_date" label="予定日" type="text" fullWidth variant="standard" onChange={inputChange} />
                        <InputLabel id="sch_time_label">時刻</InputLabel>
                        <Select labelId="sch_hour" id="sch_hour_select" name="sch_hour" label="Hour" variant="standard" defaultValue="00" onChange={inputChange}>
                            <MenuItem value="00">00</MenuItem><MenuItem value="01">01</MenuItem>
                        </Select>
                        <Select labelId="sch_min" id="sch_min_select" name="sch_min" label="Min" variant="standard" defaultValue="00" onChange={inputChange}>
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="00">00</MenuItem><MenuItem value="01">01</MenuItem>
                        </Select>
                        <InputLabel id="sch_category_label">カテゴリー</InputLabel>
                        <Select labelId="sch_category" id="sch_category_select" name="sch_category" label="Category" variant="standard" defaultValue="勉強" onChange={inputChange}>
                            <MenuItem value="勉強">勉強</MenuItem>
                            <MenuItem value="案件">案件</MenuItem>
                            <MenuItem value="テスト">テスト</MenuItem>
                        </Select>
                        <TextField margin="dense" id="sch_contents" name="sch_contents" label="内容" type="text" fullWidth variant="standard" onChange={inputChange} />
                    </DialogContent>
                    <DialogActions className='container w-3/4 mx-auto'>
                        <Button variant="outlined" color="error" onClick={handleClose}>キャンセル</Button>
                        <Button variant="contained" color="success" onClick={handleClose}>登録</Button>
                    </DialogActions>
                </Dialog>
            </main >
        </Fragment>
    );
}

function createCalendar(year, month) {
    const first = new Date(year, month - 1, 1).getDay()

    return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
        return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
            const day = dayIndex + 1 + weekIndex * 7
            return day - first
        })
    })
}

function zeroPadding(num) {
    return ('0' + num).slice(-2);
}
// export default Example;

// if (document.getElementById('app')) {
//     ReactDOM.render(<Example />, document.getElementById('app'));
// }
