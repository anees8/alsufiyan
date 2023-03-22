<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        App\Models\Post::class =>  App\Policies\PostPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        
         Passport::ignoreRoutes();
         Passport::tokensExpireIn(now()->addDays(1));
         Passport::refreshTokensExpireIn(now()->addDays(1));
         Passport::personalAccessTokensExpireIn(now()->addDays(1));
    
    }
}
