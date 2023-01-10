<?php

namespace App\Http\Controllers\ImagePrevew;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImagePreviewContoller extends Controller
{
    public function index()
    {
        return Inertia::render('PreviewImageInput/index',[
            'title' => '画像プレビュー',
        ]);
    }
}