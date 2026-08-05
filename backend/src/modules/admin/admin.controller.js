const {
    getDashboard,
    getAllUsers,
    deleteUser,
    getAllCourses,
    deleteCourse,
    getAnalytics,
} = require("./admin.service");

const dashboard = async (req, res) => {

    try {
        const stats = await getDashboard();

        res.status(200).json({
            success: true,
            data: stats,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUsers = async (req, res) => {

    try {
        const users = await getAllUsers();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const removeUser = async (req, res) => {

    try {
        await deleteUser(
            req.params.userId
        );
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {
        if (
            [
                "User not found",
                "Cannot delete admin user",
            ].includes(error.message)
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

const getCourses = async (req, res) => {

    try {
        const courses = await getAllCourses();
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const removeCourse = async (req, res) => {

    try {
        await deleteCourse(
            req.params.courseId
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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const analytics = async (req, res) => {

    try {

        const data = await getAnalytics();

        res.status(200).json({
            success: true,
            data,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    dashboard,
    getUsers,
    removeUser,
    getCourses,
    removeCourse,
    analytics,
};