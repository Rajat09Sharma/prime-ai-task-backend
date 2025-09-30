const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected.`);
    } catch (error) {
        console.error(`Error connecting to MongoDB.`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
