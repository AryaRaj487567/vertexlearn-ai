import React, { useState } from "react";
import "./landingpage.css";

const LandingPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [darkMode, setDarkMode] = useState(true);

    const steps = [
    {
        title: "Express Routes & Middleware",
        progress: 45,
    },
    {
        title: "JWT Authentication Flow",
        progress: 65,
    },
    {
        title: "AI Tutor Context & RAG Search",
        progress: 85,
    },
    ];

const progress = steps[activeStep].progress;
    return (
        <div className={`landing-page ${darkMode ? "dark" : "light"}`}>

            {/* ================= NAVBAR ================= */}
            <header className="landing-navbar">

                <div className="landing-container navbar-inner">

                    {/* Logo */}
                    <div className="brand">
                        <div className="brand-icon">
                            ✦
                        </div>

                        <span className="brand-text">
                            Vertex<span>Portal</span>
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="navbar-links">

                        <a href="/courses">
                            ◉&nbsp; Courses
                        </a>

                        <a href="/playground">
                            &lt;/&gt;&nbsp; Playground
                        </a>

                        <button
                            className={`theme-switch ${darkMode ? "dark" : "light"}`}
                            onClick={() => setDarkMode(prev => !prev)}
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            <span className="theme-switch-track">
                                <span className="theme-icon sun">☀</span>
                                <span className="theme-icon moon">☾</span>

                                <span className="theme-switch-thumb">
                                    {darkMode ? "☾" : "☀"}
                                </span>
                            </span>
                        </button>

                        <a href="/login" className="login-link">
                            Log in
                        </a>

                        <a href="/signup" className="signup-button">
                            Sign up
                        </a>

                    </nav>

                </div>

            </header>


            {/* ================= HERO ================= */}
            <main>

                <section className="hero-section">

                    <div className="landing-container hero-grid">

                        {/* LEFT SIDE */}
                        <div className="hero-content">

                            <div className="trusted-badge">
                                <span>♨</span>
                                Trusted by 50,000+ Students &amp; Professionals
                            </div>

                            <h1>
                                The Smarter Way to
                                <br />
                                <span>Learn Skills</span> Online
                            </h1>

                            <p className="hero-description">
                                VertexPortal combines HD courses, an AI study
                                tutor, live interactive classes, peer
                                discussions, quizzes, and verified certificates
                                in one beautifully designed LMS.
                            </p>

                            <div className="hero-actions">

                                <a
                                    href="/courses"
                                    className="primary-button"
                                >
                                    Explore Courses
                                    <span>→</span>
                                </a>

                                <a
                                    href="/ai-tutor"
                                    className="secondary-button"
                                >
                                    ✧
                                    <span>Try AI Tutor</span>
                                </a>

                            </div>


                            {/* Social proof */}
                            <div className="hero-proof">

                                <div className="avatar-stack">
                                    <div className="avatar avatar-1">PS</div>
                                    <div className="avatar avatar-2">AM</div>
                                    <div className="avatar avatar-3">NK</div>
                                    <div className="avatar avatar-4">SR</div>
                                    <div className="avatar avatar-5">RK</div>
                                </div>

                                <div className="rating">

                                    <div className="stars">
                                        ☆ ☆ ☆ ☆ ☆
                                    </div>

                                    <div>
                                        Rated <strong>4.8/5</strong> by
                                        10,000+ learners
                                    </div>

                                </div>

                                <div className="free-plan">
                                    <span>✓</span>
                                    Free plan, no credit card needed
                                </div>

                            </div>

                        </div>


                        {/* RIGHT SIDE — LMS PREVIEW */}
                        <div className="hero-preview-wrapper">

                            {/* Certificate notification */}
                            <div className="certificate-popup">

                                <div className="certificate-icon">
                                    🏆
                                </div>

                                <div>
                                    <strong>Certificate Earned!</strong>
                                    <span>
                                        React Developer — Advanced
                                    </span>
                                </div>

                            </div>


                            {/* Main preview */}
                            <div className="hero-preview">

                                <div className="preview-domain">
                                    vertexportal.app
                                </div>

                                <div className="now-playing">

                                    <div className="playing-header">

                                        <div className="play-icon">
                                            ▶
                                        </div>

                                        <div>
                                            <small>Now Playing</small>

                                            <strong>
                                                Fullstack Development 2026
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="progress-info">

                                        <span>
                                            Lecture 8 of 12
                                        </span>

                                        <strong>
                                            {progress}% complete
                                        </strong>

                                    </div>

                                    <div className="progress-bar">
                                        <div
                                            className="progress-value"
                                            style={{ width: `${progress}%` }}
                                            ></div>
                                    </div>

                                </div>


                                {/* Course checklist */}
                                <div className="preview-list">

                                    {steps.map((step, index) => (
                                        <button
                                        key={step.title}
                                        className={`learning-step ${
                                            activeStep === index ? "active" : ""
                                        }`}
                                        onClick={() => setActiveStep(index)}
                                        >
                                        <span className="step-circle">
                                            {activeStep === index ? "✓" : "○"}
                                        </span>

                                        <span className="step-title">
                                            {step.title}
                                        </span>

                                        {activeStep === index && (
                                            <span className="active-badge">
                                            Active
                                            </span>
                                        )}
                                        </button>
                                    ))}

                                </div>


                                {/* AI Tutor card */}
                                <div className="preview-ai-card">

                                    <div className="ai-icon">
                                        ✦
                                    </div>

                                    <div>
                                        <strong>AI Tutor</strong>

                                        <p>
                                            JWT tokens encode user data into a
                                            signed string. The server verifies
                                            the signature on every request...
                                        </p>
                                    </div>

                                </div>

                            </div>


                            {/* AI Tutor floating notification */}
                            <div className="ai-active-popup">

                                <div className="ai-active-icon">
                                    ✦
                                </div>

                                <div>
                                    <strong>AI Tutor Active</strong>
                                    <span>
                                        Ready to answer your questions
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default LandingPage;