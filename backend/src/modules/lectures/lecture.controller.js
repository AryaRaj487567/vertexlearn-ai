const {
    createLecture,
    getLecturesByCourse,
    getLectureById,
    updateLecture,
    deleteLecture,
} = require("./lecture.service");

const create = async (req, res) => {

    try {
        const lecture = await createLecture(
            req.params.courseId,
            req.user.id,
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Lecture created successfully",
            data: lecture,
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
                message: "You are not authorized to add lectures to this course.",
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
        const lectures = await getLecturesByCourse(
            req.params.courseId
        );
        res.status(200).json({
            success: true,
            count: lectures.length,
            data: lectures,
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

const getById = async (req, res) => {

    try {
        const lecture = await getLectureById(
            req.params.lectureId
        );
        res.status(200).json({
            success: true,
            data: lecture,
        });

    } catch (error) {

        if (error.message === "Lecture not found") {
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

const update = async (req, res) => {

    try {
        const lecture = await updateLecture(
            req.params.lectureId,
            req.user.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            data: lecture,
        });

    } catch (error) {

        if (error.message === "Lecture not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Unauthorized") {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to update this lecture.",
            });
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const remove = async (req, res) => {

    try {
        await deleteLecture(
            req.params.lectureId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
        });

    } catch (error) {

        if (error.message === "Lecture not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Unauthorized") {
            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to delete this lecture.",
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
    getById,
    update,
    remove,
};