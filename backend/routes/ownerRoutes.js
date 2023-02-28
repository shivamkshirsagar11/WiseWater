import { Router } from 'express';
const router = Router();

import { registerUser } from '../controllers/ownerController/register.js';
import { profile } from '../controllers/ownerController/profile.js';
import { showWorkerApplications } from '../controllers/ownerController/showWorkerApplications.js';
import { hireWorker } from '../controllers/ownerController/hireWorker.js';
import { showPendingOrders } from '../controllers/ownerController/showPendingOrders.js';
import { showAssignedOrders } from '../controllers/ownerController/showAssignedOrders.js';
import { assignOrder } from '../controllers/ownerController/assignOrder.js';
import protect from '../middleware/authMiddlerware.js';
import { showWorkers } from '../controllers/ownerController/showWorkers.js';
import { inQueryOrder } from '../controllers/ownerController/inQueryOrders.js';
import { getInQueryOrder } from '../controllers/ownerController/getInQueryOrder.js';
import { getOrder } from '../controllers/ownerController/getOrder.js';
import { reAssignOrder } from '../controllers/ownerController/reAssignnOrder.js';
import { moveToPending } from '../controllers/ownerController/moveToPending.js';
import { fetchCustomer } from '../controllers/ownerController/fetchCustomer.js';
import { getPaymentDetails } from '../controllers/ownerController/getPaymentDetails.js';
import { sendRecipt } from '../controllers/ownerController/sendRecipt.js';

router.post('/register', registerUser);
router.get('/profile', protect, profile);
router.get('/showWorkerApplications', protect, showWorkerApplications);
router.post('/hire-worker', protect, hireWorker);
router.get('/show-pending-orders', protect, showPendingOrders);
router.post('/assign-order', protect, assignOrder);
router.get('/show-assigned-orders', protect, showAssignedOrders);
router.get('/show-workers', protect, showWorkers);
router.post('/show-in-query-orders', protect, inQueryOrder);
router.post('/resolve-in-query-orders', protect, getInQueryOrder);
router.post('/get-order', protect, getOrder);
router.post('/reassign-order', protect, reAssignOrder);
router.post('/move-to-pending-order', protect, moveToPending);
router.post('/fetch-customer', protect, fetchCustomer);
router.get('/payment-details', protect, getPaymentDetails);
router.post('/send-recipt', protect, sendRecipt);
router.get('/authenticate', protect, (req, res) => {
    console.log('owner in atuhencated')
    res.json({ message: 'done' });
})

export default router;