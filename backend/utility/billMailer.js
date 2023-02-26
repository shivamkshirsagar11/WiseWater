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
    html: "<b>We will get this kind of pdf in invoice for billing.</b>",
    attachments: [{
      filename: 'Invoice_Bill.pdf',
      path: `PDF/${mobile}.pdf`,
      contentType: 'application/pdf'
    }],
  });

  console.log("Message sent: %s", info.messageId);
}
