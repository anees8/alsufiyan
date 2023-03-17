<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactSubjectController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\HomeSliderController;
use App\Http\Controllers\HomePackageSliderController;
use App\Http\Controllers\HomeCounterController;







/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




Route::post('/login', [UsersController::class, 'login']);
// Route::post('/register', [UsersController::class, 'store']);


Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('users', UsersController::class);
        Route::resource('posts', PostController::class);
        Route::resource('images', ImageController::class);
        Route::resource('videos', VideoController::class);
        Route::resource('contacts', ContactController::class);
        Route::resource('contactsubjects', ContactSubjectController::class);
        Route::resource('homesliders', HomeSliderController::class);
        Route::resource('homepackagesliders', HomePackageSliderController::class);
        Route::resource('homecounters', HomeCounterController::class);
    Route::get('/logout', [UsersController::class, 'logout']);
    
});


Route::get('/counters', [HomeCounterController::class, 'index']);
Route::post('/contactForm', [ContactController::class, 'store']);
Route::get('/contactSubject', [ContactSubjectController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class,'show']);
Route::get('/images', [ImageController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);
Route::get('/homesliders', [HomeSliderController::class, 'index']);
Route::get('/homepackageslider', [HomePackageSliderController::class, 'index']);


    
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
