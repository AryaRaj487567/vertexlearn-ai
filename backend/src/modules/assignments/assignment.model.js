const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        dueDate: {
            type: Date,
            required: true,
        },

        totalMarks: {
            type: Number,
            default: 100,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Assignment",
    assignmentSchema
);