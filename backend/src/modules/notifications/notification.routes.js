const express = require("express");

const router = express.Router();

const {
    create,
    getMine,
    markRead,
    remove,
} = require("./notification.controller");

const authMiddleware = require("../../middleware/auth.middleware");

router.post(
    "/",
    authMiddleware,
    create
);

router.get(
    "/my",
    authMiddleware,
    getMine
);

router.patch(
    "/:notificationId/read",
    authMiddleware,
    markRead
);

router.delete(
    "/:notificationId",
    authMiddleware,
    remove
);

module.exports = router;