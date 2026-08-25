const mongoose = require("mongoose");
const { askAI } = require("../../services/ai.service");
const Chat = require("./chat.model");
//const Enrollment = require("../enrollments/enrollment.model");
const Course = require("../courses/course.model");

const chat = async (req, res) => {
    console.log("========== AI REQUEST ==========");
    console.log("BODY:", req.body);
    console.log("course_id:", req.body.course_id);
    console.log("lecture_id:", req.body.lecture_id);
    console.log(
        "lecture_id length:",
        req.body.lecture_id?.length
    );
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

        const course = await Course.findById(course_id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
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

        const { course_id, lecture_id } = req.query;

        const filter = {
            user: userId,
        };

        if (course_id) {
            filter.course = course_id;
        }

        if (lecture_id) {
            filter.lecture = lecture_id;
        }

        const history = await Chat.find(filter)
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            history,
        });
    } catch (error) {
        console.error("AI HISTORY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Unable to fetch AI conversation history.",
        });
    }
};

const clearHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const { course_id, lecture_id } = req.query;

        if (!course_id || !lecture_id) {
            return res.status(400).json({
                success: false,
                message: "course_id and lecture_id are required.",
            });
        }

        const result = await Chat.deleteMany({
            user: userId,
            course: course_id,
            lecture: lecture_id,
        });

        res.status(200).json({
            success: true,
            message: "Conversation history cleared successfully.",
            deletedCount: result.deletedCount,
        });

    } catch (error) {
        console.error("CLEAR HISTORY ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Unable to clear conversation history.",
        });
    }
};


module.exports = {
    chat,
    getChatHistory,
    clearHistory,
};