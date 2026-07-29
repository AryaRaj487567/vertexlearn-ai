const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        videoUrl: {
            type: String,
            default: "",
        },

        duration: {
            type: Number,
            default: 0,
        },

        order: {
            type: Number,
            required: true,
        },

        isPreview: {
            type: Boolean,
            default: false,
        },

        resources: [
            {
                title: String,
                url: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Lecture",
    lectureSchema
);