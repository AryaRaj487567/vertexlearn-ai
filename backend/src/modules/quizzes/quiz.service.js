const Enrollment = require("../enrollments/enrollment.model");
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

const getQuizzesByCourse = async (courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const quizzes = await Quiz.find({
        course: courseId,
    }).sort({ createdAt: -1 });

    return quizzes;
};

const attemptQuiz = async (
    quizId,
    studentId,
    answers
) => {

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    const enrollment = await Enrollment.findOne({
        student: studentId,
        course: quiz.course,
    });

    if (!enrollment) {
        throw new Error("Not enrolled");
    }

    const existingAttempt =
        await QuizAttempt.findOne({
            quiz: quizId,
            student: studentId,
        });

    if (existingAttempt) {
        throw new Error("Quiz already attempted");
    }

    let score = 0;

    answers.forEach(answer => {

        const question =
            quiz.questions[answer.questionIndex];

        if (
            question &&
            question.correctAnswer ===
            answer.selectedOption
        ) {
            score += question.marks;
        }

    });

    const attempt =
        await QuizAttempt.create({
            quiz: quizId,
            student: studentId,
            answers,
            score,
        });

    return {
        attempt,
        totalMarks: quiz.totalMarks,
    };

};

const getQuizResult = async (quizId, studentId) => {

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
        throw new Error("Quiz not found");
    }

    const attempt = await QuizAttempt.findOne({
        quiz: quizId,
        student: studentId,
    });

    if (!attempt) {
        throw new Error("Quiz not attempted");
    }

    return {
        quizTitle: quiz.title,
        score: attempt.score,
        totalMarks: quiz.totalMarks,
        submittedAt: attempt.submittedAt,
    };
};

module.exports = {
    createQuiz,
    getQuizzesByCourse,
    attemptQuiz,
    getQuizResult,
};
