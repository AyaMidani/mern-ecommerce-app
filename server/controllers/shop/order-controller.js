
const iyzico = require('../../helpers/iyzipay')
const Order = require('../../models/Order')

const createOrder  = async(req,res)=>{
    try {
        const {userId,cartItems,addressInfo,orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId} =req.body
        const create_payment_json={
            intent : 'sale',
            payer:{
                paymentMethod : 'iyzico'
            },
            redirect_urls:{
                return_url : 'http://localhost:5173/shop/iyzico-return' ,
                cancel_url : 'http://localhost:5173/shop/paypal-cancel'
            },
            transactions : [
                {
                    item_list : {
                        items: cartItems.map(item=>({
                            name: item.title,
                            sku : item.productId,
                            price: item.price.toFixed(2),
                            currency: 'tl',
                            quantity: item.quantity
                        }))
                    },
                    amount :{
                        currency :'tl',
                        total: totalAmount.toFixed(2)
                    },
                    description : 'description'
                }
            ]
        }
        iyzico.payment.create(create_payment_json, async(error,paymentInfo)=>{
            if(error){
                console.log(error)
                res.status(500).json({
                    success: false,
                    message: "Error while creating iyizco payment",
                });
            }
            else{
                const newlyCreatedOrder = new Order({ userId,cartItems,addressInfo,orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId})
                await newlyCreatedOrder.save();
                const approvalURL = paymentInfo.links.find(link =>link.rel === 'approval_url').href;
                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
            });
        }
    })
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}


const capturePayment  = async(req,res)=>{
    try {

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

module.exports ={createOrder,capturePayment}

