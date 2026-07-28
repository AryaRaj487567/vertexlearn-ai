const Enrollment = require("./enrollment.model");
const Course = require("../courses/course.model");

const enrollInCourse = async (studentId, courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const existingEnrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
    });

    if (existingEnrollment) {
        throw new Error("Already enrolled");
    }

    const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
    });

    return enrollment;
};

const getMyEnrollments = async (studentId) => {

    return await Enrollment.find({
        student: studentId,
    })
    .populate({
        path: "course",
        populate: {
            path: "instructor",
            select: "name email",
        },
    });

};

const getCourseEnrollments = async (courseId, instructorId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    return await Enrollment.find({
        course: courseId,
    })
    .populate("student", "name email");
};

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    getCourseEnrollments,
};