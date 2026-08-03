const express = require("express");

const router = express.Router();

const {
    award,
    profile,
    leaderboard,
} = require("./gamification.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/award-xp",
    authMiddleware,
    roleMiddleware("student"),
    award
);

router.get(
    "/profile",
    authMiddleware,
    roleMiddleware("student"),
    profile
);

router.get(
    "/leaderboard",
    authMiddleware,
    leaderboard
);

module.exports = router;