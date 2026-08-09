const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

const askAI = async (question, top_k = 3, userId) => {

    if (!AI_SERVICE_URL) {
        throw new Error("AI_SERVICE_URL is not configured");
    }

    try {
        const response = await fetch(
            `${AI_SERVICE_URL}/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                    top_k,
                    user_id: userId,
                }),
            }
        );

        const data = await response.json();

        console.log("AI Service Status:", response.status);
        console.log(
            "AI Service Response:",
            JSON.stringify(data, null, 2)
        );

        if (!response.ok) {
            throw new Error(
                typeof data.detail === "string"
                    ? data.detail
                    : JSON.stringify(data.detail || data)
            );
        }

        return data;

    } catch (error) {

        console.error("========== AI SERVICE ERROR ==========");
        console.error("Message:", error.message);
        console.error("======================================");

        throw error;
    }
};

module.exports = {
    askAI,
};