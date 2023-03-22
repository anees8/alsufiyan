<?php

namespace App\Http\Controllers;

use App\Models\HomeSlider;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use Validator;


class HomeSliderController extends Controller{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){

    if($request->perPage){

        $sliders = HomeSlider::orderBy('id', 'DESC')->with('user');
        if ($request->has('with_deleted')) {
        $sliders = $sliders->withTrashed();
        }
        $data['sliders']=  $sliders->Paginate($request->perPage); 

    }else{
    $data['sliders']=HomeSlider::select('*', 'image as src')->get();
    }
    return $this->sendResponse($data, 'Slider Image return successfully.',Response::HTTP_OK);    
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
public function store(Request $request){
        
    $validator = Validator::make($request->all(), [
           
        'image' => 'bail|required_without:url|image|mimes:jpeg,png,jpg,gif|max:2048',
        'url'=> 'bail|required_without:image|url',
    ]);

   
    if($validator->fails()){
        return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
    }

    $homeslider = new HomeSlider;
  
    $homeslider->user_id = Auth::user()->id;
    if ($request->has('image')) {
    $imageName = time().'.'.$request->image->extension();  
    $request->image->move(public_path('homeslider'), $imageName);
    $homeslider->image = "/homeslider/".$imageName;
    }

    if($request->has('url')){
        $homeslider->image = $request->url;

    }
    if($request->has('content')){
        $homeslider->content = $request->content;

    }


   
   
    $homeslider->save();

    $success['homeslider'] =  $homeslider ;

    return $this->sendResponse($success, 'Home  Slider Uploaded Successfully.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HomeSlider  $homeslider
     * @return \Illuminate\Http\Response
     */
public function show(HomeSlider $homeslider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HomeSlider  $homeslider
     * @return \Illuminate\Http\Response
     */
public function edit(HomeSlider $homeslider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HomeSlider  $homeslider
     * @return \Illuminate\Http\Response
     */
public function update(Request $request, HomeSlider $homeslider){
    $validator = Validator::make($request->all(), [
        'image' => 'bail|image|mimes:jpeg,png,jpg,gif|max:2048',
        'url'=> 'bail|url',
    ]);
    if($validator->fails()){
    return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
    }
  
    if ($request->has('image')) {
    if (File::exists(public_path($homeslider->image))) {
    unlink(public_path($homeslider->image));
    }
    $imageName = time().'.'.$request->image->extension();  
    $request->image->move(public_path('homeslider'), $imageName);
    $homeslider->image = "/homeslider/".$imageName;
    }

    if($request->has('url')){
        $homeslider->image = $request->url;

    }
    if($request->has('content')){
        $homeslider->content = $request->content;

    }

    
    $homeslider->update();
    return $this->sendResponse('Home Slider Updated Successfully.',Response::HTTP_OK);
    


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HomeSlider  $homeslider
     * @return \Illuminate\Http\Response
     */
public function destroy(HomeSlider $homeslider){
        $homeslider->delete();
        return $this->sendResponse('Home Slider Recycle Successfully.',Response::HTTP_OK);
    }

public function restore(HomeSlider $homeslider){    
        $homeslider->restore();
        return $this->sendResponse('Home Slider Restore Successfully.',Response::HTTP_OK);
    }

public function forcedelete(HomeSlider $homeslider){
        
    if (File::exists(public_path($homeslider->image))) {
    unlink(public_path($homeslider->image));
    }
    $homeslider->forceDelete();
    return $this->sendResponse('Home Slider Deleted Successfully.',Response::HTTP_OK);
    }
}
