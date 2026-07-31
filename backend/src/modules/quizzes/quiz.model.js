const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },

        options: {
            type: [String],
            required: true,
            validate: {
                validator: (arr) => arr.length === 4,
                message: "Exactly 4 options are required.",
            },
        },

        correctAnswer: {
            type: Number,
            required: true,
            min: 0,
            max: 3,
        },

        marks: {
            type: Number,
            default: 1,
        },
    },
    {
        _id: false,
    }
);

const quizSchema = new mongoose.Schema(
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

        questions: [questionSchema],

        totalMarks: {
            type: Number,
            default: 0,
        },

        timeLimit: {
            type: Number,
            default: 30, // minutes
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Quiz", quizSchema);