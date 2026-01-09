const express = require('express');
const {getProductReviews,addProductReview} = require('../../controllers/shop/product-review-controller')
const {authMiddleware }=require('../../controllers/auth-controller');

const router = express.Router();


router.use(authMiddleware); 
router.post('/add',addProductReview);
router.get('/:productId',getProductReviews);

module.exports = router;


