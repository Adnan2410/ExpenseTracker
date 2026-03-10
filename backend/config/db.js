const mongoose=require("mongoose");

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("MongDB connected successfully");
    } catch (err) {
        console.error("Error in connecting MongoDB",err);
        process.exit(1);
    }
};
module.exports = connectDB;