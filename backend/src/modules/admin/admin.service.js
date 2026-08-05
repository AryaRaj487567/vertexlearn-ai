const User = require("../users/user.model");
const Course = require("../courses/course.model");
const Enrollment = require("../enrollments/enrollment.model");
const Certificate = require("../certificates/certificate.model");
//const { getAllCourses } = require("../courses/course.service"); 
const getDashboard = async () => {

    const [
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalCertificates,
    ] = await Promise.all([
        User.countDocuments(),
        Course.countDocuments(),
        Enrollment.countDocuments(),
        Certificate.countDocuments(),
    ]);

    return {
        totalUsers,
        totalCourses,
        totalEnrollments,
        totalCertificates,
    };

};

const getAllUsers = async () => {

    const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

    return users;

};

const deleteUser = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.role === "admin") {
        throw new Error("Cannot delete admin user");
    }

    await User.findByIdAndDelete(userId);

};

const getAllCourses = async () => {

    const courses = await Course.find()
        .populate(
            "instructor",
            "name email"
        )
        .sort({ createdAt: -1 });

    return courses;

};

const deleteCourse = async (courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    await Course.findByIdAndDelete(courseId);

};

module.exports = {
    getDashboard,
    getAllUsers,
    deleteUser,
    getAllCourses,
    deleteCourse,
};