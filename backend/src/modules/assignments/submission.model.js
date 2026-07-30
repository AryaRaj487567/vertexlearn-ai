const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
            required: true,
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        submissionUrl: {
            type: String,
            required: true,
        },

        marks: {
            type: Number,
            default: null,
        },

        feedback: {
            type: String,
            default: "",
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

submissionSchema.index(
    { assignment: 1, student: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "Submission",
    submissionSchema
);