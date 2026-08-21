import React from "react";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const courses = [
    {   
        id: "mern-bootcamp",
        category: "WEB DEVELOPMENT",
        title: "Complete MERN Stack Development Bootcamp 2026",
        instructor: "Arya Raj",
        lectures: "12 lectures",
        price: "₹499",
        oldPrice: "₹1999",
        level: "BEGINNER",
        image: "/courses/MERN.jpg"
    },
    {   
        id: "data-science",
        category: "DATA SCIENCE",
        title: "Data Science & Machine Learning Masterclass",
        instructor: "Ankit Verma",
        lectures: "18 lectures",
        price: "₹699",
        oldPrice: "₹2499",
        level: "INTERMEDIATE",
        image: "/courses/DSML.jpg"
    },
    {   
        id: "generative-ai",
        category: "ARTIFICIAL INTELLIGENCE",
        title: "Generative AI & LLM Engineering",
        instructor: "Aryan Raj",
        lectures: "15 lectures",
        price: "₹799",
        oldPrice: "₹2999",
        level: "ADVANCED",
        image: "/courses/AILLM.jpg"
    },
    {   
        id: "aws-devops",
        category: "CLOUD COMPUTING",
        title: "AWS Cloud & DevOps Complete Course",
        instructor: "Anjali Kapoor",
        lectures: "14 lectures",
        price: "₹599",
        oldPrice: "₹1999",
        level: "BEGINNER",
        image: "/courses/DEVOPS.jpg"
    },
    {   
        id: "cyber-security",
        category: "CYBER SECURITY",
        title: "Complete Cyber Security Fundamentals",
        instructor: "Priyanshu Shekhar",
        lectures: "16 lectures",
        price: "₹649",
        oldPrice: "₹2299",
        level: "INTERMEDIATE",
        image: "/courses/CYBER.jpg"
    }
];

const Courses = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page dark">

            {/* ================= NAVBAR ================= */}

            <header className="landing-navbar">
                <div className="landing-container navbar-inner">

                    <div className="brand">
                        <div className="brand-icon">
                            ✦
                        </div>

                        <span className="brand-text">
                            Vertex<span>Portal</span>
                        </span>
                    </div>

                    <nav className="navbar-links">

                        <a href="/courses">
                            ◉&nbsp; Courses
                        </a>

                        <a href="/playground">
                            &lt;/&gt;&nbsp; Playground
                        </a>

                        <a href="/login" className="login-link">
                            Log in
                        </a>

                        <a href="/signup" className="signup-button">
                            Sign up
                        </a>

                    </nav>

                </div>
            </header>


            {/* ================= COURSES ================= */}

            <main>

                <section className="hero-section">

                    <div className="landing-container">

                        <div className="hero-content">

                            <div className="trusted-badge">
                                <span>✦</span>
                                EXPLORE COURSES
                            </div>

                            <h1>
                                Learn Skills That
                                <br />
                                <span>Move You Forward</span>
                            </h1>

                            <p className="hero-description">
                                Explore expert-led courses designed to help you
                                build real-world skills and advance your career.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= COURSE LIST ================= */}

                <section className="courses-section">

                    <div className="landing-container">

                        <div className="courses-heading">

                            <div>
                                <span className="trusted-badge">
                                    MOST POPULAR
                                </span>

                                <h2>
                                    Top Courses Right Now
                                </h2>

                                <p>
                                    Hand-picked courses for modern learners
                                </p>
                            </div>

                            <span className="course-count">
                                {courses.length} courses
                            </span>

                        </div>


                        <div className="courses-grid">

                            {courses.map((course, index) => (

                                <article
                                    className="course-card"
                                    key={index}
                                >

                                    <div className="course-image">

                                        <img
                                            src={course.image}
                                            alt={course.title}
                                        />

                                        <div className="course-image-overlay"></div>

                                        <span className="course-level">
                                            {course.level}
                                        </span>

                                        <strong>
                                            {course.title}
                                        </strong>

                                    </div>


                                    <div className="course-content">

                                        <span className="course-category">
                                            {course.category}
                                        </span>

                                        <h3>
                                            {course.title}
                                        </h3>

                                        <p>
                                            by {course.instructor}
                                        </p>

                                        <div className="course-divider" />

                                        <div className="course-info">

                                            <span>
                                                📖 {course.lectures}
                                            </span>

                                            <div>
                                                <strong>
                                                    {course.price}
                                                </strong>

                                                <del>
                                                    {course.oldPrice}
                                                </del>
                                            </div>

                                        </div>

                                        <button
                                            className="primary-button"
                                            onClick={() => navigate(`/courses/${course.id}`)}
                                        >
                                            View Course
                                            <span>→</span>
                                        </button>

                                    </div>

                                </article>

                            ))}

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default Courses;