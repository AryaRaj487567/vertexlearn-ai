const { askAI } = require("../../services/ai.service");


const chat = async (req, res) => {

    try {

        const { question, top_k } = req.body;

        const userId = req.user.id;
        console.log("Authenticated user ID:", userId);

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


module.exports = {
    chat,
};