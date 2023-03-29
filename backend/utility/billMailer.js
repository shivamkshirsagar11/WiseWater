"use strict";
import { createTransport } from "nodemailer";
export async function BillMailer(mobile, mailId) {
  console.log(mailId);
  let transporter = createTransport({
    service: 'gmail',
    auth: {
      user: "wisewater.helpdesk.info@gmail.com",
      pass: "ivmypjexdoudmcir",
    },
  });

  let info = await transporter.sendMail({
    from: 'wisewater.helpdesk.info@gmail.com',
    to: mailId,
    subject: "Invoice",
    html: "<b>Your Payment is Successfull<br> Please find attached reciept.</b>",
    attachments: [{
      filename: 'Invoice_Bill.pdf',
      path: `PDF/${mobile}.pdf`,
      contentType: 'application/pdf'
    }],
  });

  console.log("Message sent: %s", info.messageId);
}
