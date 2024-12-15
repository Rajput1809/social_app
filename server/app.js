const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const { connectToDb } = require("./config/db");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRoutes); // Ensure this line exists!

// Start Server
const startServer = async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
};

startServer();
