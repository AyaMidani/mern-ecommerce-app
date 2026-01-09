const express = require('express');
const {getFilteredProducts} = require('../../controllers/shop/products-controller')
const {getProductDetails} = require('../../controllers/shop/products-controller')
const {authMiddleware }=require('../../controllers/auth-controller')
const router = express.Router();


router.use(authMiddleware); 
router.get('/get',getFilteredProducts);
router.get('/get/:id',getProductDetails);

module.exports = router;


