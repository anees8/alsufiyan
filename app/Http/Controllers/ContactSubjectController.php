<?php

namespace App\Http\Controllers;

use App\Models\ContactSubject;

use App\Models\Contact;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;


class ContactSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->perPage){
        
        $data['subject']= ContactSubject::Paginate($request->perPage);
    }else{

        $data['subject']=ContactSubject::select('id as value', 'subject as text')->get();
    }
        return $this->sendResponse($data, 'Subject return successfully.',Response::HTTP_OK);

        
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
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */
    public function show(ContactSubject $ContactSubject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */
    public function edit(ContactSubject $ContactSubject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ContactSubject $ContactSubject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContactSubject $ContactSubject)
    {
        //
    }
}
