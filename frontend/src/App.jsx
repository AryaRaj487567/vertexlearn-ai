import { useState } from "react";
import "./App.css";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [question, setQuestion] = useState(
        "What programming languages and technologies does Arya know?"
    );

    const [answer, setAnswer] = useState("");
    const [error, setError] = useState("");

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const login = async () => {
        try {
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/v1/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            const accessToken = data.data.token;

            localStorage.setItem(
                "token",
                accessToken
            );

            setToken(accessToken);

            console.log("Login successful");
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const askAI = async () => {
        try {
            setError("");
            setAnswer("");

            const storedToken =
                localStorage.getItem("token");

            if (!storedToken) {
                throw new Error(
                    "Please login first"
                );
            }

            const response = await fetch(
                "http://localhost:5000/api/v1/ai/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`,
                    },

                    body: JSON.stringify({
                        question,
                        top_k: 3,
                        course_id:
                            "6a677a2cbf246ea0b506a8bb",
                        lecture_id:
                            "6a69a72039babcbd81eccf7c",
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    data.error ||
                    "AI request failed"
                );
            }

            setAnswer(data.answer);
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    return (
        <div style={{ padding: "40px" }}>
            <h1>VertexLearn</h1>

            <p>AI-Powered Learning Platform</p>

            {!token ? (
                <div>
                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <button onClick={login}>
                        Login
                    </button>
                </div>
            ) : (
                <div>
                    <h2>AI Tutor</h2>

                    <textarea
                        rows="5"
                        cols="50"
                        value={question}
                        onChange={(e) =>
                            setQuestion(e.target.value)
                        }
                    />

                    <br />
                    <br />

                    <button onClick={askAI}>
                        Ask AI
                    </button>

                    {answer && (
                        <div>
                            <h3>Answer</h3>
                            <p>{answer}</p>
                        </div>
                    )}
                </div>
            )}

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default App;
