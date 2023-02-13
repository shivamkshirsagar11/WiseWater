import { Router } from 'express';
const router = Router();

import { loginUser } from '../controllers/userController/loginUser.js';
import { giveUserType } from '../controllers/userController/giveUserType.js';
import { submitJobApplicationForm } from '../controllers/userController/submitJobApplicationForm.js';
import { showCompanies } from "../controllers/companyController/showCompanies.js";
import { generateOTP, verifyOTP } from '../controllers/userController/otpProcess.js';

router.post('/login',loginUser);
router.get('/show-companies',showCompanies);
router.post('/give-user-type',giveUserType);
router.post('/submit-job-application',submitJobApplicationForm);
router.post('/otp/send',generateOTP);
router.post('/otp/verify',verifyOTP);
export default router;