const express = require('express');
const mongoose = require('mongoose');
const { createOrder, capturePayment, getAllOrdersByUser,getOrderDetails } = require('../../controllers/shop/order-controller');
const Order = require('../../models/Order');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture-payment', capturePayment);
router.get('/list/:userId', getAllOrdersByUser);
router.get('/details/:id', getOrderDetails);

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
