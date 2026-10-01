const express = require("express");

const Campaign = require("../models/Campaign");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();


// GET ALL CAMPAIGNS
router.get("/", async (req, res) => {
    try {

        const campaigns = await Campaign.find();

        res.json(campaigns);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ONE CAMPAIGN
router.get("/:id", async (req, res) => {
    try {

        const campaign = await Campaign.findById(
            req.params.id
        );

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        res.json(campaign);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// CREATE CAMPAIGN - ADMIN ONLY
router.post("/", auth, admin, async (req, res) => {
    try {

        const {
            title,
            description,
            targetAmount
        } = req.body;

        const campaign = await Campaign.create({
            title,
            description,
            targetAmount
        });

        res.status(201).json({
            message: "Campaign created successfully",
            campaign
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE CAMPAIGN - ADMIN ONLY
router.put("/:id", auth, admin, async (req, res) => {
    try {

        const campaign = await Campaign.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        res.json({
            message: "Campaign updated successfully",
            campaign
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE CAMPAIGN - ADMIN ONLY
router.delete("/:id", auth, admin, async (req, res) => {
    try {

        const campaign = await Campaign.findByIdAndDelete(
            req.params.id
        );

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        res.json({
            message: "Campaign deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;