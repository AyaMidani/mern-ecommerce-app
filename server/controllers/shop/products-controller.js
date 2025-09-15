
const Product = require('../../models/Products')

const getFilteredProducts= async(req,res) =>{
    try {

        const products = await Product.find({})
        res.status(200).json({
            success: true,
            data : products
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:"Some Error occured ",
        });
    }
}
module.exports={getFilteredProducts}