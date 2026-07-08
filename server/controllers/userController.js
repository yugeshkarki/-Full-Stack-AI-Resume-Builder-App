import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const generateToken=(userID)=>{
 const token=jwt.sign({userID},process.env.JWT_SECRET, {expiresIn:'7d'})
 return token;
}

export const registerUser= async (req,res) => {
    try {
        

      const{name,email,password}=req.body;


      //check if required fields are present
      if(!name||!email||!password){
        return res.status(400).json({message:'missing required fields'})
      }

    //   check if user already exits

    const user=await User.findOne({email})
    if (user){
        return res.status(400),json({message:"user already exits"})
    }

    //create new user
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUser=await User.create({name,email,password})

    const token=generateToken(newUser._id)
    newUser.password=undefined;

    return res.status(201).json({message:"user created successfully",token ,user:newUser})
     } catch (error) {
        res.status(400).json({message:error.message})
    }
}