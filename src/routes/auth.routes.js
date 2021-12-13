import { Router } from "express";
import uservalidate from '../validations/user.validate.js';
import User from "../model/users.model.js";
import jwt from "jsonwebtoken";
const authRouter =Router()

authRouter.post("/register", async(req,res)=>{
    try {
       await uservalidate.validateAsync(req.body) 
    } catch (error) {
       return res.status(400).json({error:error.message})
    }
    const user= new User(req.body);
    await user.save();
    res.json({message:"user created"})
})
authRouter.post("/login", async(req ,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email ,password})
    if (user) {
        const token=jwt.sign(JSON.stringify(user),process.env.JWT_KEY);
        res.json({token})
    }else{
        res.status(400).json({error:"invalid authentication data"})
    }
})

export default authRouter;