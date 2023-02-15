"use strict";
import { createTransport } from "nodemailer";
async function main() {
  let transporter = createTransport({
   service:'gmail',
    auth: {
      user: "wisewater.helpdesk.info@gmail.com", // generated ethereal user
      pass: "ivmypjexdoudmcir", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'wisewater.helpdesk.info@gmail.com', // sender address
    to: "fromamongus6@gmail.com", // list of receivers
    subject: "Invoice",
    html: "<b>We will get this kind of pdf in invoice for billing.</b>", // html body
    attachments: [{
        filename: 'Invoice_Bill.pdf',
        path: '../../PDF/8200971628.pdf',
        contentType: 'application/pdf'
      }],
  });

  console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
