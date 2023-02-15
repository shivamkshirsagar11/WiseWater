// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials

import expressAsyncHandler from "express-async-handler";
import twilio from "twilio";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
// Read more at http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = twilio(accountSid, authToken);
export const generateOTP = expressAsyncHandler(async (req, res) => {
  const { contact } = req.body;
  try {
    const rsp = await client.verify.v2.services(verifySid)
      .verifications.create({ to: `+91${contact}`, channel: "sms" })
    res.json({
      sattus: "OTP sent"
    })
  }
  catch (e) {
    console.log('from otp process catch block have some error')
    console.log(e);
  }
  // .then((verification) => {
  //   console.log(verification.status);
  //   res.json({
  //     status:"OTP sent"
  //   })
  // });
}
);
export const verifyOTP = expressAsyncHandler(async (req, res) => {
  const { contact, otp } = req.body;

  await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({ to: `+91${contact}`, code: otp })
    .then((verification_check) => {

      res.status(200)
      res.json({
        status: verification_check.status
      })
    })
});