import { useState } from "react";
import "./App.css";
import AITutor from "./components/AITutor";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [error, setError] = useState("");

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

    return (
        <div className="app">

            {/* Header */}
            <header className="app-header">
                <h1>VertexLearn</h1>

                <p>
                    AI-Powered Learning Platform
                </p>
            </header>


            {/* Login */}
            {!token ? (

                <div className="login-container">

                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button onClick={login}>
                        Login
                    </button>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                </div>

            ) : (

                /* AI Tutor */
                <AITutor
                    courseId="6a677a2cbf246ea0b506a8bb"
                    lectureId="6a69a72039babcbd81eccf7c"
                />

            )}

        </div>
    );
}

export default App;
