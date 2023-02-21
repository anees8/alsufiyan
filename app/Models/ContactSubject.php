<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Mail\Contact;

class ContactSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject',
    ];

    public $timestamps = true;
   

}
