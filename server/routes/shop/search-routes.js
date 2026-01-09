const express = require('express');
const {searchProducts} = require('../../controllers/shop/search-controller')
const {authMiddleware }=require('../../controllers/auth-controller')
const router = express.Router();

router.use(authMiddleware); 
router.get('/:keyword',searchProducts);

module.exports = router;


