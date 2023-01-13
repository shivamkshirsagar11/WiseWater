const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/ownerController/register');
const {profile} = require('../controllers/ownerController/profile');
const {showWorkerApplications} = require('../controllers/ownerController/showWorkerApplications');
const {hireWorker} = require('../controllers/ownerController/hireWorker');
const {showPendingOrders} = require('../controllers/ownerController/showPendingOrders');
const {showAssignedOrders} = require('../controllers/ownerController/showAssignedOrders');
const {assignOrder} = require('../controllers/ownerController/assignOrder');
const {protect} = require('../middleware/authMiddlerware');
const {showWorkers} = require('../controllers/ownerController/showWorkers');
const { inQueryOrder } = require('../controllers/ownerController/inQueryOrders');
const { getInQueryOrder } = require('../controllers/ownerController/getInQueryOrder');
const { getOrder } = require('../controllers/ownerController/getOrder');
const { reAssignOrder } = require('../controllers/ownerController/reAssignnOrder');
const { moveToPending } = require('../controllers/ownerController/moveToPending');
const { fetchCustomer } = require('../controllers/ownerController/fetchCustomer');

router.post('/register',registerUser);
router.post('/profile',protect,profile);
router.post('/showWorkerApplications',protect,showWorkerApplications);
router.post('/hire-worker',protect,hireWorker);
router.post('/show-pending-orders',protect,showPendingOrders);
router.post('/assign-order',protect,assignOrder);
router.post('/show-assigned-orders',protect,showAssignedOrders);
router.post('/show-workers',protect,showWorkers);
router.post('/show-in-query-orders',protect,inQueryOrder);
router.post('/resolve-in-query-orders',protect,getInQueryOrder);
router.post('/get-order',protect,getOrder);
router.post('/reassign-order',protect,reAssignOrder);
router.post('/move-to-pending-order',protect,moveToPending);
router.post('/fetch-customer',protect,fetchCustomer);
router.post('/authenticate',protect,(req,res)=>{
    console.log('owner in atuhencated')
    res.json({message:'done'});
})

module.exports = router;