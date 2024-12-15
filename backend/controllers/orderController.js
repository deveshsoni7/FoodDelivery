import orderModal from "../models/orderModal.js";
import userModal from "../models/userModal.js"

import stripe from "stripe"


// Placing user order form frontend

const placeOrder = async (req,res) =>{
    
}

const userOrder = async (req,res) =>{
    try {
        const orders = await orderModal.find({userId:req.body.userId})
        res.json({sucess:true,data:orders});
    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"ERROR"})
    }
}


export {placeOrder,userOrder}