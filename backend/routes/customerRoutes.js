import { Router } from 'express';
const router = Router();
import protect from '../middleware/authMiddlerware.js';

import { registerUser } from '../controllers/customerController/register.js';
import { profile } from '../controllers/customerController/profile.js';
import { placeorder } from '../controllers/customerController/placeorder.js';
import { showPlacedOrders } from '../controllers/customerController/showPlacedOrders.js';
import { trackOrder } from '../controllers/customerController/trackOrder.js';
import { getPaymentDetails } from '../controllers/customerController/getPaymentDetails.js';
import { getAllPlans } from '../controllers/customerController/subscription.js';

router.post('/register', registerUser);
router.get('/profile', protect, profile);
router.post('/placeorder', protect, placeorder);
router.get('/show-placed-orders', protect, showPlacedOrders);
router.get('/authenticate', protect, (req, res) => {
    console.log('customer in atuhencated')
    res.json({ message: 'done' });
})
router.get('/payment-details', protect, getPaymentDetails)
router.get('/get-all-plans', protect, getAllPlans)
router.post('/track-order', protect, trackOrder)

export default router;