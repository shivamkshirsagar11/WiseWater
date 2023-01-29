const express = require('express');
const router = express.Router();

const {loginUser} = require('../controllers/userController/loginUser');
const { giveUserType } = require('../controllers/userController/giveUserType');
const { submitJobApplicationForm } = require('../controllers/userController/submitJobApplicationForm');
const {showCompanies} = require("../controllers/companyController/showCompanies.js");
const { generateOTP, verifyOTP } = require('../controllers/userController/otpProcess');

router.post('/login',loginUser);
router.get('/show-companies',showCompanies);
router.post('/give-user-type',giveUserType);
router.post('/submit-job-application',submitJobApplicationForm);
router.post('/otp/send',generateOTP);
router.post('/otp/verify',verifyOTP);
module.exports = router;