const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
    {
        questionIndex: Number,
        selectedOption: Number,
    },
    {
        _id: false,
    }
);

const quizAttemptSchema = new mongoose.Schema(
    {
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
            required: true,
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        answers: [answerSchema],

        score: {
            type: Number,
            default: 0,
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

quizAttemptSchema.index(
    { quiz: 1, student: 1 },
    { unique: true }
);

module.exports = mongoose.model(
    "QuizAttempt",
    quizAttemptSchema
);