import mongoose from "mongoose";
const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("database connected sucessfully")});
            let mongodbURI=process.env.MONGODB_URI;
            const projectName='resume-builder'

            if(!mongodbURI){
                throw new Error("MONGODB_URI enviromental variable  not set")
            }

            if(mongodbURI.endsWith('/')){
                mongodbURI=mongodbURI.slice(0,-1)
            }

            await mongoose.connect(`${mongodbURI}/${projectName}`)
        
        
    } 
    catch (error) {
        console.error("Error connectiong to mongoDB:",error)
    }
}
export default connectDB;