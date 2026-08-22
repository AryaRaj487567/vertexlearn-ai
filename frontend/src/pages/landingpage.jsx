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

            
                                {/* ================= PLATFORM CAPABILITIES ================= */}

<section className="capabilities-section">

    <div className="landing-container">

        <div className="section-heading">

            <span className="section-label">
                ✨ PLATFORM CAPABILITIES
            </span>

            <h2>
                Everything a Modern Learner Needs
            </h2>

            <p>
                Built with AI at the core and designed around how people
                actually learn best.
            </p>

        </div>


        <div className="capabilities-grid">

            <article className="capability-card">
                <div className="capability-icon">🧠</div>

                <span className="capability-tag">
                    AI-POWERED
                </span>

                <h3>AI Tutor Assistant</h3>

                <p>
                    Powered by Mistral LLM with RAG — answers any
                    question from within your course context, 24/7.
                </p>

                <a href="/ai-tutor">
                    Learn more →
                </a>
            </article>


            <article className="capability-card">
                <div className="capability-icon">▣</div>

                <span className="capability-tag">
                    LIVE WEBRTC
                </span>

                <h3>Live Interactive Classes</h3>

                <p>
                    Real-time WebRTC video sessions with instructors —
                    join from anywhere with a single click.
                </p>

                <a href="#">
                    Learn more →
                </a>
            </article>


            <article className="capability-card">
                <div className="capability-icon">▢</div>

                <span className="capability-tag">
                    COLLABORATIVE
                </span>

                <h3>Community Discussions</h3>

                <p>
                    Threaded Q&A, peer collaboration, and instructor
                    responses all in one organized space.
                </p>

                <a href="#">
                    Learn more →
                </a>
            </article>


            <article className="capability-card">
                <div className="capability-icon">♙</div>

                <span className="capability-tag">
                    VERIFIED
                </span>

                <h3>Verified Certificates</h3>

                <p>
                    Earn industry-recognized digital certificates
                    automatically upon completing any course.
                </p>

                <a href="#">
                    Learn more →
                </a>
            </article>


            <article className="capability-card">
                <div className="capability-icon">ϟ</div>

                <span className="capability-tag">
                    AUTO-GRADED
                </span>

                <h3>Quizzes & Assessments</h3>

                <p>
                    Auto-graded quizzes, structured assignments, and
                    real-time progress dashboards built in.
                </p>

                <a href="#">
                    Learn more →
                </a>
            </article>


            <article className="capability-card">
                <div className="capability-icon">☷</div>

                <span className="capability-tag">
                    REAL-TIME
                </span>

                <h3>Learning Analytics</h3>

                <p>
                    Track completion rates, time spent, attendance
                    records, and performance in real-time.
                </p>

                <a href="#">
                    Learn more →
                </a>
            </article>

        </div>

    </div>

</section>

         {/* ================= HOW IT WORKS ================= */}

<section className="how-it-works-section">

    <div className="landing-container">

        <div className="how-it-works-heading">

            <span className="section-label">
                ◷ HOW IT WORKS
            </span>

            <h2>
                Go from Zero to Certified in 4 Steps
            </h2>

            <p>
                Our streamlined process gets you learning in minutes, not hours.
            </p>

        </div>


        <div className="how-it-works-grid">

            {/* STEP 1 */}
            <article className="step-card">

                <div className="step-top">

                    <div className="step-icon">
                        ◎
                    </div>

                    <span className="step-number">
                        01
                    </span>

                </div>

                <h3>
                    Create Your Account
                </h3>

                <p>
                    Sign up free in seconds. No credit card required to get
                    started and browse courses.
                </p>

            </article>


            {/* STEP 2 */}
            <article className="step-card">

                <div className="step-top">

                    <div className="step-icon">
                        ▣
                    </div>

                    <span className="step-number">
                        02
                    </span>

                </div>

                <h3>
                    Enroll in a Course
                </h3>

                <p>
                    Browse curated courses across tech, design, and business.
                    Enroll instantly.
                </p>

            </article>


            {/* STEP 3 */}
            <article className="step-card">

                <div className="step-top">

                    <div className="step-icon">
                        ♧
                    </div>

                    <span className="step-number">
                        03
                    </span>

                </div>

                <h3>
                    Learn with AI Support
                </h3>

                <p>
                    Watch HD lectures, take quizzes, join live sessions,
                    and ask your AI tutor anything.
                </p>

            </article>


            {/* STEP 4 */}
            <article className="step-card">

                <div className="step-top">

                    <div className="step-icon">
                        ♜
                    </div>

                    <span className="step-number">
                        04
                    </span>

                </div>

                <h3>
                    Earn Your Certificate
                </h3>

                <p>
                    Complete the curriculum and receive a verified certificate
                    to share on your profile.
                </p>

            </article>

        </div>

    </div>

</section>
         {/* ================= STUDENT STORIES ================= */}

