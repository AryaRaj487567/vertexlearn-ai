const express = require("express");

const { create,getAll,getById,update } = require("./course.controller");

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("instructor"),
    create,
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("instructor"),
    update
);

module.exports = router;