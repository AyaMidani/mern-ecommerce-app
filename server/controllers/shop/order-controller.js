// controllers/shop/order-controller.js
const Iyzipay = require('iyzipay');
const iyzico = require('../../helpers/iyzipay');
const Order = require('../../models/Order');

// POST /api/shop/order/create
const createOrder = async (req, res) => {
  try {
    const {
      userId, cartItems, addressInfo,
      orderStatus, paymentMethod, paymentStatus,
      totalAmount, orderDate, orderUpdateDate,
      paymentId, payerId
    } = req.body;

    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0 || totalAmount == null) {
      return res.status(400).json({ success:false, message:'userId, cartItems, totalAmount are required' });
    }

    // Create order first (pending)
    const order = new Order({
      userId,
      CartItems: cartItems,          // keep your schema field names
      address: addressInfo,
      orderStatus: orderStatus || 'pending',
      paymentMethod: paymentMethod || 'iyzico',
      paymentStatus: paymentStatus || 'pending',
      totalAmount,
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: paymentId || null,
      payerId: payerId || null
    });
    await order.save();

    // Build iyzico basket (prices MUST be strings with 2 decimals)
    const basketItems = cartItems.map((it, i) => {
      const unit = Number(it.price || 0);
      const qty  = Number(it.quantity || 1);
      return {
        id: String(it.productId || `SKU${i + 1}`),
        name: it.title || 'Item',
        category1: 'General',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL, // constant
        price: (unit * qty).toFixed(2)               // string
      };
    });

    // price/paidPrice must equal the sum of item prices
    let priceStr = Number(totalAmount).toFixed(2);
    const itemsSum = basketItems.reduce((s, bi) => s + Number(bi.price), 0).toFixed(2);
    if (itemsSum !== priceStr) priceStr = itemsSum;

    const conversationId = String(order._id);

    const payload = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: priceStr,
      paidPrice: priceStr,
      currency: Iyzipay.CURRENCY.TRY,
      basketId: conversationId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: process.env.IYZI_CALLBACK_URL,   // e.g. http://localhost:5001/api/shop/order/capture-payment
      enabledInstallments: [1, 2, 3, 6, 9, 12],
      buyer: {
        id: String(userId),
        name: addressInfo?.name || 'Müşteri',
        surname: addressInfo?.surname || 'Soyad',
        gsmNumber: addressInfo?.phone || '+905555555555',
        email: addressInfo?.email || 'test@example.com',
        identityNumber: '74300864791',              // iyzico’s common sandbox TCKN
        ip: '85.34.78.112',                         // don’t send ::1 from localhost
        registrationAddress: addressInfo?.address || 'Istanbul',
        city: addressInfo?.city || 'Istanbul',
        country: 'Turkey'
      },
      shippingAddress: {
        contactName: `${addressInfo?.name || 'Müşteri'} ${addressInfo?.surname || ''}`.trim(),
        city: addressInfo?.city || 'Istanbul',
        country: 'Turkey',
        address: addressInfo?.address || 'Istanbul'
      },
      billingAddress: {
        contactName: `${addressInfo?.name || 'Müşteri'} ${addressInfo?.surname || ''}`.trim(),
        city: addressInfo?.city || 'Istanbul',
        country: 'Turkey',
        address: addressInfo?.address || 'Istanbul'
      },
      basketItems
    };

    iyzico.checkoutFormInitialize.create(payload, (err, result) => {
      console.log('IYZI INIT RESP:', JSON.stringify({ err, result }, null, 2)); // keep for debugging

      if (err || result?.status !== 'success') {
        return res.status(500).json({
          success: false,
          message: result?.errorMessage || err?.message || 'Error while initializing iyzico payment'
        });
      }

      const html = Buffer.from(result.checkoutFormContent, 'base64').toString('utf8');

      return res.status(201).json({
        success: true,
        paymentPageUrl: result.paymentPageUrl,
        html,
        orderId: order._id,
        token: result.token
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message:'Error occured' });
  }
};

// POST /api/shop/order/capture-payment  (iyzico callback)
const capturePayment = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send('Missing token');

    iyzico.checkoutForm.retrieve({ token }, async (err, result) => {
      console.log('IYZI RETRIEVE RESP:', JSON.stringify({ err, result }, null, 2));

      const ok = !err && result?.status === 'success' && result?.paymentStatus === 'SUCCESS';
      const conversationId = result?.conversationId;
      const paymentId = result?.paymentId;

      if (conversationId) {
        await Order.findByIdAndUpdate(
          conversationId,
          {
            paymentStatus: ok ? 'paid' : 'failed',
            orderStatus:   ok ? 'paid' : 'failed',
            paymentId: paymentId || null,
            orderUpdateDate: new Date()
          },
          { new: true }
        );
      }

      return res.redirect(
        ok
          ? (process.env.FRONTEND_SUCCESS_URL || 'http://localhost:5173/checkout/success')
          : (process.env.FRONTEND_FAILURE_URL || 'http://localhost:5173/checkout/failure')
      );
    });
  } catch (error) {
    console.error(error);
    return res.redirect(process.env.FRONTEND_FAILURE_URL || 'http://localhost:5173/checkout/failure');
  }
};

module.exports = { createOrder, capturePayment };
