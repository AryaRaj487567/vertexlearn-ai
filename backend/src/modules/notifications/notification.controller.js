const {
    createNotification,
    getMyNotifications,
    markAsRead,
    deleteNotification,
} = require("./notification.service");

const create = async (req, res) => {

    try {
        const notification =
            await createNotification(req.body);

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getMine = async (req, res) => {

    try {
        const notifications =
            await getMyNotifications(req.user.id);
        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const markRead = async (req, res) => {

    try {
        const notification =
            await markAsRead(
                req.params.notificationId,
                req.user.id
            );
        res.status(200).json({
            success: true,
            message: "Notification marked as read",
            data: notification,
        });

    } catch (error) {
        if (
            [
                "Notification not found",
                "Unauthorized",
            ].includes(error.message)
        ) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const remove = async (req, res) => {

    try {
        await deleteNotification(
            req.params.notificationId,
            req.user.id
        );
        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });

    } catch (error) {
        if (
            [
                "Notification not found",
                "Unauthorized",
            ].includes(error.message)
        ) {

            return res.status(400).json({
                success: false,
                message: error.message,
            });

        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getMine,
    markRead,
    remove,
};