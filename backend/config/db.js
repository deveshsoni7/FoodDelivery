import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://devesh:devesh@cluster0.0oqev.mongodb.net/").then(()=>console.log("DB connected"))
}