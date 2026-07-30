const Assignment = require("./assignment.model");
const Submission = require("./submission.model");
const Course = require("../courses/course.model");
const Enrollment = require("../enrollments/enrollment.model");

const createAssignment = async (
    courseId,
    instructorId,
    assignmentData
) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    const assignment = await Assignment.create({
        ...assignmentData,
        course: courseId,
    });

    return assignment;
};

const getAssignmentsByCourse = async (courseId) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    const assignments = await Assignment.find({
        course: courseId,
    }).sort({ createdAt: -1 });

    return assignments;
};

const submitAssignment = async (
    assignmentId,
    studentId,
    submissionData
) => {

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    const enrollment = await Enrollment.findOne({
        student: studentId,
        course: assignment.course,
    });

    if (!enrollment) {
        throw new Error("Not enrolled");
    }

    const existingSubmission = await Submission.findOne({
        assignment: assignmentId,
        student: studentId,
    });

    if (existingSubmission) {
        throw new Error("Assignment already submitted");
    }

    const submission = await Submission.create({
        assignment: assignmentId,
        student: studentId,
        submissionUrl: submissionData.submissionUrl,
    });

    return submission;
};

const getAssignmentSubmissions = async (
    assignmentId,
    instructorId
) => {

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new Error("Assignment not found");
    }

    const course = await Course.findById(assignment.course);

    if (!course) {
        throw new Error("Course not found");
    }

    if (course.instructor.toString() !== instructorId) {
        throw new Error("Unauthorized");
    }

    const submissions = await Submission.find({
        assignment: assignmentId,
    })
        .populate("student", "name email")
        .sort({ submittedAt: -1 });

    return submissions;
};

const gradeSubmission = async (
    submissionId,
    instructorId,
    gradeData
) => {

    const submission = await Submission.findById(submissionId)
        .populate({
            path: "assignment",
            populate: {
                path: "course",
                select: "instructor"
            }
        });

    if (!submission) {
        throw new Error("Submission not found");
    }

    if (
        submission.assignment.course.instructor.toString() !==
        instructorId
    ) {
        throw new Error("Unauthorized");
    }

    submission.marks = gradeData.marks;
    submission.feedback = gradeData.feedback;

    await submission.save();

    return submission;
};

module.exports = {
    createAssignment,
    getAssignmentsByCourse,
    submitAssignment,
    getAssignmentSubmissions,
    gradeSubmission,
};