<?php

namespace App\Http\Controllers;

use App\Models\HomePackageSlider;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;



class HomePackageSliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
public function index(Request $request){

        if($request->perPage){
            $packages = HomePackageSlider::orderBy('id', 'DESC')->with('user');
            if ($request->has('with_deleted')) {
                $this->authorizeForUser($request->user('api'), 'view', HomePackageSlider::class);
            $packages = $packages->withTrashed();
            }
            $data['packages']=  $packages->Paginate($request->perPage); 
            }else{
            $data['packages']=HomePackageSlider::select('*', 'image as src')->get();
            }
            return $this->sendResponse($data, 'Home Package Slider return successfully.',Response::HTTP_OK);    
    
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
           
            'image' => 'bail|required_without:url|image|mimes:jpeg,png,jpg,gif|max:2048',
            'url'=> 'bail|required_without:image|url',
            'title'=> 'bail|required|min:3|max:50',
            'description'=> 'bail|required|min:10',
            'price'=> 'numeric|digits_between:3,8',

            
        ]);
    
       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
    
        $homepackageslider = new HomePackageSlider;
      
        $homepackageslider->user_id = Auth::user()->id;
        if ($request->has('image')) {
        $imageName = time().'.'.$request->image->extension();  
        $request->image->move(public_path('homepackage'), $imageName);
        $homepackageslider->image = "/homepackage/".$imageName;
        }
    
        if($request->has('url')){
            $homepackageslider->image = $request->url;
    
        }
        if($request->has('title')){
            $homepackageslider->title = $request->title;
    
        }
        if($request->has('description')){
            $homepackageslider->description = $request->description;
    
        }
        if($request->has('price')){
            $homepackageslider->price = $request->price;
    
        }
        if($request->has('days')){
            $homepackageslider->days = $request->days;
    
        }
    
    
       
       
        $homepackageslider->save();
    
        $success['homepackageslider'] =  $homepackageslider ;
    
        return $this->sendResponse($success, 'Home  Package Created Successfully.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HomePackageSlider  $homepackageslider
     * @return \Illuminate\Http\Response
     */
public function show(HomePackageSlider $homepackageslider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HomePackageSlider  $homepackageslider
     * @return \Illuminate\Http\Response
     */
public function edit(HomePackageSlider $homepackageslider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HomePackageSlider  $homepackageslider
     * @return \Illuminate\Http\Response
     */
public function update(Request $request, HomePackageSlider $homepackageslider)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'bail|image|mimes:jpeg,png,jpg,gif|max:2048',
            'url'=> 'bail|url',
            'title'=> 'bail|required|min:3|max:50',
            'description'=> 'bail|required|min:10',
            'price'=> 'numeric|digits_between:3,8',

        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
            }
          
            if ($request->has('image')) {
            if (File::exists(public_path($homepackageslider->image))) {
            unlink(public_path($homepackageslider->image));
            }
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('homepackage'), $imageName);
            $homepackageslider->image = "/homepackage/".$imageName;
            }
        
            if($request->has('url')){
                $homepackageslider->image = $request->url;
        
            }
            if($request->has('title')){
                $homepackageslider->title = $request->title;
        
            }
            if($request->has('description')){
                $homepackageslider->description = $request->description;
        
            }
            if($request->has('price')){
                $homepackageslider->price = $request->price;
        
            }
            if($request->has('days')){
                $homepackageslider->days = $request->days;
        
            }
        
            
            $homepackageslider->update();
            return $this->sendResponse('Home Package Slider Updated Successfully.',Response::HTTP_OK);
            
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HomePackageSlider  $homepackageslider
     * @return \Illuminate\Http\Response
     */
public function destroy(HomePackageSlider $homepackageslider){
    $homepackageslider->delete();
    return $this->sendResponse('Home Package Recycle Successfully.',Response::HTTP_OK);
 }

public function restore(HomePackageSlider $homepackageslider){
    $homepackageslider->restore();
    return $this->sendResponse('Home Package Restore Successfully.',Response::HTTP_OK);
 }

public function forcedelete(HomePackageSlider $homepackageslider){
        
        if (File::exists(public_path($homepackageslider->image))) {
            unlink(public_path($homepackageslider->image));
            }
    
        $homepackageslider->forceDelete();
        return $this->sendResponse('Home Package Deleted Successfully.',Response::HTTP_OK);
    }
}
