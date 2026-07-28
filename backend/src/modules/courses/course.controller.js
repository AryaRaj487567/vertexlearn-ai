const { createCourse,
        getAllCourses,
        getCourseById,
        updateCourse,
        deleteCourse,
    } = require("./course.service");

const create = async (req, res) => {
    try {
        const courseData = {
            ...req.body,
            instructor: req.user.id,
        };
        const course = await createCourse(courseData);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course,
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });

    }
};

const getAll = async (req, res) => {
    try {

        const result = await getAllCourses(req.query);

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getById = async (req, res) => {
    try {
        const course = await getCourseById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
        res.status(200).json({
            success: true,
            data: course,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const update = async (req, res) => {
    try {
        const course = await updateCourse(
            req.params.id,
            req.user.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course,
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
                message: "You are not authorized to update this course.",
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
        await deleteCourse(
            req.params.id,
            req.user.id
        );
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
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
                message: "You are not authorized to delete this course.",
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
    getAll,
    getById,
    update,
    remove,
};