<?php

namespace App\Policies;

use App\Models\ContactSubject;
use App\Models\User;
use App\Models\Permission;

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
        $permission = Permission::where('slug', 'contact_subject_view')->first();
        
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
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, ContactSubject $contactSubject)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, ContactSubject $contactSubject)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, ContactSubject $contactSubject)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ContactSubject  $contactSubject
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, ContactSubject $contactSubject)
    {
        //
    }
}
