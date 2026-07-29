const express = require("express");

const router = express.Router();

const {
    create,
    getByCourse,
    getById,
    update,
    remove,
} = require("./lecture.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    create
);

router.get(
    "/course/:courseId",
    getByCourse
);

router.get("/:lectureId", getById);

router.put(
    "/:lectureId",
    authMiddleware,
    roleMiddleware("instructor"),
    update
);

router.delete(
    "/:lectureId",
    authMiddleware,
    roleMiddleware("instructor"),
    remove
);

module.exports = router;