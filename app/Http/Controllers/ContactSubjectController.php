<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\ContactSubject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class ContactSubjectController extends Controller
{

    public function index(Request $request)
    {
        if ($request->perPage) {

            $subject = ContactSubject::orderBy('id', 'DESC');

            if ($request->has('with_deleted')) {
                $this->authorizeForUser($request->user('api'), 'view', ContactSubject::class);

                $subject = $subject->withTrashed();
            }

            $data['subject'] = $subject->Paginate($request->perPage);
        } else {
            $data['subject'] = ContactSubject::select('id as value', 'subject as text')->orderBy('id', 'DESC')->get();
        }
        return $this->sendResponse($data, 'Subject return successfully.', Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {

        $this->authorizeForUser($request->user('api'), 'create', ContactSubject::class);
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
        $this->authorizeForUser($request->user('api'), 'create', ContactSubject::class);
        $validator = Validator::make($request->all(), [
            'subject' => 'bail|required|min:3|max:50',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $contactsubject = new ContactSubject;
        if ($request->has('subject')) {
            $contactsubject->subject = $request->subject;
        }
        $contactsubject->save();

        $success['contactsubject'] = $contactsubject;

        return $this->sendResponse($success, 'Contact Subject Added Successfully.', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'view', ContactSubject::class);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */

    public function edit(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'update', ContactSubject::class);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'update', ContactSubject::class);

        $validator = Validator::make($request->all(), [
            'subject' => 'bail|required|min:3|max:50',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $contactsubject->subject = $request->subject;
        $contactsubject->update();
        return $this->sendResponse('Contact Subject Updated Successfully.', Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ContactSubject  $ContactSubject
     * @return \Illuminate\Http\Response
     */

    public function destroy(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'delete', ContactSubject::class);
        $contactsubject->delete();
        return $this->sendResponse('Contact Subject Recycle  Successfully.', Response::HTTP_OK);
    }

    public function restore(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'restore', ContactSubject::class);
        $contactsubject->restore();
        return $this->sendResponse('Contact Subject Restore Successfully.', Response::HTTP_OK);
    }

    public function forcedelete(Request $request, ContactSubject $contactsubject)
    {
        $this->authorizeForUser($request->user('api'), 'forceDelete', ContactSubject::class);
        $contactsubject->forceDelete();
        return $this->sendResponse('Contact Subject Deleted Successfully.', Response::HTTP_OK);
    }
}
