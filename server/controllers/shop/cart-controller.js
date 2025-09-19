const Cart = require('../../models/Cart')
const Product = require('../../models/Products')

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid data provided!' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const idx = cart.items.findIndex(i => i.productId.toString() === productId);
    if (idx === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[idx].quantity += quantity;
    }

    await cart.save();
    return res.status(200).json({ success: true, data: cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error occurred' });
  }
};

const fetchCardItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User id is mandatory!' });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice'
    });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // remove broken items (e.g., deleted products)
    const validItems = cart.items.filter(i => i.productId);
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const mapped = validItems.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart.toObject(),
        items: mapped
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error occurred' });
  }
};

const updateCardItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid data provided!' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const idx = cart.items.findIndex(i => i.productId.toString() === productId);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Cart item not present!' });
    }

    cart.items[idx].quantity = quantity;
    await cart.save();

    await cart.populate({ path: 'items.productId', select: 'image title price salePrice' });

    const mapped = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : 'Product not found',
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart.toObject(),
        items: mapped
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error occurred' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      return res.status(400).json({ success: false, message: 'Invalid data provided!' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // keep items whose productId != the one to delete
    cart.items = cart.items.filter(item => {
      // item.productId may be ObjectId or populated doc
      const id = item.productId?._id ? item.productId._id : item.productId;
      return id.toString() !== productId;
    });

    await cart.save();
    await cart.populate({ path: 'items.productId', select: 'image title price salePrice' });

    const mapped = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : 'Product not found',
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart.toObject(),
        items: mapped
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error occurred' });
  }
};

module.exports = { addToCart, fetchCardItems, updateCardItemQty, deleteCartItem };
