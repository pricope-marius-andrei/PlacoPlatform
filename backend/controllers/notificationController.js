import { getNotifications, createNewNotification, deleteNotification } from "../models/notificationModel.js";
import { getBodyData } from "../utils/getBodyData.js";
import jwt from 'jsonwebtoken';

async function getNotificationsController(req, res) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const workerId = decodedToken.id;

        const notifications = await getNotifications(workerId);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(notifications));
    } catch (error) {
        console.log(error);
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Notifications not found!"}));
    }
}

async function createNewNotificationController(req, res) {
    try {
        const body = await getBodyData(req);

        const notification = {
            worker_id: body.worker_id,
            created_at: body.created_at,
            id_offer: body.id_offer,
            ad_id: body.ad_id,
            accepted_status: body.accepted_status ? body.accepted_status : false
        };

        const response = await createNewNotification(notification);
        res.writeHead(201, {"Content-Type": "application/json"});
        res.end(JSON.stringify(response));
    } catch (error) {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Notification not created!"}));
    }
}

async function deleteNotificationAfterSendOffer(req, res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const notificationDeleted = await deleteNotification(id);

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(notificationDeleted));
    } catch (error) {
        res.writeHead(400, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Error deleting notification!"}));
    }

}

export {getNotificationsController, createNewNotificationController,deleteNotificationAfterSendOffer};