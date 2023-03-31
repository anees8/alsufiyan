<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
       
        $data['settings'] = Setting::first();

        return $this->sendResponse($data, 'settings  return successfully.',Response::HTTP_OK);
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
      
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        
        $validator = Validator::make($request->all(), [

            'CompanyName'=>'required|min:3|max:25',
            'email' => 'required|email',
            'CompanyPhone'=> 'required|min:10|max:15',     
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }



            if ($request->file('logo')) {
            if (File::exists(public_path($setting->logo))) {
            unlink(public_path($setting->logo));
            }
            $logoName = time().'.'.$request->logo->extension();  
            $request->logo->move(public_path('logo'), $logoName);
            $setting->logo = "/logo/".$logoName;
            }


            if ($request->file('slogo')) {
            if (File::exists(public_path($setting->slogo))) {
            unlink(public_path($setting->slogo));
            }
            $slogoName = time().'.'.$request->slogo->extension();  
            $request->slogo->move(public_path('logo'), $slogoName);
            $setting->slogo = "/logo/".$slogoName;
            }

        $setting->update();
        return $this->sendResponse('Settings Updated Successfully.',Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
