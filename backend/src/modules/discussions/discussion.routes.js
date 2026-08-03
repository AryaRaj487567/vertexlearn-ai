const express = require("express");

const router = express.Router();

const {
    create,
    getByCourse,
    reply,
} = require("./discussion.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.get(
    "/course/:courseId",
    authMiddleware,
    getByCourse
);

router.post(
    "/:courseId",
    authMiddleware,
    create
);

router.post(
    "/:discussionId/reply",
    authMiddleware,
    reply
);

module.exports = router;