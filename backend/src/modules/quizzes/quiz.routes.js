const express = require("express");

const router = express.Router();

const {
    create,
} = require("./quiz.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    create
);

module.exports = router;