const Course = require("./course.model");

const createCourse = async (courseData) => {
    const course = await Course.create(courseData);
    return course;
};

const getAllCourses = async () => {
    return await Course.find()
        .populate("instructor", "name email");
};

const getCourseById = async (id) => {
    return await Course.findById(id)
        .populate("instructor", "name email");
};

const updateCourse = async (courseId, instructorId, updateData) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }
    Object.assign(course, updateData);
    return await course.save();
};

const deleteCourse = async (courseId, instructorId) => {
    const course = await Course.findById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }
    await course.deleteOne();
    return course;
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};