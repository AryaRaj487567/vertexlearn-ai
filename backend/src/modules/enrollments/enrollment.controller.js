const {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
} = require("./enrollment.service");

const enroll = async (req, res) => {
    try {
        const enrollment = await enrollInCourse(
            req.user.id,
            req.params.courseId
        );
        res.status(201).json({
            success: true,
            message: "Enrolled successfully",
            data: enrollment,
        });
    } catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Already enrolled") {
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

const getMyCourses = async (req, res) => {

    try {

        const enrollments = await getMyEnrollments(
            req.user.id
        );

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getStudents = async (req, res) => {

    try {

        const enrollments = await getCourseEnrollments(
            req.params.courseId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments,
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
                message: "You are not authorized to view enrollments for this course.",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    enroll,
    getMyCourses,
    getStudents,
};