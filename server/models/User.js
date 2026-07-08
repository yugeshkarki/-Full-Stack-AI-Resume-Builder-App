import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema=new mongoose.Schema({
 name:{type:string,required:true},
email:{type:string,required:true,unique:true},
 password:{type:string,required:true},

},{timestamps:true})

UserSchema.methods.comparePassword=function(password){
return bcrypt.compareSync(password,this.password)
}

const User=mongoose.model("user",UserSchema)

export default User;