<?php

namespace App\Http\Controllers;

use App\Models\OurBranch;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;

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

            $branches = OurBranch::orderBy('id', 'DESC');
            $data['branches'] = $branches->Paginate($request->perPage);
        } else {
            $data['branches'] = OurBranch::orderBy('id', 'DESC')->get();
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OurBranch  $ourBranch
     * @return \Illuminate\Http\Response
     */
    public function show(OurBranch $ourBranch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OurBranch  $ourBranch
     * @return \Illuminate\Http\Response
     */
    public function edit(OurBranch $ourBranch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OurBranch  $ourBranch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OurBranch $ourBranch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OurBranch  $ourBranch
     * @return \Illuminate\Http\Response
     */
    public function destroy(OurBranch $ourBranch)
    {
        //
    }
}
