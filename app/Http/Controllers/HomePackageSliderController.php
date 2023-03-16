<?php

namespace App\Http\Controllers;

use App\Models\HomePackageSlider;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class HomePackageSliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if($request->perPage){
            $data['packages']= HomePackageSlider::orderBy('id', 'DESC')->Paginate($request->perPage);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HomePackageSlider  $homePackageSlider
     * @return \Illuminate\Http\Response
     */
    public function show(HomePackageSlider $homePackageSlider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HomePackageSlider  $homePackageSlider
     * @return \Illuminate\Http\Response
     */
    public function edit(HomePackageSlider $homePackageSlider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HomePackageSlider  $homePackageSlider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HomePackageSlider $homePackageSlider)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HomePackageSlider  $homePackageSlider
     * @return \Illuminate\Http\Response
     */
    public function destroy(HomePackageSlider $homePackageSlider)
    {
        //
    }
}
