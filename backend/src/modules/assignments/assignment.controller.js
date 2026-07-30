const {
    createAssignment,
    getAssignmentsByCourse,
    submitAssignment,
    getAssignmentSubmissions,
    gradeSubmission,
} = require("./assignment.service");

const create = async (req, res) => {

    try {
        const assignment = await createAssignment(
            req.params.courseId,
            req.user.id,
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            data: assignment,
        });

    } catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }
        if (error.message === "Unauthorized") {
            return res.status(403).json({
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
        const assignments = await getAssignmentsByCourse(
            req.params.courseId
        );
        res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments,
        });

    } catch (error) {
        if (error.message === "Course not found") {
            return res.status(404).json({
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

const submit = async (req, res) => {

    try {
        const submission = await submitAssignment(
            req.params.assignmentId,
            req.user.id,
            req.body
        );
        res.status(201).json({
            success: true,
            message: "Assignment submitted successfully",
            data: submission,
        });

    } catch (error) {

        if (
            error.message === "Assignment not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error.message === "Not enrolled"
        ) {
            return res.status(403).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error.message === "Assignment already submitted"
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

const getSubmissions = async (req, res) => {

    try {
        const submissions =
            await getAssignmentSubmissions(
                req.params.assignmentId,
                req.user.id
            );

        res.status(200).json({
            success: true,
            count: submissions.length,
            data: submissions,
        });

    } catch (error) {

        if (
            error.message === "Assignment not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error.message === "Course not found"
        ) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (
            error.message === "Unauthorized"
        ) {
            return res.status(403).json({
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

const grade = async (req, res) => {

    try {
        const submission = await gradeSubmission(
            req.params.submissionId,
            req.user.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Submission graded successfully",
            data: submission,
        });

    } catch (error) {
        if (error.message === "Submission not found") {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message === "Unauthorized") {
            return res.status(403).json({
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
    submit,
    getSubmissions,
    grade,
};