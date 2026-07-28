const express = require("express");

const router = express.Router();

const {
    enroll,
    getMyCourses,
    getStudents,
} = require("./enrollment.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.get(
    "/my",
    authMiddleware,
    roleMiddleware("student"),
    getMyCourses
);

router.get(
    "/course/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    getStudents
);

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    enroll
);

module.exports = router;