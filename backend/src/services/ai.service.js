const AI_SERVICE_URL = process.env.AI_SERVICE_URL;

const askAI = async (
    question,
    top_k = 3,
    userId,
    courseId,
    lectureId
) => {

    if (!AI_SERVICE_URL) {
        throw new Error("AI_SERVICE_URL is not configured");
    }

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
                course_id: courseId,
                lecture_id: lectureId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.detail || "AI service request failed"
        );
    }

    return data;
};

module.exports = {
    askAI,
};