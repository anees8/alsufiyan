<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use HasFactory;
    Use SoftDeletes; 

    protected $fillable = [
        'image_url',
        'content',
        'user_id',
    ];

    public $timestamps = true;
    
    public function user(){
        return $this->hasOne(User::class,'id', 'user_id');
    }
}
