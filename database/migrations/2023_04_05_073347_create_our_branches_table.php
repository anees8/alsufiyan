<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('our_branches', function (Blueprint $table) {
            $table->id();
            $table->string('location')->unique();
            $table->string('image');
            $table->string('address');
            $table->string('map');
            $table->string('person');
            $table->string('secondary_person')->nullable();
            $table->string('phone');
            $table->string('secondary_phone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('our_branches');
    }
};
