<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormEmail;
use App\Mail\ContactReceiptFormEmail;
use App\Models\Contact;
use App\Models\ContactSubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        if ($request->has('permission')) {
            $this->authorizeForUser($request->user('api'), 'view', Contact::class);
        }
        $data['contacts'] = Contact::with('subject')->orderBy('id', 'DESC')->Paginate($request->perPage);

        return $this->sendResponse($data, 'Contacts return successfully.', Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->authorizeForUser($request->user('api'), 'create', Contact::class);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreContactRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    { if($request->has('admin')){
        $this->authorizeForUser($request->user('api'), 'create', Contact::class);
    }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email:rfc,dns',
            'phone' => 'required|digits:10',
            'subject_id' => 'required|max:255',
            'message' => 'required',

        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $request_all = $request->all();
        Contact::create($request_all);

        $email = "meeranjianees1@gmail.com";

        $ContactForm = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => ContactSubject::find($request->subject_id)
                ->subject,
            'message' => $request->message,
            'company' => config('app.name'),
        ];

        Mail::to($email)->send(new ContactFormEmail($ContactForm));
        Mail::to($ContactForm['email'])->send(new ContactReceiptFormEmail($ContactForm));

        return $this->sendResponse([], 'Thanks for Contacting with Us.', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Contact $contact)
    {
        $this->authorizeForUser($request->user('api'), 'view', Contact::class);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Contact $contact)
    {
        $this->authorizeForUser($request->user('api'), 'update', Contact::class);
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
        $this->authorizeForUser($request->user('api'), 'update', Contact::class);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Contact  $contact
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Contact $contact)
    {
        $this->authorizeForUser($request->user('api'), 'delete', Contact::class);
        $contact->delete();

        return $this->sendResponse([],'Contact  Recycle Successfully.', Response::HTTP_OK);
    }

    public function restore(Request $request, Contact $contact)
    {

        $this->authorizeForUser($request->user('api'), 'restore', Contact::class);
        $contact->restore();
        return $this->sendResponse([],'Contact  Restored Successfully.', Response::HTTP_OK);
    }

    public function forcedelete(Request $request, Contact $contact)
    {
        $this->authorizeForUser($request->user('api'), 'forcedelete', Contact::class);

        $contact->forceDelete();
        return $this->sendResponse([],'Contact  Deleted Successfully.', Response::HTTP_OK);

    }
}
