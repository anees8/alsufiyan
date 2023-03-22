<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Validator;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function index(Request $request){


        $users = User::orderBy('id', 'DESC');

        if ($request->has('with_deleted')) {
        $users = $users->withTrashed();
        }

        $data['users']=  $users->Paginate($request->perPage); 
    
        return $this->sendResponse($data, 'Users return successfully.',Response::HTTP_OK);
     }

   
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
        if (!Auth::attempt($request->only('email', 'password'))) {
            return $this->sendError('Invalid Credential.',['error'=>'Invalid Credential'], Response::HTTP_BAD_REQUEST);          
        }
        $data['user'] = User::where('email', $request['email'])->firstOrFail();

        $data['token'] = $data['user']->createToken('Alsufiyan')->accessToken;

       
        
        $data['token_type'] ='Bearer';
    
        return $this->sendResponse($data, 'Login Successfully.',Response::HTTP_OK);
        }
    

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        
      
    }


    public function logout(Request $request){

        
        $request->user()->token()->revoke();
    
        return $this->sendResponse('User Successfully logged out.',Response::HTTP_OK);
       

        }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
   
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('Alsufiyan')->accessToken;
        $success['name'] =  $user->name;
   
        return $this->sendResponse($success, 'User register successfully.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
      

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
        $user->name =  $request->name;    
        $user->email =  $request->email;   
         
        $user->update();
        return $this->sendResponse('User Updated Successfully.',Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
    
        $user->delete();
        return $this->sendResponse('User Recycle Successfully.',Response::HTTP_OK);

    }

    public function restore(User $user){
        $user->restore();
        return $this->sendResponse('User Restore Successfully.',Response::HTTP_OK);
    }

    public function forcedelete(User $user){
        
        $user->forceDelete();
        return $this->sendResponse('User Deleted Successfully.',Response::HTTP_OK);

    }
}
