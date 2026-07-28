const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const courseRoutes = require("./modules/courses/course.routes");

const authRoutes = require("./modules/auth/auth.routes");
const enrollmentRoutes = require(
    "./modules/enrollments/enrollment.routes"
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use(
    "/api/v1/enrollments",
    enrollmentRoutes
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "VertexLearn AI Backend Running 🚀"
    });
});

module.exports = app;