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
            'CompanyAlternatePhone'=> 'required|min:10|max:15',   
            'CompanyAdress'=>'required|min:10',
            'openingTime'=>'required|min:10',
            'about'=>'required|min:10',
            'poster'=>'required',
            'slogo'=>'required',
            'logo'=>'required',
            'facebook'=>'required',
            'youtube'=>'required',
            'whatsapp'=>'required',
            'footer'=>'required',
            'copyright'=>'required',           
            
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }




        if ($request->has('CompanyName')) {
            $setting->CompanyName = $request->CompanyName;
        }
        if ($request->has('email')) {
            $setting->email = $request->email;
        }
        if ($request->has('about')) {
            $setting->about = $request->about;
        }

      

        if ($request->has('CompanyPhone')) {
            $setting->CompanyPhone = $request->CompanyPhone;
        }
        if ($request->has('CompanyAlternatePhone')) {
            $setting->CompanyAlternatePhone = $request->CompanyAlternatePhone;
        }
        if ($request->has('CompanyAdress')) {
            $setting->CompanyAdress = $request->CompanyAdress;
        }

        if ($request->has('facebook')) {
            $setting->facebook = $request->facebook;
        }
        if ($request->has('youtube')) {
            $setting->youtube = $request->youtube;
        }
        if ($request->has('whatsapp')) {
            $setting->whatsapp = $request->whatsapp;
        }
        if ($request->has('footer')) {
            $setting->footer = $request->footer;
        }
        if ($request->has('copyright')) {
            $setting->copyright = $request->copyright;
        }

        if ($request->has('openingTime')) {
            $setting->openingTime = $request->openingTime;
        }

        
            if ($request->file('logo')) {
            if (File::exists(public_path($setting->logo))) {
            unlink(public_path($setting->logo));
            }
            $logoName = time().'logo.'.$request->logo->extension();  
            $request->logo->move(public_path('logo'), $logoName);
            $setting->logo = "/logo/".$logoName;
            }

            

            if ($request->file('slogo')) {
            if (File::exists(public_path($setting->slogo))) {
            unlink(public_path($setting->slogo));
            }
            $slogoName = time().'slogo.'.$request->slogo->extension();  
            $request->slogo->move(public_path('logo'), $slogoName);
            $setting->slogo = "/logo/".$slogoName;
            }

            if ($request->file('poster')) {
            if (File::exists(public_path($setting->poster))) {
            unlink(public_path($setting->poster));
            }
            $posterName = time().'poster.'.$request->poster->extension();  
            $request->poster->move(public_path('poster'), $posterName);
            $setting->poster = "/poster/".$posterName;
            }
        $setting->update();
        return $this->sendResponse($setting,'Settings Updated Successfully',Response::HTTP_OK);

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
