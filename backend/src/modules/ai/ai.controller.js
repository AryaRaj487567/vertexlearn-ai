const { askAI } = require("../../services/ai.service");
const Chat = require("./chat.model");

const chat = async (req, res) => {

    try {
        const { question, top_k } = req.body;

        const userId = req.user.id;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const result = await askAI(
            question,
            top_k || 3,
            userId,
        );

        const savedChat = await Chat.create({
            user: userId,
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