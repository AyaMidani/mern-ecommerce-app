const express = require('express');
const {addToCart,fetchCardItems,updateCardItemQty,deleteCartItem} = require('../../controllers/shop/cart-controller')
const router = express.Router();


router.post('/add',addToCart);
router.get('/get/:userId',fetchCardItems);
router.put('/update-cart',updateCardItemQty);
router.delete('/:userId/:productId',deleteCartItem);


module.exports = router;


