import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async (e) => {

        e.preventDefault();

        try {
            setError("");
            setLoading(true);

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

            navigate("/ai-tutor");

        } catch (err) {

            setError(
                err.message || "Unable to login"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <Link
                    to="/"
                    className="auth-logo"
                >
                    <span>✦</span>
                    VertexPortal
                </Link>

                <div className="auth-heading">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to continue learning.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={login}>

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Log in →"}
                    </button>

                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Sign up
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Login;