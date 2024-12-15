const { getDb } = require("../config/db");

const getEngineerDetails = async (suburb) => {
    try {
        const db = getDb(); // Get the MongoDB instance
        const collection = db.collection("sample");

        console.log("Querying for suburb:", suburb); // Debugging

        // Query the database for documents matching the given suburb
        const result = await collection.findOne(
            { ward: { $regex: `^${suburb}$`, $options: "i" } }, // Case-insensitive match
            { projection: { _id: 0, "Chief Engineer": 1, "Telephone-1": 1 } } // Only fetch required fields
        );

        console.log("Database query result:", result); // Debugging
        return result; // Return the result (or null if not found)
    } catch (error) {
        console.error("Error in getEngineerDetails controller:", error);
        throw error;
    }
};

module.exports = { getEngineerDetails };
