const express = require("express");

const router = express.Router();

const {
    generate,
    getMine,
    getOne,
} = require("./certificate.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.post(
    "/:courseId/generate",
    authMiddleware,
    roleMiddleware("student"),
    generate
);

router.get(
    "/my",
    authMiddleware,
    roleMiddleware("student"),
    getMine
);

router.get(
    "/:certificateId",
    authMiddleware,
    roleMiddleware("student"),
    getOne
);

module.exports = router;