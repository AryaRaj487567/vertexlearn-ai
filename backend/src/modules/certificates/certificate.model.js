const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },

        certificateId: {
            type: String,
            required: true,
            unique: true,
        },

        issuedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// One certificate per student per course
certificateSchema.index(
    { student: 1, course: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "Certificate",
    certificateSchema
);