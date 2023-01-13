<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Events\ChatMessageCreated;
use App\Http\Resources\ChatResource;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Log;

class ChatController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat/index');
    }

    public function list()
    {
        $chat_message = ChatMessage::with('user')
            ->limit(10)
            ->latest()//新着順
            ->get();

        return ChatResource::collection($chat_message);
    }

    public function store(Request $request)
    {
        $chat_message = new ChatMessage();
        $chat_message->user_id = auth()->id();
        $chat_message->message = $request->message;
        $chat_message->save();

        ChatMessageCreated::dispatch($chat_message);//ブロードキャストを実行する

        return to_route('chat.index');
    }

}