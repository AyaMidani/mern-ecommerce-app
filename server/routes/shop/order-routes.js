const express = require('express');
const mongoose = require('mongoose');
const { createOrder, capturePayment, getAllOrdersByUser,getOrderDetails } = require('../../controllers/shop/order-controller');
const {authMiddleware }=require('../../controllers/auth-controller');
const Order = require('../../models/Order');

const router = express.Router();


router.post('/create', authMiddleware ,createOrder);
router.post('/capture-payment', capturePayment);
router.get('/list/:userId', authMiddleware ,getAllOrdersByUser);
router.get('/details/:id', authMiddleware ,getOrderDetails);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid order id' });
  }
  try {
    const order = await Order.findById(id).lean();
    if (!order) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, order });
  } catch (e) {
    console.error('GET /order/:id error:', e);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
