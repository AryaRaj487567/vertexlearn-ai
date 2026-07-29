const Lecture = require("./lecture.model");
const Course = require("../courses/course.model");
const { updateCourse } = require("../courses/course.service");

const createLecture = async (courseId, instructorId, lectureData) => {

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    // Ownership check
    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    // Create lecture
    const lecture = await Lecture.create({
        ...lectureData,
        course: courseId,
    });

    return lecture;
};

const getLecturesByCourse = async (courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    return await Lecture.find({
        course: courseId,
    }).sort({ order: 1 });

};

const getLectureById = async (lectureId) => {

    const lecture = await Lecture.findById(lectureId)
        .populate("course", "title");

    if (!lecture) {
        throw new Error("Lecture not found");
    }
    return lecture;
};

const updateLecture = async (
    lectureId,
    instructorId,
    updateData
) => {

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new Error("Lecture not found");
    }

    const course = await Course.findById(
        lecture.course
    );

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    Object.assign(lecture, updateData);

    return await lecture.save();
};

const deleteLecture = async (
    lectureId,
    instructorId
) => {

    const lecture = await Lecture.findById(
        lectureId
    );

    if (!lecture) {
        throw new Error("Lecture not found");
    }

    const course = await Course.findById(
        lecture.course
    );

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    await lecture.deleteOne();

    return lecture;
};

module.exports = {
    createLecture,
    getLecturesByCourse,
    getLectureById,
    updateLecture,
    deleteLecture,
};