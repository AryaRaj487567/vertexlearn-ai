const {
    createQuiz,
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

module.exports = {
    create,
};