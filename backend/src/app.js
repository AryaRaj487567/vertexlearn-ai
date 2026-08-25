const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const courseRoutes = require("./modules/courses/course.routes");

const authRoutes = require("./modules/auth/auth.routes");
const enrollmentRoutes = require(
    "./modules/enrollments/enrollment.routes"
);

const lectureRoutes = require(
    "./modules/lectures/lecture.routes"
);

const progressRoutes = require(
    "./modules/progress/progress.routes"
);

const assignmentRoutes = require(
    "./modules/assignments/assignment.routes"
);

const quizRoutes = require(
    "./modules/quizzes/quiz.routes"
);

const certificateRoutes = require(
    "./modules/certificates/certificate.routes"
);

const gamificationRoutes = require(
    "./modules/gamification/gamification.routes"
);

const discussionRoutes = require(
    "./modules/discussions/discussion.routes"
);

const notificationRoutes = require(
    "./modules/notifications/notification.routes"
);

const adminRoutes = require(
    "./modules/admin/admin.routes"
);

const aiRoutes = require("./modules/ai/ai.routes");

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://vertexlearn-ai.vercel.app",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use(
    "/api/v1/enrollments",
    enrollmentRoutes
);

app.use(
    "/api/v1/lectures",
    lectureRoutes
);

app.use(
    "/api/v1/progress",
    progressRoutes
);

app.use(
    "/api/v1/assignments",
    assignmentRoutes
);

app.use(
    "/api/v1/quizzes",
    quizRoutes
);

app.use(
    "/api/v1/certificates",
    certificateRoutes
);

app.use(
    "/api/v1/gamification",
    gamificationRoutes
);

app.use(
    "/api/v1/discussions",
    discussionRoutes
);

app.use(
    "/api/v1/notifications",
    notificationRoutes
);

app.use(
    "/api/v1/admin",
    adminRoutes
);

app.use(
    "/api/v1/ai",
    aiRoutes
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "VertexLearn AI Backend Running 🚀"
    });
});

module.exports = app;