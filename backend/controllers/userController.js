import userModal from "../models/userModal.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'
import { response } from "express";


//login user

const loginUser = async (req,res)=>{

    const {email,password} = req.body;

    try {
        const user = await userModal.findOne({email});
        if(!user){
            return res.json({sucess:false,message:"User doesnot Exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({sucess:false,message:"Incorrect Password"});
        }

        const token = createToken(user._id);

        res.json({sucess:true,token});

    } catch (error) {
        console.log(error)
        return res.json({sucess:false,message:"ERROR"});
    }
}

const createToken = (id) =>{
        return jwt.sign({id},process.env.JWT_SECRET)
}

//regestir user

const registerUser = async (req,res)=>{

    const {name,password,email} = req.body;

    try { 
        //checking existing of user      
        const exist = await userModal.findOne({email})

        if(exist){
            return res.json({sucess:false,message:"User already Exists"})
        }
        //validating email format and strong password

        if(!validator.isEmail(email)){
            return res.json({sucess:false,message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({sucess:false,message:"Please enter strong password"})
        }

        //hasing user password

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);


        const newUser = new userModal({

            name:name,
            password:hashedpassword,
            email:email

        })

       const user = await newUser.save();
       const token = createToken(user._id);
       res.json({sucess:true,token})
       

    } catch (error) {
        console.log(error)
        res.json({sucess:false,message:"Error"})
    }

}


export {
    loginUser,registerUser
}
