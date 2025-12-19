const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/collegeDB"); //is used to connect url or string
        console.log("MongoDB connected to collegeDB");
    } catch (error) {
        console.error("MongoDB connection failed", error); //console.info is used to show information
        process.exit(1);
    }
};

module.exports = connectDB;
