const Progress = require("./progress.model");
const Enrollment = require("../enrollments/enrollment.model");
const Lecture = require("../lectures/lecture.model");

const markLectureCompleted = async (studentId, lectureId) => {

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new Error("Lecture not found");
    }

    const enrollment = await Enrollment.findOne({
        student: studentId,
        course: lecture.course,
    });

    if (!enrollment) {
        throw new Error("Not enrolled");
    }

    let progress = await Progress.findOne({
        student: studentId,
        course: lecture.course,
    });

    if (!progress) {
        progress = await Progress.create({
            student: studentId,
            course: lecture.course,
            completedLectures: [],
        });
    }

    if (
        progress.completedLectures.some(
            id => id.toString() === lectureId
        )
    ) {
        throw new Error("Lecture already completed");
    }

    progress.completedLectures.push(lectureId);

    await progress.save();

    const totalLectures = await Lecture.countDocuments({
        course: lecture.course,
    });

    const completedCount =
        progress.completedLectures.length;

    const percentage = Math.round(
        (completedCount / totalLectures) * 100
    );

    enrollment.progress = percentage;

    if (percentage === 100) {
        enrollment.completed = true;
    }

    await enrollment.save();

    return {
        progress,
        percentage,
    };
};

module.exports = {
    markLectureCompleted,
};