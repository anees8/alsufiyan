<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ContactSubjectController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\VideoController;






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




Route::post('/login', [UsersController::class, 'index']);
Route::post('/register', [UsersController::class, 'create']);


Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
        Route::resource('Posts', PostController::class);
        Route::resource('images', ImageController::class);
        Route::resource('videos', VideoController::class);

    Route::get('/logout', [UsersController::class, 'logout']);
    
});



Route::post('/contactForm', [ContactController::class, 'store']);
Route::get('/contactSubject', [ContactSubjectController::class, 'index']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post}', [PostController::class,'show']);
Route::get('/images', [ImageController::class, 'index']);
Route::get('/videos', [VideoController::class, 'index']);

    
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
