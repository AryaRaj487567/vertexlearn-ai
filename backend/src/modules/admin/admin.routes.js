const express = require("express");

const router = express.Router();

const {
    dashboard,
    getUsers,
    removeUser,
} = require("./admin.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    dashboard
);

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    getUsers
);

router.delete(
    "/users/:userId",
    authMiddleware,
    roleMiddleware("admin"),
    removeUser
);

module.exports = router;