<?php

namespace App\Policies;

use App\Models\ContactSubject;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactSubjectPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_list')->first();

        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_add')->first();

        return $user->hasRole($permission->roles);

    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_edit')->first();

        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_delete')->first();

        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_restore')->first();

        return $user->hasRole($permission->roles);
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user)
    {
        $permission = Permission::where('slug', 'contact_subject_forceDelete')->first();

        return $user->hasRole($permission->roles);
    }
}
