const express = require('express');
const {addAddress,editAddress,fetchAllAddress,deleteAddress} = require('../../controllers/shop/address-controller')
const {authMiddleware }=require('../../controllers/auth-controller');
const router = express.Router();

router.use(authMiddleware); 

router.post('/add',addAddress);
router.get('/get/:userId',fetchAllAddress);
router.delete('/delete/:userId/:addressId',deleteAddress);
router.put('/update/:userId/:addressId',editAddress);


module.exports = router;


