<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ContactController;



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

    Route::get('/logout', [UsersController::class, 'logout']);
    
});
Route::post('/contactForm', [ContactController::class, 'store']);

    
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
