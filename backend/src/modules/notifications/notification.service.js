const Notification = require("./notification.model");

const createNotification = async (notificationData) => {

    const notification = await Notification.create({
        user: notificationData.user,
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
    });

    return notification;

};

const getMyNotifications = async (userId) => {

    const notifications = await Notification.find({
        user: userId,
    })
        .sort({ createdAt: -1 });

    return notifications;

};

const markAsRead = async (
    notificationId,
    userId
) => {

    const notification = await Notification.findById(
        notificationId
    );

    if (!notification) {
        throw new Error("Notification not found");
    }

    if (notification.user.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    notification.isRead = true;

    await notification.save();

    return notification;

};

const deleteNotification = async (
    notificationId,
    userId
) => {

    const notification = await Notification.findById(
        notificationId
    );

    if (!notification) {
        throw new Error("Notification not found");
    }

    if (notification.user.toString() !== userId) {
        throw new Error("Unauthorized");
    }

    await Notification.findByIdAndDelete(notificationId);

};

module.exports = {
    createNotification,
    getMyNotifications,
    markAsRead,
    deleteNotification,
};
