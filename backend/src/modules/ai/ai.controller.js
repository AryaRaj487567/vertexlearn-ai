const { askAI } = require("../../services/ai.service");
const Chat = require("./chat.model");
const Enrollment = require("../enrollments/enrollment.model");
const Course = require("../courses/course.model");

const chat = async (req, res) => {

    try {
        const {
        question,
        top_k,
        course_id,
        lecture_id,
    } = req.body;

    const userId = req.user.id;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }

        if (!lecture_id) {
            return res.status(400).json({
                success: false,
                message: "Lecture ID is required",
            });
        }

        const enrollment = await Enrollment.findOne({
            student: userId,
            course: course_id,
        });

        const course = await Course.findById(course_id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        const isInstructor =
            course.instructor.toString() === userId.toString();

        const isAdmin = req.user.role === "admin";

        if (!enrollment && !isInstructor && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course",
            });
        }

        const result = await askAI(
            question,
            top_k || 3,
            userId,
            course_id,
            lecture_id
        );

        const savedChat = await Chat.create({
            user: userId,
            course: course_id,
            lecture: lecture_id,
            question: question,
            answer: result.answer,
            sources: result.sources || [],
        });

        res.status(200).json(result);

    } catch (error) {
    console.error("========== AI CONTROLLER ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Response Data:", error.response?.data);
    console.error("Full Error:", error);
    console.error("==========================================");

    return res.status(500).json({
        success: false,
        message: "AI service request failed",
        error: error.response?.data || error.message
    });
}

};

const getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                parseInt(req.query.limit) || 10,
                1
            ),
            50
        );

        const skip = (page - 1) * limit;

        const [chats, total] = await Promise.all([
            Chat.find({ user: userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            Chat.countDocuments({
                user: userId,
            }),
        ]);

        return res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            count: chats.length,
            chats,
        });

    } catch (error) {
        console.error(
            "Get Chat History Error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch chat history",
        });
    }
};


module.exports = {
    chat,
    getChatHistory,
};