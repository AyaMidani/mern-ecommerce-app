const Address = require('../../models/Address')

const addAddress  = async(req,res)=>{
    try {
        const {userId, address, city, pincode, phone, notes}=req.body
        if(!userId || !address || !city ||!pincode ||!phone ||!notes){
            return  res.status(400).json({
            success: false,
            message: "Invalid data provided!",
        })
    }
    const newlyCreatedAddress = new Address({
        userId, address, city, pincode, notes, phone
    })
    await newlyCreatedAddress.save();
    res.status(201).json({
        success: true,
        data: newlyCreatedAddress
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const fetchAllAddress  = async(req,res)=>{
   try {
        const {userId}=req.params
        if(!userId){
            return  res.status(400).json({
            success: false,
            message: "User id is required!",
        })
    }
    const addressList = Address.find({userId})
    res.status(200).json({
        success: true,
        data: addressList
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const editAddress  = async(req,res)=>{
    try {
        const {userId,addressId}=req.params
        const formData = req.body
        if(!userId || !addressId){
            return  res.status(400).json({
            success: false,
            message: "User and address id is required",
        })   
    }
    const address = await Address.findOneAndUpdate({
        _id: addressId,
        userId: userId
    },formData,{new : true})

    if(!address){
        return  res.status(404).json({
            success: false,
            message: "Address is not found",
        })   
    }
        res.status(200).json({
        success: true,
        data: address
    })
    }  catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

const deleteAddress  = async(req,res)=>{
    try {
        const {userId,addressId}=req.params
        if(!userId || !addressId){
            return  res.status(400).json({
            success: false,
            message: "User and address id is required",
        })
    }
        const address = await Address.findOneAndDelete({
            _id: addressId,userId
        })
        if(!address){
        return  res.status(404).json({
            success: false,
            message: "Address is not found",
        })   
    }
        res.status(200).json({
        success: true,
        message: "Address is deleted successfully"
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occured",
        });
    }
}

module.exports={addAddress,editAddress,fetchAllAddress,deleteAddress}