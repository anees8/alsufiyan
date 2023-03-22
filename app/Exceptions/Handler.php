<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Throwable;
use Exception;
use App\Http\Controllers\BaseController;




class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var arrays
     */
 
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException::class,
        \Symfony\Component\HttpKernel\Exception\NotFoundHttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
      




        public function render($request, Throwable $exception)
        {
            if ($exception instanceof \Illuminate\Database\Eloquent\ModelNotFoundException) {

                
                return response()->json([
                    'status' => false,
                    'message' => 'Not found',
                ], 404);

            }else  if ($exception instanceof \Illuminate\Auth\Access\AuthorizationException) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unautharized User',
                ], 403);
            }

            return parent::render($request, $exception);
        }
       

    
}
