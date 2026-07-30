const express = require("express");

const router = express.Router();

const {
    create,
    getByCourse,
    submit,
    getSubmissions,
    grade,
} = require("./assignment.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

router.get(
    "/course/:courseId",
    authMiddleware,
    getByCourse
);

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    create
);

router.get(
    "/course/:courseId",
    authMiddleware,
    getByCourse
);

router.post(
    "/:courseId",
    authMiddleware,
    roleMiddleware("instructor"),
    create
);

router.post(
    "/:assignmentId/submit",
    authMiddleware,
    roleMiddleware("student"),
    submit
);

router.get(
    "/:assignmentId/submissions",
    authMiddleware,
    roleMiddleware("instructor"),
    getSubmissions
);

router.put(
    "/submissions/:submissionId/grade",
    authMiddleware,
    roleMiddleware("instructor"),
    grade
);

module.exports = router;