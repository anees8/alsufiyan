<?php

namespace App\Http\Controllers;

use App\Models\HomeCounter;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class HomeCounterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $data['counter']= HomeCounter::orderBy('id', 'ASC')->limit(4)->get();
        if ($request->has('permission')) {
        $this->authorizeForUser($request->user('api'), 'view', HomeCounter::class);
        }
        return $this->sendResponse($data, 'Home Counter return successfully.',Response::HTTP_OK);    
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
     * @param  \App\Models\HomeCounter  $homecounter
     * @return \Illuminate\Http\Response
     */
    public function show(HomeCounter $homecounter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HomeCounter  $homecounter
     * @return \Illuminate\Http\Response
     */
    public function edit(HomeCounter $homecounter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HomeCounter  $homecounter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HomeCounter $homecounter)
    {
       
        $validator = Validator::make($request->all(), [
           
            'counter'=> 'required|numeric|min:1',            
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
     
       
         $homecounter->counter=$request->counter;
        
        $homecounter->update();
        return $this->sendResponse('Home Counter Updated Successfully.',Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HomeCounter  $homecounter
     * @return \Illuminate\Http\Response
     */
    public function destroy(HomeCounter $homecounter)
    {
        //
    }
}
