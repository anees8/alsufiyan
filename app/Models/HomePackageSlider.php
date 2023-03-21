<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
Use Illuminate\Database\Eloquent\SoftDeletes;

class HomePackageSlider extends Model
{
    use HasFactory;
    Use SoftDeletes; 


    public function user(){
        return $this->hasOne(User::class,'id', 'user_id');
    }
}
