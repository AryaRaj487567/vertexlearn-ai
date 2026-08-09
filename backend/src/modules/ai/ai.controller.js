const { askAI } = require("../../services/ai.service");


const chat = async (req, res) => {

    try {

        const { question, top_k } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const result = await askAI(
            question,
            top_k || 3
        );

        res.status(200).json(result);

    } catch (error) {

        console.error(
            "AI Controller Error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "AI service request failed",
            error: error.message,
        });

    }

};


module.exports = {
    chat,
};