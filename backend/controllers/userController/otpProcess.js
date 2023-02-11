// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials

import expressAsyncHandler from "express-async-handler";
import twilio from "twilio";
// Read more at http://twil.io/secure
const ACCOUNT_SID = "ACf9074ad1b8968f7090b4760ae2ddae5a"
const AUTH_TOKEN = "a807d9144a4b6cfff0c08a49a7c724a0"
const VERIFY_SID = "VAab67bcb24a7af25dab589e576cd66a4d"
const accountSid = ACCOUNT_SID;
const authToken = AUTH_TOKEN;
const verifySid = VERIFY_SID;
const client = twilio(accountSid, authToken);

export const generateOTP = expressAsyncHandler(async (req,res)=>{
const {contact} = req.body;
console.log(`+91-${contact}`)
await client.verify.v2
  .services(verifySid)
  .verifications.create({ to: `+91${contact}`, channel: "sms" })
  .then((verification) => {
    console.log(verification.status);
    res.json({
      status:"OTP sent"
    })
  });
}
);
export const verifyOTP = expressAsyncHandler (async (req,res) =>{
    const {contact, otp} = req.body;
    console.log(`+91-${contact}, otp: ${otp}`)
  await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: `+91${contact}`, code: otp })
        .then((verification_check) => {
          console.log(verification_check.status);
          res.status(200)
          res.json({
            status:verification_check.status
          })
        })  
});