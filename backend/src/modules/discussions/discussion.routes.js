const express = require("express");

const router = express.Router();

const {
    create,
    getByCourse,
    reply,
    update,
    remove,
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

router.put(
    "/:discussionId",
    authMiddleware,
    update
);

router.delete(
    "/:discussionId",
    authMiddleware,
    remove
);

module.exports = router;