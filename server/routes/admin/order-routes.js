const express = require('express');
const {getAllOrdersOfAllUsers,getOrderDetailsForAdmin,UpdateOrderStatus} = require('../../controllers/admin/order-controller')
const { authMiddleware } = require('../../controllers/auth-controller')


const router = express.Router();

router.use(authMiddleware); 
router.get('/get', getAllOrdersOfAllUsers);
router.get('/details/:id', getOrderDetailsForAdmin);
router.put('/update/:id', UpdateOrderStatus);

module.exports = router;
