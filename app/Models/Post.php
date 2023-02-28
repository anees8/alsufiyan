<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'attachment',
        'user_id',
    ];
    public $timestamps = true;

    
    public function user(){
        return $this->hasOne(User::class,'id', 'user_id');
    }

}
