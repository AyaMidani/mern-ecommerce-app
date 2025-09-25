const Product = require('../../models/Products')

const searchProducts = async(req,res)=>{
    try {
        const {keyword} = req.params;
        if(!keyword || typeof keyword !== 'string'){
            res.status(400).json({
            success: false,
            message: 'keyword is required and must be in string'
        })
        const regEx = new RegExp(keyword, 'i')
        console.log(regEx)
        const createSearchQuery= {
            $or :[
                {title: regEx},
                {description: regEx},
                {category: regEx},
                {brand: regEx},
            ]
        }
        const searchresults = await Product.find(createSearchQuery)
        return res.status(200).json({
            success: true,
            data: searchresults
        })
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Error Ocurred'
        })
    }
}

module.exports = {searchProducts}