<section className="student-stories-section">

    <div className="landing-container">

        <div className="student-stories-heading">

            <span className="section-label">
                ☆ STUDENT STORIES
            </span>

            <h2>
                Loved by Thousands of Learners
            </h2>

            <p>
                Real outcomes from real people who've used VertexPortal
            </p>

        </div>


        <div className="student-stories-grid">

            {/* TESTIMONIAL 1 */}

            <article className="testimonial-card">

                <div className="testimonial-rating">
                    ☆ ☆ ☆ ☆ ☆
                </div>

                <p className="testimonial-text">
                    "VertexPortal completely changed how I learn. The AI
                    tutor explains complex topics instantly, and live classes
                    feel genuinely interactive. Got my dream job in 5 months."
                </p>

                <div className="testimonial-divider"></div>

                <div className="testimonial-user">

                    <div className="testimonial-avatar avatar-purple">
                        PS
                    </div>

                    <div>
                        <strong>
                            Priya Sharma
                        </strong>

                        <span>
                            Full-Stack Developer · TechCorp India
                        </span>
                    </div>

                </div>

            </article>


            {/* TESTIMONIAL 2 */}

            <article className="testimonial-card">

                <div className="testimonial-rating">
                    ☆ ☆ ☆ ☆ ☆
                </div>

                <p className="testimonial-text">
                    "The course structure is impeccable. I went from beginner
                    to production-ready in one course. Certificate
                    verification made my resume stand out among hundreds of
                    applicants."
                </p>

                <div className="testimonial-divider"></div>

                <div className="testimonial-user">

                    <div className="testimonial-avatar avatar-blue">
                        AM
                    </div>

                    <div>
                        <strong>
                            Arjun Mehta
                        </strong>

                        <span>
                            Data Scientist · Analytics Labs
                        </span>
                    </div>

                </div>

            </article>


            {/* TESTIMONIAL 3 */}

            <article className="testimonial-card">

                <div className="testimonial-rating">
                    ☆ ☆ ☆ ☆ ☆
                </div>

                <p className="testimonial-text">
                    "Best learning platform I've used in years. Community
                    discussions, structured assignments, and a responsive
                    instructor community make it miles ahead of any competitor."
                </p>

                <div className="testimonial-divider"></div>

                <div className="testimonial-user">

                    <div className="testimonial-avatar avatar-green">
                        NG
                    </div>

                    <div>
                        <strong>
                            Neha Gupta
                        </strong>

                        <span>
                            UI/UX Designer · Creative Studio
                        </span>
                    </div>

                </div>

            </article>

        </div>

    </div>

</section>

        {/* ================= CTA ================= */}

<section className="cta-section">

    <div className="landing-container">

        <div className="cta-content">

            <span className="cta-badge">
                🛡 No credit card required — Free to start
            </span>

            <h2>
                Start Your Learning Journey Today
            </h2>

            <p>
                Join 50,000+ students already building skills on VertexPortal.
                Get instant access to courses, AI tutoring, live classes, and more.
            </p>

            <div className="cta-buttons">

                <a href="/signup" className="cta-primary-button">
                    Create Free Account
                    <span>→</span>
                </a>

                <a href="/courses" className="cta-secondary-button">
                    Explore Courses
                    <span>›</span>
                </a>

            </div>

            <div className="cta-features">

                <span>✓ Free plan available</span>

                <span>✓ AI Tutor included</span>

                <span>✓ Verified certificates</span>

            </div>

        </div>

    </div>

</section>

         {/* ================= FOOTER ================= */}

<footer className="footer-section">

    <div className="landing-container">

        <div className="footer-grid">

            {/* Brand */}

            <div className="footer-brand">

                <div className="footer-logo">
                    <div className="footer-logo-icon">
                        ✦
                    </div>

                    <span>
                        Vertex<span>Portal</span>
                    </span>
                </div>

                <div className="footer-tagline">
                    NEXT-GEN LMS
                </div>

                <p>
                    Empowering learners worldwide with interactive courses,
                    AI tutor assistants, real-time live classes, and
                    industry-recognized certificates.
                </p>

                <div className="footer-highlights">

                    <span>
                        ♢ Verified Certificates
                    </span>

                    <span>
                        ⚡ AI-Powered Learning
                    </span>

                </div>

                <div className="footer-socials">

                    <a href="#" aria-label="Website">
                        ◉
                    </a>

                    <a href="#" aria-label="Share">
                        ↗
                    </a>

                    <a href="#" aria-label="Community">
                        □
                    </a>

                </div>

            </div>


            {/* Learn */}

            <div className="footer-column">

                <h3>
                    <span>●</span>
                    LEARN
                </h3>

                <a href="/courses">
                    ▣ Browse Courses
                </a>

                <a href="#">
                    My Learning Portal
                </a>

                <a href="#">
                    Discussions & Q&A
                </a>

                <a href="/ai-tutor">
                    ✨ AI Tutor Assistant
                </a>

            </div>


            {/* Platform */}

            <div className="footer-column">

                <h3>
                    <span>●</span>
                    PLATFORM
                </h3>

                <a href="#">
                    ▣ Live Classes
                </a>

                <a href="#">
                    Quizzes & Tests
                </a>

                <a href="#">
                    Assignments
                </a>

                <a href="#">
                    Verified Certificates
                </a>

                <a href="#">
                    Study Notes
                </a>

            </div>


            {/* Stay Updated */}

            <div className="footer-column footer-newsletter">

                <h3>
                    <span>●</span>
                    STAY UPDATED
                </h3>

                <p>
                    Subscribe for new course releases,
                    workshops, and platform updates.
                </p>

                <div className="newsletter-form">

                    <div className="newsletter-input-wrapper">

                        <span>✉</span>

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                    </div>

                    <button>
                        Subscribe Now
                        <span>→</span>
                    </button>

                </div>

            </div>

        </div>


        {/* Footer Bottom */}

        <div className="footer-bottom">

            <p>
                © 2026 VertexPortal LMS. All rights reserved.
            </p>

            <div className="footer-legal">

                <a href="#">
                    Privacy Policy
                </a>

                <a href="#">
                    Terms of Service
                </a>

                <a href="#">
                    Help Center
                </a>

                <a href="#">
                    Platform Status
                </a>

            </div>

        </div>

    </div>

</footer>
        </div>

        
    );
};

export default LandingPage;