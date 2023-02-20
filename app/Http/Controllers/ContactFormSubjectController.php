<?php

namespace App\Http\Controllers;

use App\Models\ContactFormSubject;
use Illuminate\Http\Request;

class ContactFormSubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['subject'] =ContactFormSubject::all();

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
     * @param  \App\Models\ContactFormSubject  $contactFormSubject
     * @return \Illuminate\Http\Response
     */
    public function show(ContactFormSubject $contactFormSubject)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ContactFormSubject  $contactFormSubject
     * @return \Illuminate\Http\Response
     */
    public function edit(ContactFormSubject $contactFormSubject)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContactFormSubject  $contactFormSubject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ContactFormSubject $contactFormSubject)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactFormSubject  $contactFormSubject
     * @return \Illuminate\Http\Response
     */
    public function destroy(ContactFormSubject $contactFormSubject)
    {
        //
    }
}
