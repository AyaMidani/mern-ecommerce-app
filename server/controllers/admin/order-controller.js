const Order = require('../../models/Order');

const getAllOrdersOfAllUsers = async(req,res)=>{
    try {
      const orders = await Order.find({ })
      
      if(!orders.length){
        res.status(404).json({
            success: false,
            message: "No Orders found!",
        });
      }
      res.status(200).json({
            success: true,
            data: orders,
        });

    } catch (error) {
       res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const getOrderDetailsForAdmin = async(req,res)=>{
    try {
      const {id} = req.params;
      const order = await Order.findById(id);
      if(!order){
        res.status(404).json({
            success: false,
            message: "Order Not found!",
        });
      }
      res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
       res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
} 

const UpdateOrderStatus = async(req,res)=>{
    try {
      const {id} = req.params;
      const {orderStatus} = req.body;
      const order = await Order.findById(id);
      if(!order){
        res.status(404).json({
            success: false,
            message: "Order Not found!",
        });
      }
      await Order.findByIdAndUpdate(id,{orderStatus})
      res.status(200).json({
            success: true,
            message: 'Order status is updated successfully',
        });
    } catch (error) {
       res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
} 


module.exports = {getAllOrdersOfAllUsers,getOrderDetailsForAdmin,UpdateOrderStatus};