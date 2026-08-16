import { useState } from "react";

function AITutor({ courseId, lectureId }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const askQuestion = async () => {
        console.log("courseId:", courseId);
        console.log("lectureId:", lectureId);
        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }

        setLoading(true);
        setError("");
        setAnswer("");
        setSources([]);

        try {
            // Get JWT token saved after login
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("Please login first.");
            }

            const response = await fetch(
                "http://localhost:5000/api/v1/ai/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        question: question.trim(),
                        top_k: 3,
                        course_id: courseId,
                        lecture_id: lectureId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "Failed to get AI response"
                );
            }

            setAnswer(data.answer || "");
            setSources(data.sources || []);

        } catch (err) {
            console.error("AI Tutor Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ai-tutor">
            <h2>AI Tutor</h2>

            <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about this lecture..."
                rows={4}
            />

            <button
                onClick={askQuestion}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {error && (
                <p className="ai-error">
                    {error}
                </p>
            )}

            {answer && (
                <div className="ai-answer">
                    <h3>Answer</h3>
                    <p>{answer}</p>
                </div>
            )}

            {sources.length > 0 && (
                <div className="ai-sources">
                    <h3>Sources</h3>

                    {sources.map((source, index) => (
                        <div
                            key={index}
                            className="ai-source"
                        >
                            <p>{source.chunk}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AITutor;