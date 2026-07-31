const Quiz = require("./quiz.model");
const QuizAttempt = require("./quizAttempt.model");
const Course = require("../courses/course.model");

const createQuiz = async (
    courseId,
    instructorId,
    quizData
) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    // Calculate total marks
    const totalMarks = quizData.questions.reduce(
        (sum, question) => sum + (question.marks || 1),
        0
    );

    const quiz = await Quiz.create({
        ...quizData,
        course: courseId,
        totalMarks,
    });

    return quiz;
};

module.exports = {
    createQuiz,
};
