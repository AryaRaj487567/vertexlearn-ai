const express = require("express");

const router = express.Router();

const {
    completeLecture,
    getProgress,
    getContinueLearning,
} = require("./progress.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.get(
    "/course/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    getProgress
);

router.get(
    "/continue/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    getContinueLearning
);

router.post(
    "/:lectureId/complete",
    authMiddleware,
    roleMiddleware("student"),
    completeLecture
);

module.exports = router;