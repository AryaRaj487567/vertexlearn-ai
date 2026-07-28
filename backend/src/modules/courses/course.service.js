const Course = require("./course.model");

const createCourse = async (courseData) => {
    const course = await Course.create(courseData);
    return course;
};

const getAllCourses = async (queryParams) => {

    const {
        search,
        category,
        level,
        page = 1,
        limit = 10,
        sort = "createdAt",
    } = queryParams;

    const filter = {};

    if (search) {
        filter.title = {
            $regex: search,
            $options: "i",
        };
    }

    if (category) {
        filter.category = category;
    }

    if (level) {
        filter.level = level;
    }

    const skip = (page - 1) * limit;

    const courses = await Course.find(filter)
        .populate("instructor", "name email")
        .sort(sort)
        .skip(skip)
        .limit(Number(limit));

    const total = await Course.countDocuments(filter);

    return {
        courses,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
    };
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