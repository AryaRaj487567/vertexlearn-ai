const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        _id: true,
    }
);

const discussionSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        content: {
            type: String,
            required: true,
        },

        replies: [replySchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Discussion",
    discussionSchema
);