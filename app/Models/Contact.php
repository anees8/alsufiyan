<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\ContactSubject;



class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject_id',
        'message',
    ];
    
    public $timestamps = true;

    public function subject(){
        return $this->hasOne(ContactSubject::class,'id', 'subject_id');
    }
   
}
