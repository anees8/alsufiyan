<?php

namespace App\Http\Controllers;

use App\Models\ClientReview;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Validator;


class ClientReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->perPage) {
            if ($request->has('permission')) {
            $this->authorizeForUser($request->user('api'), 'view', ClientReview::class);
            }

            $reviews = ClientReview::orderBy('id', 'DESC');
            $data['reviews'] = $reviews->Paginate($request->perPage);
        } else {
            $data['reviews'] = ClientReview::orderBy('id', 'DESC')->get();
        }
        return $this->sendResponse($data, 'Reviews return successfully.', Response::HTTP_OK);
        
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
        $this->authorizeForUser($request->user('api'), 'create', ClientReview::class);
        
        $validator = Validator::make($request->all(), [
            'comment' => 'required|min:10',
            'user'=> 'required',
        ]);       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

           $clientreview = new ClientReview;
           if ($request->has('comment')) {
            $clientreview->comment = $request->comment;
         }
         if ($request->has('user')) {
            $clientreview->user = $request->user;
         }
         if ($request->has('comment_date')) {
            $clientreview->comment_date = $request->comment_date;
         }

         
         $clientreview->save();

         $success['branch'] = $clientreview ;

         return $this->sendResponse($success, 'Review Created Successfully.',Response::HTTP_CREATED);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ClientReview  $clientreview
     * @return \Illuminate\Http\Response
     */
    public function show(ClientReview $clientreview)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ClientReview  $clientreview
     * @return \Illuminate\Http\Response
     */
    public function edit(ClientReview $clientreview)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ClientReview  $clientreview
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClientReview $clientreview)
    {
        $this->authorizeForUser($request->user('api'), 'update', ClientReview::class);
        
        $validator = Validator::make($request->all(), [
            'comment' => 'required|min:10',
            'user'=> 'required',
        ]);       
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors(), Response::HTTP_BAD_REQUEST);       
        }

          
           if ($request->has('comment')) {
            $clientreview->comment = $request->comment;
         }
         if ($request->has('user')) {
            $clientreview->user = $request->user;
         }
         if ($request->has('comment_date')) {
            $clientreview->comment_date = $request->comment_date;
         }

         
         $clientreview->save();

         $clientreview->update();
         return $this->sendResponse([],'Review Updated Successfully.',Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ClientReview  $clientreview
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, ClientReview $clientreview)
    {
            $this->authorizeForUser($request->user('api'), 'delete', ClientReview::class);
            $clientreview->delete();
            return $this->sendResponse([],'Review Deleted Successfully.',Response::HTTP_OK);
    }
}
