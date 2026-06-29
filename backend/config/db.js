const mongoose = require("mongoose");

async function connectDB() {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MONGO_URI is not defined. Skipping MongoDB connection.");
        process.exit(1);
    }

    mongoose.connection.on("connected", () => console.log("MongoDB Connected Successfully"));
    mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err.message));
    mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));

    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });

    // Verify the connection is actually alive
    if (mongoose.connection.readyState !== 1) {
        throw new Error("Mongoose readyState is not 'connected' after connect()");
    }

    return mongoose.connection;
}

module.exports = connectDB;