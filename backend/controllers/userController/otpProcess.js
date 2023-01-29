// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials

const expressAsyncHandler = require("express-async-handler");

// Read more at http://twil.io/secure
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

exports.generateOTP = expressAsyncHandler(async (req,res)=>{
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
exports.verifyOTP = expressAsyncHandler (async (req,res) =>{
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