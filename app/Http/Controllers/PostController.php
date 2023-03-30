<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){
       

        $posts = Post::with('user')->orderBy('created_at', 'DESC')->orderBy('id', 'DESC')->where('title', 'like', '%'.$request->search.'%')->orwhere('content', 'like', '%'.$request->search.'%');


        if ($request->has('with_deleted')) {
            $this->authorizeForUser($request->user('api'), 'view', Post::class);
        $posts = $posts->withTrashed();
        }

        $data['posts']=  $posts->Paginate($request->perPage); 

        return $this->sendResponse($data, 'Posts return successfully.',Response::HTTP_OK);

        }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Post::class);
        
        $validator = Validator::make($request->all(), [
            'title'=>'bail|required|min:10',
            'content'=>'bail|required|min:30',
            'image' => 'bail|required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }


        $post = new Post;


        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = Auth::user()->id;
        if ($request->has('image')) {
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('posts'), $imageName);
        $post->attachment = "/posts/".$imageName;
        }

    
       
       
        $post->save();

        $success['post'] =  $post ;

        return $this->sendResponse($success, 'Post Uploaded Successfully.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Post  $post)
    {
        $this->authorizeForUser($request->user('api'), 'view', Post::class);
     
        $data['post']=$post->load('user');
     return $this->sendResponse($data, 'Post return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post){
        $this->authorizeForUser($request->user('api'), 'update', Post::class);

        $validator = Validator::make($request->all(), [
            'title'=>'bail|required|min:10',
            'content'=>'bail|required|min:30',
            'image' => 'bail|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        if ($request->has('image')) {
            if (File::exists(public_path($post->attachment))) {
            unlink(public_path($post->attachment));
            }
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('posts'), $imageName);
            $post->attachment = "/posts/".$imageName;
            }
            
            $post->title = $request->title;
            $post->content = $request->content;
            $post->user_id = Auth::user()->id;        
    
            
            $post->update();
            return $this->sendResponse('Post Updated Successfully.',Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Post $post)
    {    
        $this->authorizeForUser($request->user('api'), 'delete', Post::class);
        $post->delete();
        return $this->sendResponse('Post Recycle Successfully.',Response::HTTP_OK);
    }


    public function restore(Request $request, Post $post){
        $this->authorizeForUser($request->user('api'), 'restore', Post::class);
        $post->restore();
        return $this->sendResponse('Post Restore Successfully.',Response::HTTP_OK);
    }

public function forcedelete(Request $request, Post $post){
    $this->authorizeForUser($request->user('api'), 'forceDelete', Post::class);
        if (File::exists(public_path($post->attachment))) {
        unlink(public_path($post->attachment));
        }
        $post->forceDelete();
        return $this->sendResponse('Post Deleted Successfully.',Response::HTTP_OK);

        }



}
