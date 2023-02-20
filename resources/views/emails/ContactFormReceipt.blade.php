<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Receipt of your message through our website's contact form</title>
</head>
<body>
  <h5>Hello {{$ContactForm['name']}},</h5>
  <p>Thank you for reaching out to us through our website's contact form. We have received your message and will review it soon.</p>
  <p>If a response is necessary, we will contact you through your email {{$ContactForm['email']}} as soon as possible.</p>
  <p>Thank you for your interest in our company.</p>
  <p>Thanks Regards,</p>
  <p>{{$ContactForm['company']}}</p>
</body>
</html>


