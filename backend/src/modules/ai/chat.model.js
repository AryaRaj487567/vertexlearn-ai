const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        lecture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
            required: true,
        },

        question: {
            type: String,
            required: true,
            trim: true,
        },

        answer: {
            type: String,
            required: true,
        },

        sources: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", chatSchema);