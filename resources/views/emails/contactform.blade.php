<!DOCTYPE html>
<html>
  <head>
    <title>{{$ContactForm['subject']}}</title>
  </head>
  <body>
    <p>Dear {{$ContactForm['company']}},</p>
    <p>My name is {{$ContactForm['name']}} and I am reaching out to you from {{$ContactForm['company']}}.</p>
    <p>Please find my contact details below:</p>
    <table role="presentation" style="width: 600px; border-collapse: collapse;">
      <tbody>
        <tr>
          <th style="padding: 16px 12px;">Name</th>
          <td style="padding: 16px 12px;">{{$ContactForm['name']}}</td>
        </tr>
        <tr style="background: #edf2f4;">
          <th style="padding: 16px 12px;">Email</th>
          <td style="padding: 16px 12px;">{{$ContactForm['email']}}</td>
        </tr>
        <tr>
          <th style="padding: 16px 12px;">Subject</th>
          <td style="padding: 16px 12px;">{{$ContactForm['subject']}}</td>
        </tr>

        <tr style="background: #edf2f4;">
          <th style="padding: 16px 12px;">Message</th>
          <td style="padding: 16px 12px;">{{$ContactForm['message']}}</td>
        </tr>
      </tbody>
    </table>
   
    <p>Best regards,</p>
    <p>{{$ContactForm['name']}}</p>
  </body>
</html>


