<?php

namespace App\Http\Controllers;

use App\Models\OurBranch;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;
use Illuminate\Support\Facades\File;

class OurBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->perPage) {
            $this->authorizeForUser($request->user('api'), 'view', OurBranch::class);
            $branches = OurBranch::orderBy('id', 'DESC');
            $data['branches'] = $branches->Paginate($request->perPage);
        } else {
            $data['branches'] = OurBranch::get();
        }
        return $this->sendResponse($data, 'branches return successfully.', Response::HTTP_OK);
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
        
        $this->authorizeForUser($request->user('api'), 'create', OurBranch::class);
        
        $validator = Validator::make($request->all(), [
            'image' => 'bail|required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

            $branch = new OurBranch;

            if ($request->file('image')) {
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('branch'), $imageName);
            $branch->image = "/branch/".$imageName;
            }


            $branch->save();

            $success['branch'] =  $branch ;

            return $this->sendResponse($success, 'Branch Created Successfully.',Response::HTTP_CREATED);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OurBranch  $ourbranch
     * @return \Illuminate\Http\Response
     */
    public function show(OurBranch $ourbranch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OurBranch  $ourbranch
     * @return \Illuminate\Http\Response
     */
    public function edit(OurBranch $ourbranch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OurBranch  $ourbranch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OurBranch $ourbranch)
    {
        $this->authorizeForUser($request->user('api'), 'update', OurBranch::class);

        $validator = Validator::make($request->all(), [
        
            'image' => 'bail|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

        if ($request->file('image')){
        if(!empty($ourbranch->image)){
        if (File::exists(public_path($ourbranch->image))) {
        unlink(public_path($ourbranch->image));
        }
        }
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('branch'), $imageName);
            $ourbranch->image = "/branch/".$imageName;
            }
            
            $ourbranch->update();
            return $this->sendResponse([],'Branch Updated Successfully.',Response::HTTP_OK);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OurBranch  $ourbranch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, OurBranch $ourbranch)
    {
        $this->authorizeForUser($request->user('api'), 'delete', OurBranch::class);
                if(!empty($ourbranch->image)){
            if (File::exists(public_path($ourbranch->image))) {
            unlink(public_path($ourbranch->image));
            }
        }
        $ourbranch->delete();
        return $this->sendResponse([],'Branch Deleted Successfully.',Response::HTTP_OK);
        
    }
}
