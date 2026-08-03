const {
    createDiscussion,
    getDiscussionsByCourse,
    replyToDiscussion,
} = require("./discussion.service");

const create = async (req, res) => {

    try {
        const discussion =
            await createDiscussion(
                req.params.courseId,
                req.user.id,
                req.user.role,
                req.body
            );
        res.status(201).json({
            success: true,
            message: "Discussion created successfully",
            data: discussion,
        });

    } catch (error) {
        if (
            [
                "Course not found",
                "Not enrolled",
                "Unauthorized",
            ].includes(error.message)
        ) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getByCourse = async (req, res) => {

    try {
        const discussions =
            await getDiscussionsByCourse(
                req.params.courseId,
                req.user.id,
                req.user.role
            );
        res.status(200).json({
            success: true,
            count: discussions.length,
            data: discussions,
        });
    } catch (error) {

        if (
            [
                "Course not found",
                "Not enrolled",
                "Unauthorized",
            ].includes(error.message)
        ) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const reply = async (req, res) => {

    try {
        const discussion =
            await replyToDiscussion(
                req.params.discussionId,
                req.user.id,
                req.user.role,
                req.body.message
            );
        res.status(200).json({
            success: true,
            message: "Reply added successfully",
            data: discussion,
        });

    } catch (error) {
        if (
            [
                "Discussion not found",
                "Course not found",
                "Not enrolled",
                "Unauthorized",
            ].includes(error.message)
        ) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getByCourse,
    reply,
};