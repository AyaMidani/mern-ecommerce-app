// controllers/shop/order-controller.js
const Iyzipay = require('iyzipay');
const iyzico = require('../../helpers/iyzipay');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');

// POST /api/shop/order/create
const createOrder = async (req, res) => {
  try {
    const {
      userId, cartItems, addressInfo,
      orderStatus, paymentMethod, paymentStatus,
      totalAmount, orderDate, orderUpdateDate,
      paymentId, payerId, cartId
    } = req.body;

    if (!userId || !Array.isArray(cartItems) || cartItems.length === 0 || totalAmount == null) {
      return res.status(400).json({ success:false, message:'userId, cartItems, totalAmount are required' });
    }

    // 1) Create order (pending)
    const order = new Order({
      userId,
      cartId,                               // only if your Order schema has this
      CartItems: cartItems,                 // keep your schema field name
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

    // 2) Basket (prices MUST be "xx.xx" strings)
    const basketItems = cartItems.map((it, i) => {
      const unit = Number(it.price || 0);
      const qty  = Number(it.quantity || 1);
      return {
        id: String(it.productId || `SKU${i + 1}`),
        name: it.title || 'Item',
        category1: 'General',
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: (unit * qty).toFixed(2)
      };
    });

    // price/paidPrice must equal sum of item prices
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
      callbackUrl: `${process.env.IYZI_CALLBACK_URL}?orderId=${conversationId}`,
      enabledInstallments: [1, 2, 3, 6, 9, 12],
      buyer: {
        id: String(userId),
        name: addressInfo?.name || 'Müşteri',
        surname: addressInfo?.surname || 'Soyad',
        gsmNumber: addressInfo?.phone || '+905555555555',
        email: addressInfo?.email || 'test@example.com',
        identityNumber: '74300864791',
        ip: '85.34.78.112',
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
      console.log('IYZI INIT RESP:', JSON.stringify({ err, result }, null, 2));
      if (err || result?.status !== 'success') {
        return res.status(500).json({
          success: false,
          message: result?.errorMessage || err?.message || 'Error while initializing iyzico payment'
        });
      }
      const html = Buffer.from(result.checkoutFormContent, 'base64').toString('utf8');

      return res.status(201).json({
        success: true,
        orderId: order._id,
        token: result.token,
        html,                                  // iframe option
        paymentPageUrl: result.paymentPageUrl, // redirect option
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

      // in capturePayment
const ok = !err && result?.status === 'success' && result?.paymentStatus === 'SUCCESS';

const conversationId =
  result?.conversationId
  || req.query.orderId           // from your callbackUrl ?orderId=...
  || result?.basketId;           // fallback when conversationId is omitted

const paymentId = result?.paymentId || null;

// ... update order with conversationId ...


      if (conversationId) {
        const orderDoc = await Order.findByIdAndUpdate(
          conversationId,
          {
            paymentStatus: ok ? 'paid' : 'failed',
            orderStatus:   ok ? 'paid' : 'failed',
            paymentId,
            orderUpdateDate: new Date()
          },
          { new: true }
        ).lean();

        if (ok && orderDoc) {
          if (orderDoc.cartId) {
            await Cart.findByIdAndDelete(orderDoc.cartId).catch(() => {});
          } else if (orderDoc.userId) {
            await Cart.findOneAndUpdate(
              { userId: orderDoc.userId },
              { $set: { items: [] } } // adjust if your Cart schema uses a different field
            ).catch(() => {});
          }
        }
      }

      // Build success/failure URLs with params
      const successBase = process.env.FRONTEND_SUCCESS_URL || 'http://localhost:5173/shop/iyzico-return';
      const failureBase = process.env.FRONTEND_FAILURE_URL || 'http://localhost:5173/shop/failure';

      const successUrl = new URL(successBase);
      const failureUrl = new URL(failureBase);

      if (conversationId) {
        successUrl.searchParams.set('orderId', conversationId);
        failureUrl.searchParams.set('orderId', conversationId);
      }
      if (paymentId) successUrl.searchParams.set('paymentId', paymentId);

      return res.redirect(ok ? successUrl.toString() : failureUrl.toString());
    });
  } catch (error) {
    console.error(error);
    const failureBase = process.env.FRONTEND_FAILURE_URL || 'http://localhost:5173/shop/failure';
    return res.redirect(failureBase);
  }
};

module.exports = { createOrder, capturePayment };
