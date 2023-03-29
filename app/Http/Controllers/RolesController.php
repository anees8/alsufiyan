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
        $roles = Role::with('permissions');       
        $data['roles']=  $roles->Paginate($request->perPage); 
        return $this->sendResponse($data, 'Roles return successfully.',Response::HTTP_OK);
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

        $validator = Validator::make($request->all(), [
            'role_name'=>'bail|required|min:3|max:15',
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
                $role->permissions()->attach($request->permission);

                $success['role'] =  $role ;
    
            return $this->sendResponse($success, 'Role Added Successfully.',Response::HTTP_CREATED);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role){

     $data['role']=$role->load('permissions');
     return $this->sendResponse($data, 'Role return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        
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
      
        $validator = Validator::make($request->all(), [
            'role_name'=>'bail|required|min:3|max:15',
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
        $role->permissions()->sync($request->permission);
        return $this->sendResponse('Role Updated Successfully.',Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $role->permissions()->detach();
        $role->delete();
        return $this->sendResponse('Role deleted Successfully.',Response::HTTP_OK);
    }
}
