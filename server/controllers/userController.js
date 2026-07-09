import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import Resume from '../models/Resume.js'

const generateToken=(userID)=>{
 const token=jwt.sign({userID},process.env.JWT_SECRET, {expiresIn:'7d'})
 return token;
}
//controller for user registraton
//post:/api/users/register

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
        return res.status(400).json({message:"user already exits"})
    }

    //create new user
    const hashedPassword=await bcrypt.hash(password, 10);
    const newUser=await User.create({name,email,password:hashedPassword})

    const token=generateToken(newUser._id)
    newUser.password=undefined;

    return res.status(201).json({message:"user created successfully",token ,user:newUser})
     } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//controller for user login
//post:/api/users/login
export const loginUser= async (req,res) => {
    try {
        

      const{email,password}=req.body;

    //   check if user already exits

    const user=await User.findOne({email})
    if (!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    //check if password is correct
    if(!user.comparePassword(password)){
      return res.status(400),json({message:"Invalid email or password"})
    }

 //return sucess message
 

    const token=generateToken(user._id)
    user.password=undefined;

    return res.status(200).json({message:"login successfull",token ,user:user})
     } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//controller for getting user by id
//GET:/api/users/data
export const getUserById= async (req,res) => {
    try {
        const userId=req.userId

        //check if user exits
        const user=await User.findById(userId)
        if(!user){
          return res.status(404).json({message:"User not found"})
        }

      //return user
      user.password=undefined;
          return res.status(200).json({user})
     } catch (error) {
        res.status(400).json({message:error.message})
    }
}

//controller for getting user resumes
//GET:/api/users/resumes
export const getUserResumes=async (req,res)=>{
  try {
    const userId =req.userId;
    const resumes=await Resume.find({userId})
    return res.status(200).json({resumes})
    
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}