const express = require("express");

const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");

const auth = require("../middleware/auth");

const router = express.Router();

// MAKE A DONATION
router.post("/:id/donate", auth, async (req, res) => {
    try {
        const { amount } = req.body;

        // Check donation amount
        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Donation amount must be greater than 0"
            });
        }

        // Find campaign
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found"
            });
        }

        // Check if campaign is already completed
        if (campaign.status === "completed") {
            return res.status(400).json({
                message: "Campaign is already completed"
            });
        }

        // Calculate remaining amount
        const remainingAmount =
            campaign.targetAmount - campaign.raisedAmount;

        // Donation cannot exceed remaining amount
        if (amount > remainingAmount) {
            return res.status(400).json({
                message:
                    `Donation cannot exceed the remaining amount of ₹${remainingAmount}`
            });
        }

        // Create donation
        const donation = await Donation.create({
            amount,
            campaign: campaign._id,
            user: req.user.id
        });

        // Update raised amount
        campaign.raisedAmount += amount;

        // Mark campaign completed if target reached
        if (campaign.raisedAmount >= campaign.targetAmount) {
            campaign.status = "completed";
        }

        // Save campaign
        await campaign.save();

        // Send response
        res.status(201).json({
            message: "Donation successful",
            donation,
            campaign: {
                id: campaign._id,
                title: campaign.title,
                targetAmount: campaign.targetAmount,
                raisedAmount: campaign.raisedAmount,
                status: campaign.status
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.get("/:id/donations", async (req, res) => {
    try {
        const donations = await Donation.find({
            campaign: req.params.id
        })
            .populate("user", "name email")
            .populate("campaign", "title");

        res.json(donations);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;