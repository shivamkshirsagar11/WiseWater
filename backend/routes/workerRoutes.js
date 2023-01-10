const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddlerware');

const {workerApplicationForm} = require('../controllers/workerController/applicationForm')
const {profile} = require('../controllers/workerController/profile');
const { showAssignedOrders } = require('../controllers/workerController/showAssignedOrders');
const { orderDeliever } = require('../controllers/workerController/orderDeliever');
const { showDelieverOrders } = require('../controllers/workerController/showDelieveredOrders');

router.post('/application',workerApplicationForm);
router.post('/profile',protect,profile);
router.post('/show-assigned-orders',protect,showAssignedOrders);
router.post('/order-delivered',protect,orderDeliever);
router.post('/show-delievered-orders',protect,showDelieverOrders);
router.post('/authenticate',protect,(req,res)=>{
    console.log('owner in atuhencated')
    res.json({message:'done'});
})

module.exports = router;