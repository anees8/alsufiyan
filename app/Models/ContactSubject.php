<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use Illuminate\Database\Eloquent\SoftDeletes;




class ContactSubject extends Model
{
    use HasFactory;
    Use SoftDeletes; 

    protected $fillable = [
        'subject',
    ];

    public $timestamps = true;
   

}
