const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // MongoDB connection string
const dbName = "Engineers"; // Your database name

let db;

const connectToDb = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

const getDb = () => {
    if (!db) {
        throw new Error("Database not connected. Call connectToDb first.");
    }
    return db;
};

module.exports = { connectToDb, getDb };
