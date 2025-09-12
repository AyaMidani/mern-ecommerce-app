const mongoose=require('mongoose');
const ProductSchema = new mongoose.Schema({
    image : String,
    title : String,
    description : String,
    category : String,
    brand : String,
    price : String,
    salePrice : String,
    totalStock : String,
},{timestamps: true});

const Product=mongoose.model('Product',ProductSchema)
module.exports= Product;