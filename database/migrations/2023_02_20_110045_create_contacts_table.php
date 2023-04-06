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
        Schema::create('contacts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->bigInteger('phone');
            $table->unsignedBigInteger('subject_id');
             $table->foreign('subject_id')->references('id')->on('contact_subjects')->constrained()->onUpdate('cascade')->onDelete('cascade');
             $table->unsignedBigInteger('status_id')->default(1);
             $table->foreign('status_id')->references('id')->on('contacts_status')->constrained()->onUpdate('cascade')->onDelete('cascade');
           
            $table->text('message');
            $table->softDeletes();
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
        Schema::dropIfExists('contacts');
    }
};
