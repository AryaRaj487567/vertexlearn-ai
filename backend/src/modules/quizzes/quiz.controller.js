const {
    createQuiz,
    getQuizzesByCourse,
    attemptQuiz,
    getQuizResult,
} = require("./quiz.service");

const create = async (req, res) => {

    try {
        const quiz = await createQuiz(
            req.params.courseId,
            req.user.id,
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: quiz,
        });

    } catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Unauthorized") {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getByCourse = async (req, res) => {

    try {
        const quizzes = await getQuizzesByCourse(
            req.params.courseId
        );
        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes,
        });

    } catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const attempt = async (req, res) => {

    try {
        const result =
            await attemptQuiz(
                req.params.quizId,
                req.user.id,
                req.body.answers
            );
        res.status(201).json({
            success: true,
            message:
                "Quiz submitted successfully",
            data: result,
        });

    } catch (error) {
        if (
            error.message === "Quiz not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        if (
            error.message === "Not enrolled"
        ) {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }
        if (
            error.message ===
            "Quiz already attempted"
        ) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getResult = async (req, res) => {

    try {
        const result = await getQuizResult(
            req.params.quizId,
            req.user.id
        );
        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {
        if (error.message === "Quiz not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Quiz not attempted") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getByCourse,
    attempt,
    getResult,
};