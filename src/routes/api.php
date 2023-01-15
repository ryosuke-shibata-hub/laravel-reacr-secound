<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ScheduleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware'=>'api'],function(){
    Route::post('/posts', [ScheduleController::class, 'scheduleindex'])->name('schedule_index');//表示用
    Route::post('/posts/create', [ScheduleController::class, 'create'])->name('schedule_create');//登録用
    Route::post('/edit',  [ScheduleController::class, 'edit'])->name('schedule_edit');//更新画面
    Route::post('/update',  [ScheduleController::class, 'update'])->name('schedule_update');//更新処理
    Route::post('/delete',  [ScheduleController::class, 'delete'])->name('schedule_delete');//削除処理
});