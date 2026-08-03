const Discussion = require("./discussion.model");
const Course = require("../courses/course.model");
const Enrollment = require("../enrollments/enrollment.model");

const createDiscussion = async (
    courseId,
    userId,
    role,
    discussionData
) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (role === "student") {

        const enrollment = await Enrollment.findOne({
            student: userId,
            course: courseId,
        });

        if (!enrollment) {
            throw new Error("Not enrolled");
        }

    } else if (role === "instructor") {

        if (course.instructor.toString() !== userId) {
            throw new Error("Unauthorized");
        }

    }

    const discussion = await Discussion.create({
        course: courseId,
        author: userId,
        title: discussionData.title,
        content: discussionData.content,
    });

    return discussion;
};

const getDiscussionsByCourse = async (
    courseId,
    userId,
    role
) => {

    const course = await Course.findById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (role === "student") {

        const enrollment = await Enrollment.findOne({
            student: userId,
            course: courseId,
        });

        if (!enrollment) {
            throw new Error("Not enrolled");
        }

    } else if (role === "instructor") {

        if (course.instructor.toString() !== userId) {
            throw new Error("Unauthorized");
        }

    }

    const discussions = await Discussion.find({
        course: courseId,
    })
        .populate("author", "name email")
        .populate("replies.user", "name email")
        .sort({ createdAt: -1 });

    return discussions;
};

const replyToDiscussion = async (
    discussionId,
    userId,
    role,
    message
) => {

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    const course = await Course.findById(discussion.course);

    if (!course) {
        throw new Error("Course not found");
    }

    if (role === "student") {

        const enrollment = await Enrollment.findOne({
            student: userId,
            course: discussion.course,
        });

        if (!enrollment) {
            throw new Error("Not enrolled");
        }

    } else if (role === "instructor") {

        if (course.instructor.toString() !== userId) {
            throw new Error("Unauthorized");
        }

    }

    discussion.replies.push({
        user: userId,
        message,
    });

    await discussion.save();

    return await Discussion.findById(discussionId)
        .populate("author", "name email")
        .populate("replies.user", "name email");

};

const updateDiscussion = async (
    discussionId,
    userId,
    discussionData
) => {

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    if (discussion.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    discussion.title = discussionData.title || discussion.title;
    discussion.content = discussionData.content || discussion.content;

    await discussion.save();

    return await Discussion.findById(discussionId)
        .populate("author", "name email")
        .populate("replies.user", "name email");
};

const deleteDiscussion = async (
    discussionId,
    userId
) => {

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    if (discussion.author.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    await Discussion.findByIdAndDelete(discussionId);

    return;
};

module.exports = {
    createDiscussion,
    getDiscussionsByCourse,
    replyToDiscussion,
    updateDiscussion,
    deleteDiscussion,
};