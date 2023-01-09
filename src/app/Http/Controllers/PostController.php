<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::orderBy('updated_at', 'desc')
            ->paginate(10);

        return Inertia::render('Post/index', [
            'title' => 'ToDoアプリ',
            'posts' => $posts,
            'message' => session('message'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Post/create');
    }

    public function store(PostRequest $request)
    {
        $post = new Post();
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('post.index')
            ->with(['message' => '登録が完了しました']);
    }

    public function show(Post $post)
    {
        return Inertia::render('Post/show', [
            'post' => $post
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Post/edit', [
            'post' => $post
        ]);
    }

    public function update(PostRequest $request, Post $post)
    {
        $post->title = $request->title;
        $post->body = $request->body;
        $post->save();

        return redirect()->route('post.index')
        ->with([
            'message' => '変更が完了しました',
        ]);
    }

    public function destroy(Request $request, Post $post)
    {
        $post->delete();

        //ページ番号付きでリダイレクト(削除時代にページ移動してしまわないため)
        return redirect()
        ->route('post.index', ['page' => $request->page])
        ->with('message', '削除が完了しました');
    }
}