const express = require("express");

const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");

const {
    chat,
    getChatHistory,
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


module.exports = router;