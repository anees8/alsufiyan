<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactSubject;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormEmail;
use App\Mail\ContactReceiptFormEmail;

use Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreContactRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){           
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|digits:10',
            'subject_id'=> 'required|max:255',
            'message' => 'required',
            
           
        ]);
   
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }
        $request_all = $request->all();
        Contact::create($request_all);

        $email="meeranjianees1@gmail.com";

        $ContactForm=[
           'name' =>   $request->name, 
            'email' =>  $request->email, 
            'phone' =>  $request->phone, 
            'subject' => ContactSubject::find($request->subject_id)
            ->subject,
            'message' =>  $request->message,
            'company' =>  config('app.name'),
        ];


        Mail::to($email)->send(new ContactFormEmail($ContactForm));
        Mail::to($ContactForm['email'])->send(new ContactReceiptFormEmail($ContactForm));


        return $this->sendResponse([],'Thanks for Contacting with Us.',Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Contact $contact)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateContactRequest  $request
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Contact $contact)
    {
        //
    }
}
