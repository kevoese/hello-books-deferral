import Mail from 'friendly-mail';
import User from '@models/User';
import Notification from '@models/Notification';
import { exists } from 'fs';

const inAppNotification = async (email, type, data) => {
    await Notification.query().insert({
        type,
        data,
        email
    });
};

const sendMailNotification = async (email, type, data) => {
    await new Mail('notification-mail')
        .to(email)
        .data({
            email,
            type,
            message: data
        })
        .subject('Hello Books Notification')
        .send();
};

const sendNotification = async (type, data) => {
    let result = false;
    const users = await User.query().select();

    users.forEach(user => {
        if (user.settings === null) {
            result = true;
            return result;
        } else if (
            user.settings.email_notify === 1 &&
            user.settings.in_app_notify === 1
        ) {
            // send user an in app notification
            inAppNotification(user.email, type, data);
            // send user a notification mail
            sendMailNotification(user.email, type, data);
        } else if (
            user.settings.email_notify === 1 &&
            user.settings.in_app_notify === 0
        ) {
            // send user a notification mail
            sendMailNotification(user.email, type, data);
        } else if (
            user.settings.email_notify === 0 &&
            user.settings.in_app_notify === 1
        ) {
            // send user an in app notification
            inAppNotification(user.email, type, data);
        }
    });
};

const getAllUserNotification = async (req, res) => {
    const notifications = await Notification.query().where({
        email: req.params.email
    });
    if (notifications) {
        return res.status(200).jsend(notifications);
    } else {
        return res.status(404).jsend({
            message: 'No notifications at the moment'
        });
    }
};

const getSpecificUserNotification = async (req, res) => {
    const { id, email } = req.params;
    const notification = await Notification.query().where({
        email: email,
        id: id
    });

    if (!notification[0]) {
        return res.status(404).jsend({
            message: 'Notification not found'
        });
    }
    if (!notification[0].read_at) {
        await Notification.query()
            .where({ id: id })
            .update({ read_at: 'now' });
        return res.status(200).jsend(notification);
    } else {
        return res.status(200).jsend(notification);
    }
};

export default {
    sendNotification,
    getAllUserNotification,
    getSpecificUserNotification
};
