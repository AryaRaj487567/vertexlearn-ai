const {
    markLectureCompleted,
} = require("./progress.service");

const completeLecture = async (req, res) => {

    try {
        const result = await markLectureCompleted(
            req.user.id,
            req.params.lectureId
        );
        res.status(200).json({
            success: true,
            message: "Lecture marked as completed",
            data: result,
        });

    } catch (error) {
        if (error.message === "Lecture not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Not enrolled") {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Lecture already completed") {
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

module.exports = {
    completeLecture,
};