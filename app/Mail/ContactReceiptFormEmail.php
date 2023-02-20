<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class ContactReceiptFormEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $ContactForm;


    public function __construct($ContactForm)
    {
        $this->ContactForm = $ContactForm;
    }

    public function build()
    {
        return $this->view('emails.ContactFormReceipt')
            ->subject($this->ContactForm['subject']);
    }
}
