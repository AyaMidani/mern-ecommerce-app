const express = require('express');
const {addFeatureImage,getFeatureImage} = require('../../controllers/common/feature-controller')
const { authMiddleware } = require('../../controllers/auth-controller')
const router = express.Router();

router.use(authMiddleware); 
router.post('/add',addFeatureImage);
router.get('/get',getFeatureImage);



module.exports = router;


