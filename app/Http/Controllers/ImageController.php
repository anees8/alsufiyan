<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Validator;

class ImageController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){

        $data['images']= Image::select('*','image_url as src')->with('user')->orderBy('id', 'DESC')->Paginate($request->perPage);
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
       
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        if ($request->has('image')) {
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('gallery'), $imageName);
        }

        $image = new Image;
        $image->image_url = "/gallery/".$imageName;
        $image->user_id = Auth::user()->id;
       
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
        $validator = Validator::make($request->all(), [
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if($validator->fails()){
        return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
        if ($request->has('image')) {
        unlink(public_path($image->image_url));
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('gallery'), $imageName);
        $image->image_url = "/gallery/".$imageName;
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
    unlink(public_path($image->image_url));
    $image->delete();
    return $this->sendResponse('Image Deleted Successfully.',Response::HTTP_OK);
    }
}