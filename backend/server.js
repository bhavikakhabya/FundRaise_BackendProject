const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Check incoming requests
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Auth Routes
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

// Campaign Routes
app.use(
    "/api/campaigns",
    require("./routes/campaignRoutes")
);

// Donation Routes
app.use(
    "/api/campaigns",
    require("./routes/donationRoutes")
);

// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "Donation and Fundraising API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});