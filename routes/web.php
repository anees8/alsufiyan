<?php

use Illuminate\Support\Facades\Route;
use App\Models\Setting;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('unauthorized', function () {
    return response()->json(['message'=>'Unauthorized.'], 401);
})->name('unauthorized');

Route::get('/{any}', function () { 
    
    $data['title']=Setting::first()->CompanyName;
    $data['icon']=Setting::first()->logo;
   

    return view('App',$data); 
})->where('any','.*'); 

