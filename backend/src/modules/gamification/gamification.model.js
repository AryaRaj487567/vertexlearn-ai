const mongoose = require("mongoose");

const gamificationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        xp: {
            type: Number,
            default: 0,
        },

        level: {
            type: Number,
            default: 1,
        },

        badges: [
            {
                type: String,
            },
        ],

        streak: {
            type: Number,
            default: 0,
        },

        lastActivity: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Gamification",
    gamificationSchema
);