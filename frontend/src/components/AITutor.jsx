import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "./AITutor.css";

const API_URL = import.meta.env.VITE_API_URL;

function AITutor({ courseId, lectureId }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [sources, setSources] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showClearModal, setShowClearModal] = useState(false);
    const [error, setError] = useState("");
    const tutorRef = useRef(null);

    useEffect(() => {
    const fetchHistory = async () => {
        if (!courseId || !lectureId) return;

        setHistoryLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/v1/ai/history?course_id=${courseId}&lecture_id=${lectureId}`,
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
            `${API_URL}/api/v1/ai/history?course_id=${courseId}&lecture_id=${lectureId}`,
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
            `${import.meta.env.VITE_API_URL}/api/v1/ai/chat`,
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

    const handleClearHistory = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to clear your conversation history?"
    );

    if (!confirmed) return;

    try {
        const token = localStorage.getItem("token");

        const response = await fetch(
            `${API_URL}/api/v1/ai/history?course_id=${courseId}&lecture_id=${lectureId}`,
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
                data.message || "Failed to clear history"
            );
        }

        // Clear history from UI
        setHistory([]);

        // Clear current AI response
        setQuestion("");
        setAnswer("");
        setSources([]);

        // Clear any previous error
        setError("");

        console.log(
            "History cleared:",
            data.deletedCount
        );

    } catch (err) {
        console.error("Clear history error:", err);

        setError(
            err.message || "Failed to clear conversation history"
        );
    }
};

    const handleNewConversation = () => {
    setQuestion("");
    setAnswer("");
    setSources([]);
    setError("");

    tutorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

    return (
        <section className="ai-tutor-wrapper" ref={tutorRef}>

            {/* Header */}
            <div className="tutor-header">

                <div className="tutor-title">
                    <div className="tutor-icon">
                        ✦
                    </div>

                    <div>
                        <span className="tutor-eyebrow">
                            VERTEXLEARN AI
                        </span>

                        <h1>AI Tutor</h1>

                        <p>
                            Your intelligent learning companion for understanding course material.
                        </p>
                    </div>
                </div>

                <button
                    className="new-conversation-top"
                    onClick={handleNewConversation}
                >
                    + New Conversation
                </button>

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

            {/* AI Loading State */}
                {loading && (
                    <div className="answer-section loading-section">

                        <div className="section-heading">
                            <div className="heading-icon loading-icon">
                                ✦
                            </div>

                            <div>
                                <span>VERTEXLEARN AI</span>
                                <h2>Thinking...</h2>
                            </div>
                        </div>

                        <div className="loading-card">

                            <div className="loading-orb">
                                ✦
                            </div>

                            <div className="loading-content">
                                <h3>Thinking about your question...</h3>

                                <p>
                                    Searching the course material and preparing an answer.
                                </p>

                                <div className="loading-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>

                        </div>

                    </div>
                )}

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

           const preview = cleanChunk
                ?.replace(/^\s*\d+\.\s*/, "")
                ?.replace(/\s+/g, " ")
                ?.trim();

            let previewText = preview;

            if (previewText?.length > 260) {
                previewText = previewText.substring(0, 260);

                const lastSpace = previewText.lastIndexOf(" ");

                if (lastSpace > 180) {
                    previewText = previewText.substring(0, lastSpace);
                }

                previewText += "...";
            }

            /*
             * Try to find a meaningful title from the
             * beginning of the retrieved chunk.
             */
            const lines = cleanChunk
                ?.split("\n")
                .map(line => line.trim())
                .filter(Boolean);

            let sourceTitle = "Lecture Material";

                if (/common use cases/i.test(cleanChunk)) {
                    sourceTitle = "Common Use Cases";
                }
                else if (
                    /V8 engine|event-driven|non-blocking I\/O|event loop/i.test(cleanChunk)
                ) {
                    sourceTitle = "Node.js Runtime";
                }
                else if (
                    /what is node\.?js|JavaScript runtime environment/i.test(cleanChunk)
                ) {
                    sourceTitle = "Introduction to Node.js";
                }
                else if (/react/i.test(cleanChunk)) {
                    sourceTitle = "React.js Lecture";
                }
                else if (/express/i.test(cleanChunk)) {
                    sourceTitle = "Express.js Lecture";
                }
                else if (/mongodb/i.test(cleanChunk)) {
                    sourceTitle = "MongoDB Lecture";
                }
                else if (lines?.length) {
                    const firstLine = lines[0];

                    sourceTitle =
                        firstLine.length > 60
                            ? firstLine.substring(0, 60) + "..."
                            : firstLine;
                }

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
                            {sourceTitle}
                        </h3>

                        <p>
                            {previewText}
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

                        <div className="history-title-row">

                            <div>
                                <span>PREVIOUS CONVERSATIONS</span>
                                <h2>Conversation History</h2>
                            </div>

                            <div className="history-actions">

                                <span className="history-count">
                                    {history.length}{" "}
                                    {history.length === 1
                                        ? "conversation"
                                        : "conversations"}
                                </span>

                                <button
                                    className="new-conversation-button"
                                    onClick={handleNewConversation}
                                >
                                    + New Conversation
                                </button>

                                <button
                                    className="clear-history-button"
                                    onClick={() => setShowClearModal(true)}
                                    disabled={
                                        historyLoading ||
                                        history.length === 0
                                    }
                                >
                                    Clear History
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="history-list">

                    {history.map((chat, index) => {

                        const openConversation = () => {
                            setQuestion(chat.question || "");
                            setAnswer(chat.answer || "");
                            setSources(chat.sources || []);
                            setError("");

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            });
                        };

                        const answerPreview =
                            chat.answer?.length > 180
                                ? `${chat.answer.substring(0, 180)}...`
                                : chat.answer || "";

                        return (
                            <div
                                className="history-card"
                                key={chat._id || index}
                            >

                                <div className="history-card-top">

                                    <span className="history-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="history-date">
                                        {chat.createdAt
                                        ? new Date(chat.createdAt).toLocaleString([], {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })
                                        : ""}
                                    </span>

                                </div>

                                {/* User Question */}
                                <div className="history-question">

                                    <span className="history-label">
                                        YOU
                                    </span>

                                    <p>
                                        {chat.question}
                                    </p>

                                </div>

                                {/* AI Preview */}
                                <div className="history-preview">

                                    <span className="history-label">
                                        AI TUTOR
                                    </span>

                                    <div className="history-preview-text">
                                        <ReactMarkdown>
                                            {answerPreview}
                                        </ReactMarkdown>
                                    </div>

                                </div>

                                {/* Open conversation */}
                                <button
                                    type="button"
                                    className="history-open"
                                    onClick={openConversation}
                                >
                                    View conversation
                                    <span>→</span>
                                </button>

                            </div>
                        );
                    })}

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
                                onClick={() => {
                                    setQuestion("Explain this lecture in simple terms.");

                                    tutorRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                                }}
                            >
                                Explain this lecture
                            </button>

                            <button
                                onClick={() => {
                                    setQuestion("Summarize this lecture.");

                                    tutorRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                                }}
                            >
                                Summarize this lecture
                            </button>

                            <button
                                onClick={() => {
                                    setQuestion(
                                        "What are the most important questions from this lecture?"
                                    );

                                    tutorRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                                }}
                            >
                                Important questions
                            </button>

                        </div>

                    </div>
            )}

            {showClearModal && (
                    <div
                        className="clear-modal-overlay"
                        onClick={() => setShowClearModal(false)}
                    >
                        <div
                            className="clear-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="clear-modal-icon">
                                !
                            </div>

                            <div className="clear-modal-content">
                                <h3>Clear conversation history?</h3>

                                <p>
                                    This will permanently remove all previous conversations
                                    from this lecture. This action cannot be undone.
                                </p>
                            </div>

                            <div className="clear-modal-actions">

                                <button
                                    className="modal-cancel-button"
                                    onClick={() => setShowClearModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="modal-confirm-button"
                                    onClick={async () => {
                                        await clearHistory();
                                        setShowClearModal(false);
                                    }}
                                >
                                    Clear History
                                </button>

                            </div>
                        </div>
                    </div>
                )}

        </section>

    );
}

export default AITutor;