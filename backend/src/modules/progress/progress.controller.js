const {
    markLectureCompleted,
    getCourseProgress,
    continueLearning,
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

const getProgress = async (req, res) => {

    try {
        const progress = await getCourseProgress(
            req.user.id,
            req.params.courseId
        );
        res.status(200).json({
            success: true,
            data: progress,
        });

    } catch (error) {
        if (error.message === "Not enrolled") {
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

const getContinueLearning = async (req, res) => {

    try {
        const lecture = await continueLearning(
            req.user.id,
            req.params.courseId
        );
        if (!lecture) {
            return res.status(200).json({
                success: true,
                message: "Course completed",
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            data: lecture,
        });

    } catch (error) {
        if (error.message === "Not enrolled") {
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
    completeLecture,
    getProgress,
    getContinueLearning,
};