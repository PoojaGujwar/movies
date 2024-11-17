const mongoose = require('mongoose');
require("dotenv").config();
const mongoURI = process.env.MONGODB;
console.log(mongoURI)

const initializeDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to database");
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
};
module.exports = {initializeDatabase}