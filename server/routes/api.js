const express = require("express");
const router = express.Router();
const { getEngineerDetails } = require("../controllers/engineer");

// Route for fetching engineer details based on suburb
router.get("/engineer-details", async (req, res) => {
    try {
        const suburb = req.query.suburb;
        console.log("Suburb received:", suburb);

        if (!suburb) {
            return res.status(400).json({ error: "Suburb query parameter is required." });
        }

        const engineerDetails = await getEngineerDetails(suburb);
        if (!engineerDetails) {
            return res.status(404).json({ message: "No data found for this suburb." });
        }

        res.json(engineerDetails);
    } catch (error) {
        console.error("Error in /engineer-details route:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
