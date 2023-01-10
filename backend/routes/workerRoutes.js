const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {workerApplication} = require('../controllers/workerController/application')
const {profile} = require('../controllers/workerController/profile');
const { showAssignedOrders } = require('../controllers/workerController/showAssignedOrders');
const { orderDeliever } = require('../controllers/workerController/orderDeliever');
const { showDelieverOrders } = require('../controllers/workerController/showDelieveredOrders');

router.post('/application',workerApplication);
router.post('/profile',protect,profile);
router.post('/show-assigned-orders',protect,showAssignedOrders);
router.post('/order-delivered',protect,orderDeliever);
router.post('/show-delievered-orders',protect,showDelieverOrders);
router.post('/authenticate',protect,(req,res)=>{
    console.log('owner in atuhencated')
    res.json({message:'done'});
})

module.exports = router;