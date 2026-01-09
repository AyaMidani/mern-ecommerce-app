const express = require('express');
const {handleImageUpload, addProduct, editProduct, fetchAllProducts, deleteProduct} = require('../../controllers/admin/products-controller')
const { authMiddleware } = require('../../controllers/auth-controller')

const { upload } = require('../../helpers/cloudinary')
const router = express.Router();

router.use(authMiddleware); 
router.post('/upload-image',upload.single('my_file'),handleImageUpload);
router.post('/add',addProduct);
router.put('/edit/:id',editProduct);
router.delete('/delete/:id',deleteProduct);
router.get('/get',fetchAllProducts);

module.exports = router;


