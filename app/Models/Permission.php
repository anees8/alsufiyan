<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Role;
use App\Models\PermissionGroup;


class Permission extends Model
{
    use HasFactory;


    public function roles() {
        return $this->belongsToMany(Role::class,'roles_permissions');
     }
     
     
    
}
