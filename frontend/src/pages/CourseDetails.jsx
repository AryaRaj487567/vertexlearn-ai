import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const courseData = {
    "mern-bootcamp": {
        category: "WEB DEVELOPMENT",
        title: "Complete MERN Stack Development Bootcamp 2026",
        instructor: "Arya Raj",
        lectures: 12,
        price: "₹499",
        oldPrice: "₹1999",
        level: "BEGINNER",
        image: "/courses/MERN.jpg",
        description:
            "Learn modern full-stack development using MongoDB, Express, React and Node.js.",
    },

    "data-science": {
        category: "DATA SCIENCE",
        title: "Data Science & Machine Learning Masterclass",
        instructor: "Ankit Verma",
        lectures: 18,
        price: "₹699",
        oldPrice: "₹2499",
        level: "INTERMEDIATE",
        image: "/courses/DSML.jpg",
        description:
            "Build strong foundations in data science, statistics, machine learning and practical analytics.",
    },

    "generative-ai": {
        category: "ARTIFICIAL INTELLIGENCE",
        title: "Generative AI & LLM Engineering",
        instructor: "Priyanshu Shekhar",
        lectures: 15,
        price: "₹799",
        oldPrice: "₹2999",
        level: "ADVANCED",
        image: "/courses/AILLM.jpg",
        description:
            "Learn LLMs, prompt engineering, RAG systems and modern generative AI application development.",
    },

    "aws-devops": {
        category: "CLOUD COMPUTING",
        title: "AWS Cloud & DevOps Complete Course",
        instructor: "Rahul Sharma",
        lectures: 14,
        price: "₹599",
        oldPrice: "₹1999",
        level: "BEGINNER",
        image: "/courses/DEVOPS.jpg",
        description:
            "Learn AWS cloud services, deployment, CI/CD and essential DevOps practices.",
    },

    "cyber-security": {
        category: "CYBER SECURITY",
        title: "Complete Cyber Security Fundamentals",
        instructor: "Aditya Verma",
        lectures: 16,
        price: "₹649",
        oldPrice: "₹2299",
        level: "INTERMEDIATE",
        image: "/courses/CYBER.jpg",
        description:
            "Understand networking, authentication, common vulnerabilities and modern cybersecurity fundamentals.",
    },
};

const CourseDetails = () => {

    const { courseId } = useParams();
    const navigate = useNavigate();

    const course = courseData[courseId];

    if (!course) {
        return (
            <div className="course-details-page">
                <h1>Course Not Found</h1>

                <button
                    className="primary-button"
                    onClick={() => navigate("/courses")}
                >
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className="course-details-page">

            <div className="course-details-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/courses")}
                >
                    ← Back to Courses
                </button>

                <div className="course-details-card">

                    <div className="course-details-image">

                            <span className="course-level">
                                {course.level}
                            </span>

                            <img
                                src={course.image}
                                alt={course.title}
                                className="course-details-img"
                            />

                        </div>

                    <div className="course-details-content">

                        <span className="course-category">
                            {course.category}
                        </span>

                        <h1>
                            {course.title}
                        </h1>

                        <p className="course-details-description">
                            {course.description}
                        </p>

                        <p className="course-instructor">
                            By <strong>{course.instructor}</strong>
                        </p>

                        <div className="course-details-divider" />

                        <div className="course-details-info">

                            <span>
                                📖 {course.lectures} lectures
                            </span>

                            <span>
                                🎓 Certificate included
                            </span>

                            <span>
                                🤖 AI Tutor access
                            </span>

                        </div>

                        <div className="course-details-price">

                            <strong>
                                {course.price}
                            </strong>

                            <del>
                                {course.oldPrice}
                            </del>

                        </div>

                        <div className="course-details-actions">

                            <button className="primary-button">
                                Enroll Now
                                <span>→</span>
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() => navigate("/ai-tutor")}
                            >
                                ✦ Try AI Tutor
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CourseDetails;