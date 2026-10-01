const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        targetAmount: {
            type: Number,
            required: true,
            min: 1
        },

        raisedAmount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Campaign", campaignSchema);