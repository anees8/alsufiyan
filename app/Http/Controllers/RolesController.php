<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

use Symfony\Component\HttpFoundation\Response;
use Validator;
use Str;    

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      
        $this->authorizeForUser($request->user('api'), 'view', Role::class);


        if($request->has('permissions')){

            $roles = Role::with('permissions');       
            $data['roles']=  $roles->Paginate($request->perPage); 

        }else if($request->has('users')){
            $roles = Role::with('users');       
            $data['roles']=  $roles->Paginate($request->perPage); 

        }else{
            $data['roles']=Role::select('*','id as value','name as text')->get();
        }



        return $this->sendResponse($data, 'Roles return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
        $this->authorizeForUser($request->user('api'),'create', Role::class);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->authorizeForUser($request->user('api'),'create', Role::class);

        $validator = Validator::make($request->all(), [
            'role_name'=>'bail|required|min:3|max:255',
            'permission.*'=>'bail|required|numeric',
        
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

    
                $role = new Role;
                if($request->has('role_name')){
                $role->name =ucfirst($request->role_name);
                $role->slug =Str::slug($request->role_name,'_');
                }                
                $role->save();
                if($request->has('permission')){
                $role->permissions()->attach($request->permission);
                }

                if($request->has('user')){
                    $role->users()->attach($request->user);
                    }
    

                $success['role'] =  $role ;
    
            return $this->sendResponse($success, 'Role Added Successfully.',Response::HTTP_CREATED);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Role $role){

     
     $data['role']=$role->load('permissions','users');
     return $this->sendResponse($data, 'Role return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Role $role)
    {
        $this->authorizeForUser($request->user('api'),'update', Role::class);
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
      
        $this->authorizeForUser($request->user('api'),'update', Role::class);
        $validator = Validator::make($request->all(), [
            'role_name'=>'bail|required|min:3|max:255',
            'permission.*'=>'bail|required|numeric',
        
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        if($request->has('role_name')){
        $role->name =ucfirst($request->role_name);
        $role->slug =Str::slug($request->role_name,'_');
        }            
        $role->update();


        if($request->has('permission')){
        $role->permissions()->sync($request->permission);
        }

        if($request->has('user')){
        $role->users()->sync($request->user);
        }
        return $this->sendResponse('Role Updated Successfully.',Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,Role $role)
    {
        $this->authorizeForUser($request->user('api'),'delete', Role::class);
        $role->permissions()->detach();
        $role->delete();
        return $this->sendResponse('Role deleted Successfully.',Response::HTTP_OK);
    }
}