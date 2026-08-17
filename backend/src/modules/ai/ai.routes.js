const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");

const {
    chat,
    getChatHistory,
    clearHistory,
} = require("./ai.controller");


router.post(
    "/chat",
    authMiddleware,
    chat
);

router.get(
    "/history",
    authMiddleware,
    getChatHistory
);

router.delete(
    "/history",
    authMiddleware,
    clearHistory
);

module.exports = router;