<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;


class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){


       
        $videos = Video::select('*','video_url as src')->with('user')->orderBy('id', 'DESC');
        if ($request->has('with_deleted')){
            $this->authorizeForUser($request->user('api'), 'view', Video::class);
        $videos = $videos->withTrashed();
        }
        $data['videos']=  $videos->Paginate($request->perPage); 
        return $this->sendResponse($data, 'Videos return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
public function create()
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
        
        $validator = Validator::make($request->all(), [
           
            'video' => 'bail|required_without:url|mimes:mp4,mov,ogg|max:20000',
            'url'=> 'bail|required_without:video|url',
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        $video = new Video;
      
        $video->user_id = Auth::user()->id;
        if ($request->has('video')) {
        $videoName = time().'.'.$request->video->extension();  
        $request->video->move(public_path('Videos'), $videoName);
        $video->video_url = "/Videos/".$videoName;
        }

        if($request->has('url')){
            $video->video_url = $request->url;

        }

       
       
        $video->save();

        $success['video'] =  $video ;

        return $this->sendResponse($success, 'Video Uploaded Successfully.',Response::HTTP_CREATED);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
public function show(Video $video)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
public function edit(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
public function update(Request $request, Video $video)
    {
        
        $validator = Validator::make($request->all(), [
            'video' => 'bail|required_without:url|mimes:mp4,mov,ogg|max:20000',
            'url'=> 'bail|required_without:video|url',
        ]);
        if($validator->fails()){
        return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
        
        if ($request->has('video')) {
        if (File::exists(public_path($video->video_url))) {
        unlink(public_path($video->video_url));
        }
        $videoName = time().'.'.$request->video->extension();  
        $request->video->move(public_path('Videos'), $videoName);
        $video->video_url = "/Videos/".$videoName;
        }

        if($request->has('url')){
            $video->video_url = $request->url;

        }

        
        $video->update();
        return $this->sendResponse('Video Updated Successfully.',Response::HTTP_OK);
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
public function destroy(Video $video){
    $video->delete();
    return $this->sendResponse('Video Recycle Successfully.',Response::HTTP_OK);
    }

public function restore(Video $video){
    $video->restore();
    return $this->sendResponse('Video Restore Successfully.',Response::HTTP_OK);
    }

public function forcedelete(Video $video){
    if (File::exists(public_path($video->video_url))) {
    unlink(public_path($video->video_url));
    }
    $video->forceDelete();
    return $this->sendResponse('Video Deleted Successfully.',Response::HTTP_OK);
    }

}
