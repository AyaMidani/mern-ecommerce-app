const express = require('express');
const {addToCart,fetchCartItems,updateCardItemQty,deleteCartItem} = require('../../controllers/shop/cart-controller')
const {authMiddleware }=require('../../controllers/auth-controller');
const router = express.Router();


router.use(authMiddleware); 

router.post('/add',addToCart);
router.get('/get/:userId',fetchCartItems);
router.put('/update-cart',updateCardItemQty);
router.delete('/:userId/:productId',deleteCartItem);


module.exports = router;


