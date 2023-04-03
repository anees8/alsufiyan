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
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\SettingController;







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

Route::middleware('auth:api')->group(function () {
    Route::get('getAuthUser', [UsersController::class, 'getAuthUser']);
    Route::get('/user', function (Request $request) {
    return $request->user();
    });
    
    Route::resource('users', UsersController::class);
    Route::get('users/restore/{user}', [UsersController::class, 'restore'])->withTrashed();
    Route::get('users/forcedelete/{user}', [UsersController::class, 'forcedelete'])->withTrashed();

    Route::resource('posts', PostController::class);
    Route::get('posts/restore/{post}', [PostController::class, 'restore'])->withTrashed();
    Route::get('posts/forcedelete/{post}', [PostController::class, 'forcedelete'])->withTrashed();

    Route::resource('images', ImageController::class);
    Route::get('images/restore/{image}', [ImageController::class, 'restore'])->withTrashed();
    Route::get('images/forcedelete/{image}', [ImageController::class, 'forcedelete'])->withTrashed();

    Route::resource('videos', VideoController::class);
    Route::get('videos/restore/{video}', [VideoController::class, 'restore'])->withTrashed();
    Route::get('videos/forcedelete/{video}', [VideoController::class, 'forcedelete'])->withTrashed();

    Route::resource('contacts', ContactController::class);

    Route::resource('contactsubjects', ContactSubjectController::class);
    Route::get('contactsubjects/restore/{contactsubject}', [ContactSubjectController::class, 'restore'])->withTrashed();
    Route::get('contactsubjects/forcedelete/{contactsubject}', [ContactSubjectController::class, 'forcedelete'])->withTrashed();

    Route::resource('homesliders', HomeSliderController::class);
    Route::get('homesliders/restore/{homeslider}', [HomeSliderController::class, 'restore'])->withTrashed();
    Route::get('homesliders/forcedelete/{homeslider}', [HomeSliderController::class, 'forcedelete'])->withTrashed();

    Route::resource('homepackagesliders', HomePackageSliderController::class);
    Route::get('homepackagesliders/restore/{homepackageslider}', [HomePackageSliderController::class, 'restore'])->withTrashed();
    Route::get('homepackagesliders/forcedelete/{homepackageslider}', [HomePackageSliderController::class, 'forcedelete'])->withTrashed();

    Route::resource('permissions', PermissionsController::class);
    Route::resource('roles', RolesController::class);


    Route::resource('settings', SettingController::class);

    Route::resource('homecounters', HomeCounterController::class);
    Route::get('/logout', [UsersController::class, 'logout']);

});


Route::get('/counter', [HomeCounterController::class, 'index']);
Route::get('/setting', [SettingController::class, 'index']);

Route::post('/contactForm', [ContactController::class, 'store']);

Route::get('/contactSubject', [ContactSubjectController::class, 'index']);

Route::get('/post', [PostController::class, 'index']);
Route::get('/post/{post}', [PostController::class,'show']);

Route::get('/image', [ImageController::class, 'index']);

Route::get('/video', [VideoController::class, 'index']);

Route::get('/homeslider', [HomeSliderController::class, 'index']);

Route::get('/homepackageslider', [HomePackageSliderController::class, 'index']);


    
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
