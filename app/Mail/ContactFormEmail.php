<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactFormEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $ContactForm;


    public function __construct($ContactForm)
    {
        $this->ContactForm = $ContactForm;
    }

    public function build()
    {
        return $this->view('emails.contactform')
            ->subject($this->ContactForm['subject']);
    }
}
