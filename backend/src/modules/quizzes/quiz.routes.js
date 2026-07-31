const express = require("express");

const router = express.Router();

const {
    create,
    getByCourse,
    attempt,
    getResult,
} = require("./quiz.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.get(
    "/course/:courseId",
    authMiddleware,
    getByCourse
);

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    create
);

router.post(
    "/:quizId/attempt",
    authMiddleware,
    roleMiddleware("student"),
    attempt
);

router.get(
    "/:quizId/result",
    authMiddleware,
    roleMiddleware("student"),
    getResult
);

module.exports = router;