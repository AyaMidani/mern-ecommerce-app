const Feature = require('../../models/Feature')
const addFeatureImage = async(req,res)=>{
    try {
        const {image}= req.body;
        const featureImages = new Feature({
            image
        })
        await featureImages.save();
        res.status(200).json({
            success: true,
            message: featureImages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        }); 
    }
}

const getFeatureImage = async(req,res)=>{
    try {
        const images = await Feature.find({})
        res.status(200).json({
            success: true,
            data: images,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        }); 
    }
}

module.exports = {addFeatureImage,getFeatureImage};