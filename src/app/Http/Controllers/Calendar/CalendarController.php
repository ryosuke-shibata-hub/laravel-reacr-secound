<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class CalendarController extends Controller
{
    public function index()
    {
        return Inertia::render('Calendar/index',[
            'title' => 'カレンダーアプリ'
        ]);
    }
}