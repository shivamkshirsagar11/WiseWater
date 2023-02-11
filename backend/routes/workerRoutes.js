import { Router } from 'express';
const router = Router();
import  protect  from '../middleware/authMiddlerware.js';

import { profile } from '../controllers/workerController/profile.js';
import { showAssignedOrders } from '../controllers/workerController/showAssignedOrders.js';
import { orderDeliever } from '../controllers/workerController/orderDeliever.js';
import { showDelieverOrders } from '../controllers/workerController/showDelieveredOrders.js';
import { fetchOrder } from '../controllers/workerController/fetchOrder.js';
import { postOrderQuery } from '../controllers/workerController/postOrderQuery.js';


router.get('/profile',protect,profile);
router.get('/show-assigned-orders',protect,showAssignedOrders);
router.get('/order-delivered',protect,orderDeliever);
router.get('/show-delievered-orders',protect,showDelieverOrders);
router.post('/fetch-order',protect,fetchOrder);
router.post('/make-order-query',protect,postOrderQuery);
router.get('/authenticate',protect,(req,res)=>{
    console.log('worker in atuhencated')
    res.json({message:'success'});
})

export default router;