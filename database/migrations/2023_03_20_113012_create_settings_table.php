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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->text('email');
            $table->text('CompanyName');
            $table->text('CompanyPhone');
            $table->text('CompanyAlternatePhone')->nullable();
            $table->text('CompanyAdress');
            $table->text('openingTime');            
            $table->text('logo')->nullable();
            $table->text('slogo');
            $table->text('facebook')->nullable();
            $table->text('youtube')->nullable();
            $table->text('whatsapp')->nullable();
            $table->text('about');
            $table->text('footer');
            $table->text('poster');
            $table->text('copyright')->default("Proudly Developed & Maintained by MEERANJI TECHNOLOGY");
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
        Schema::dropIfExists('settings');
    }
};
