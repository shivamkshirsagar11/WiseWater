import { Router } from 'express';
const router = Router();
import protect from '../middleware/authMiddlerware.js';
import { getCustomers } from '../controllers/adminController/getCustomers.js';
import { getOwners } from '../controllers/adminController/getOwners.js';
import { getOwnersApplications } from '../controllers/adminController/getOwnersApplications.js';
import { acceptApplication } from '../controllers/adminController/acceptApplication.js';


router.get('/get-customers', protect, getCustomers);
router.get('/get-owners', protect, getOwners);
router.get('/get-owners-applications', protect, getOwnersApplications);
router.post('/accept-application', protect, acceptApplication)


export default router;