import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = async (e) => {

        e.preventDefault();

        try {

            setError("");
            setLoading(true);

            const response = await fetch(
                "http://localhost:5000/api/v1/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }

            navigate("/login");

        } catch (err) {

            setError(
                err.message || "Unable to create account"
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
                        Create Your Account
                    </h1>

                    <p>
                        Start your learning journey today.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={signup}>

                    <label>
                        Name
                    </label>

                    <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

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
                        placeholder="Create a password"
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
                            ? "Creating account..."
                            : "Create Account →"}
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Log in
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Signup;