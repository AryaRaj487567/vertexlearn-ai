import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./AITutor.css";

function AITutor({ courseId, lectureId }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const tutorRef = useRef(null);

    useEffect(() => {
    const fetchHistory = async () => {
        if (!courseId || !lectureId) return;

        setHistoryLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5000/api/v1/ai/history?course_id=${courseId}&lecture_id=${lectureId}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to load AI history."
                );
            }

            setHistory(data.history || []);
        } catch (err) {
            console.error("AI History Error:", err);
        } finally {
            setHistoryLoading(false);
        }
    };

    fetchHistory();
}, [courseId, lectureId]);

    const clearHistory = async () => {
    if (!courseId || !lectureId || history.length === 0) {
        return;
    }

    const confirmed = window.confirm(
        "Are you sure you want to clear your AI conversation history for this lecture?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/v1/ai/history?course_id=${courseId}&lecture_id=${lectureId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to clear conversation history."
            );
        }

        setHistory([]);
        setAnswer("");
        setSources([]);

    } catch (err) {
        console.error("Clear History Error:", err);

        setError(
            err.message || "Unable to clear conversation history."
        );
    }
};

    const askQuestion = async () => {
    if (!question.trim()) {
        setError("Please enter a question first.");
        return;
    }

    setLoading(true);
    setError("");

    try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            throw new Error("Please login first.");
        }

        const response = await fetch(
            "http://127.0.0.1:5000/api/v1/ai/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`,
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

        console.log("AI response:", data);

        if (!response.ok) {
            throw new Error(
                data.message ||
                data.error ||
                "Unable to get AI response."
            );
        }

        setAnswer(data.answer || "");
        setSources(data.sources || []);

        setHistory((prev) => [
    {
        _id: Date.now().toString(),
        question: question.trim(),
        answer: data.answer || "",
        sources: data.sources || [],
        createdAt: new Date().toISOString(),
    },
    ...prev,
]);

    } catch (err) {
        console.error("AI Tutor Error:", err);
        setError(err.message || "AI service request failed.");
    } finally {
        setLoading(false);
    }
};

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.ctrlKey) {
            askQuestion();
        }
    };

    return (
        <section className="ai-tutor-wrapper" ref={tutorRef}>

            {/* Header */}
            <div className="ai-header">
                <div className="ai-icon">
                    ✦
                </div>

                <div>
                    <span className="ai-label">
                        VERTEXLEARN AI
                    </span>

                    <h1>AI Tutor</h1>

                    <p>
                        Your intelligent learning companion for
                        understanding course material.
                    </p>
                </div>
            </div>

            {/* Question Box */}
            <div className="question-card">

                <div className="question-top">
                    <span>Ask your question</span>

                    <span className="shortcut">
                        Ctrl + Enter
                    </span>
                </div>

                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about this lecture..."
                    maxLength={500}
                />

                <div className="question-bottom">

                    <span className="character-count">
                        {question.length}/500
                    </span>

                    <button
                        className="ask-button"
                        onClick={askQuestion}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Thinking...
                            </>
                        ) : (
                            <>
                                Ask AI
                                <span className="arrow">→</span>
                            </>
                        )}
                    </button>

                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="ai-error">
                    <span>!</span>
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="loading-card">

                    <div className="loading-icon">
                        ✦
                    </div>

                    <div>
                        <strong>AI is thinking...</strong>
                        <p>
                            Searching your course material for the
                            best answer.
                        </p>
                    </div>

                    <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                </div>
            )}

            {/* Answer */}
            {answer && !loading && (
                <div className="answer-section">

                    <div className="section-heading">
                        <div className="heading-icon">
                            ✦
                        </div>

                        <div>
                            <span>AI RESPONSE</span>
                            <h2>Answer</h2>
                        </div>
                    </div>

                    <div className="answer-card">

                        <div className="answer-glow"></div>

                        <ReactMarkdown>
                            {answer}
                        </ReactMarkdown>

                    </div>
                </div>
            )}

            {/* Sources */}
            {sources.length > 0 && !loading && (
                <div className="sources-section">

                    <div className="section-heading">
                        <div className="heading-icon source-icon">
                            ◈
                        </div>

                        <div>
                            <span>KNOWLEDGE CONTEXT</span>
                            <h2>Sources</h2>
                        </div>
                    </div>

                    <div className="sources-grid">

                        {sources.map((source, index) => {

                    const cleanChunk = source.chunk
                        ?.replace(/\+?\d[\d\s-]{8,}\d/g, "[contact information]")
                        .replace(
                            /[\w.-]+@[\w.-]+\.\w+/g,
                            "[email]"
                        )
                        .replace(
                            /(https?:\/\/|www\.)\S+/gi,
                            "[link]"
                        );

                    const preview =
                        cleanChunk?.length > 260
                            ? cleanChunk.substring(0, 260) + "..."
                            : cleanChunk;

                    return (
                        <div
                            className="source-card"
                            key={index}
                        >

                            <div className="source-top">

                                <div className="source-number">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                <span className="source-badge">
                                    COURSE MATERIAL
                                </span>

                            </div>

                            <div className="source-content">

                                <h3>
                                    {index === 0
                                        ? "Professional Profile"
                                        : index === 1
                                        ? "Technical Skills"
                                        : "Learning & Experience"}
                                </h3>

                                <p>
                                    {preview}
                                </p>

                            </div>

                            <div className="source-footer">
                                <span>
                                    VertexLearn Knowledge Base
                                </span>

                                <span className="source-arrow">
                                    ↗
                                </span>
                            </div>

                        </div>
                    );
                })}

                    </div>
                </div>
            )}

            {/* Conversation History */}
            {history.length > 0 && !historyLoading && (
                <div className="history-section">

                    <div className="section-heading">
                        <div className="heading-icon">
                            ◷
                        </div>

                        <div>
                            <span>PREVIOUS CONVERSATIONS</span>
                            <div className="history-title-row">
                        <div>
                            <span>PREVIOUS CONVERSATIONS</span>
                            <h2>Conversation History</h2>
                        </div>

                        <div className="history-actions">

                        <span className="history-count">
                            {history.length}{" "}
                            {history.length === 1 ? "conversation" : "conversations"}
                        </span>

                        <button
                            className="clear-history-button"
                            onClick={clearHistory}
                            disabled={history.length === 0}
                        >
                            Clear History
                        </button>

                    </div>
                    </div>
                        </div>
                    </div>

                    <div className="history-list">

                        {history.map((chat, index) => (
                        <div
                            className="history-card"
                            key={chat._id || index}
                            onClick={() => {
                            setQuestion(chat.question || "");
                            setAnswer(chat.answer || "");
                            setSources(chat.sources || []);

                            tutorRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                       }}
                        >
                        <div className="history-card-top">

                            <span className="history-number">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span className="history-date">
                                {chat.createdAt
                                    ? new Date(chat.createdAt).toLocaleString()
                                    : ""}
                            </span>

                        </div>

                        <div className="history-question">
                            <span className="history-label">
                                YOU
                            </span>

                            <p>{chat.question}</p>
                        </div>

                        <div className="history-preview">
                            <span className="history-label">
                                AI TUTOR
                            </span>

                            <p>
                                {chat.answer?.length > 180
                                    ? `${chat.answer.substring(0, 180)}...`
                                    : chat.answer}
                            </p>
                        </div>

                        <div className="history-open">
                            View conversation →
                        </div>
                    </div>
                ))}

                </div>

            </div>
        )}

            {/* Empty State */}
            {!answer && !loading && !error && history.length === 0 && (
                <div className="ai-empty">

                    <div className="empty-orb">
                        ✦
                    </div>

                    <h3>What would you like to learn?</h3>

                    <p>
                        Ask a question about the current lecture
                        and let VertexLearn AI help you understand it.
                    </p>

                    <div className="suggestions">

                        <button
                            onClick={() =>
                                setQuestion(
                                    "Explain the main concepts of this lecture."
                                )
                            }
                        >
                            Explain this lecture
                        </button>

                        <button
                            onClick={() =>
                                setQuestion(
                                    "Give me a simple summary of this lecture."
                                )
                            }
                        >
                            Summarize this lecture
                        </button>

                        <button
                            onClick={() =>
                                setQuestion(
                                    "Give me some important questions from this lecture."
                                )
                            }
                        >
                            Important questions
                        </button>

                    </div>

                </div>
            )}

        </section>
    );
}

export default AITutor;