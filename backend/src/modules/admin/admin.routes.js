const express = require("express");

const router = express.Router();

const {
    dashboard,
    getUsers,
    removeUser,
    getCourses,
    removeCourse,
    analytics,
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

router.get(
    "/courses",
    authMiddleware,
    roleMiddleware("admin"),
    getCourses
);

router.delete(
    "/courses/:courseId",
    authMiddleware,
    roleMiddleware("admin"),
    removeCourse
);

router.get(
    "/analytics",
    authMiddleware,
    roleMiddleware("admin"),
    analytics
);

module.exports = router;