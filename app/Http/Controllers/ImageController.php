<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Validator;

class ImageController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){

        $images = Image::select('*','image_url as src')->with('user')->orderBy('id', 'DESC');
        if ($request->has('with_deleted')) {
           
            $this->authorizeForUser($request->user('api'), 'view', Image::class);
        $images = $images->withTrashed();
        }
        $data['images']=  $images->Paginate($request->perPage); 
        return $this->sendResponse($data, 'Images return successfully.',Response::HTTP_OK);

        }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
public function create(){
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
public function store(Request $request){
     
    $this->authorizeForUser($request->user('api'), 'create', Image::class);
        $validator = Validator::make($request->all(), [
           
            'image' => 'bail|required_without:url|image|mimes:jpeg,png,jpg,gif|max:2048',
            'url'=> 'bail|required_without:image|url',
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        $image = new Image;
      
        $image->user_id = Auth::user()->id;
        if ($request->has('image')) {
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('gallery'), $imageName);
        $image->image_url = "/gallery/".$imageName;
        }

        if($request->has('url')){
            $image->image_url = $request->url;

        }

       
       
        $image->save();

        $success['image'] =  $image ;

        return $this->sendResponse($success, 'Image Uploaded Successfully.',Response::HTTP_CREATED);

   
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
public function show(Image $image){
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
public function edit(Image $image){
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
public function update(Request $request,Image $image){  
    $this->authorizeForUser($request->user('api'), 'update', Image::class);
        $validator = Validator::make($request->all(), [
            'image' => 'bail|required_without:url|image|mimes:jpeg,png,jpg,gif|max:2048',
            'url'=> 'bail|required_without:image|url',
        ]);
        if($validator->fails()){
        return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
      
        if ($request->has('image')) {
        if (File::exists(public_path($image->image_url))) {
        unlink(public_path($image->image_url));
        }
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('gallery'), $imageName);
        $image->image_url = "/gallery/".$imageName;
        }

        if($request->has('url')){
            $image->image_url = $request->url;

        }

        
        $image->update();
        return $this->sendResponse('Image Updated Successfully.',Response::HTTP_OK);
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
public function destroy(Image $image){
    $this->authorizeForUser($request->user('api'), 'delete', Image::class);
    $image->delete();
    return $this->sendResponse('Image Recycle Successfully.',Response::HTTP_OK);
    }

public function restore(Image $image){

    $this->authorizeForUser($request->user('api'), 'restore', Image::class);
    $image->restore();
    return $this->sendResponse('Image Restore Successfully.',Response::HTTP_OK);
    }

public function forcedelete(Image $image){
    $this->authorizeForUser($request->user('api'), 'forceDelete', Image::class);
    if (File::exists(public_path($image->image_url))) {
    unlink(public_path($image->image_url));
    }

    $image->forceDelete();
    return $this->sendResponse('Image Deleted Successfully.',Response::HTTP_OK);
    }



    
}