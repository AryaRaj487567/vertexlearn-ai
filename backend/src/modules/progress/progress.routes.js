const express = require("express");

const router = express.Router();

const {
    completeLecture,
} = require("./progress.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/:lectureId/complete",
    authMiddleware,
    roleMiddleware("student"),
    completeLecture
);

module.exports = router;