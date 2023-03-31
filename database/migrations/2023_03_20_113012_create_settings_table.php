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
            $table->text('CompanyAlternatePhone');
            $table->text('CompanyAdress');
            $table->text('logo');
            $table->text('slogo');
            $table->text('facebook');
            $table->text('youtube');
            $table->text('whatsapp');
            $table->text('footer');
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
