<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Str;


class PermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'view', Permission::class);
        if(!$request->has('dashboard')){
        $data['permissions']=Permission::select('*','id as value','name as text')->get();
        }else{

        
        $permissions = Permission::with('roles');       
        $data['permissions']=  $permissions->Paginate($request->perPage); 

        }
     
        
        return $this->sendResponse($data, 'Permissions return successfully.',Response::HTTP_OK);
           
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
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
        $this->authorizeForUser($request->user('api'),'create', Permission::class);

        $validator = Validator::make($request->all(), [
            'permission_name'=>'bail|required|min:3|max:255',
            'roles.*'=>'bail|required|numeric',
        
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

    
                $permission = new Permission;
                if($request->has('permission_name')){
                $permission->name =ucfirst($request->permission_name);
                $permission->slug =Str::slug($request->permission_name,'_');
                }                
                $permission->save();
                 $permission->roles()->attach($request->roles);

                $success['permission'] =  $permission ;
    
            return $this->sendResponse($success, 'Permission Added Successfully.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Permission $permission)
    {
        $data['permission']=$permission->load('roles');
        return $this->sendResponse($data, 'Permissions return successfully.',Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        $this->authorizeForUser($request->user('api'),'update', Permission::class);
        $validator = Validator::make($request->all(), [
            'permission_name'=>'bail|required|min:3|max:255',
            'roles.*'=>'bail|required|numeric',
        
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        if($request->has('permission_name')){
        $permission->name =ucfirst($request->permission_name);
        $permission->slug =Str::slug($request->permission_name,'_');
        }            
        $permission->update();
         $permission->roles()->sync($request->roles);
        return $this->sendResponse([],'Role Updated Successfully.',Response::HTTP_OK);     
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Permission $permission)
    {
        $this->authorizeForUser($request->user('api'),'delete', Permission::class);
        $permission->roles()->detach();
        $permission->delete();
        return $this->sendResponse([],'Permission deleted Successfully.',Response::HTTP_OK);

    
    }
}
