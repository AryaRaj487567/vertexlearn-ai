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

const updateCourse = async (id, courseData) => {
    return await Course.findByIdAndUpdate(
        id,
        courseData,
        {
            new: true,
            runValidators: true,
        }
    );
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
};