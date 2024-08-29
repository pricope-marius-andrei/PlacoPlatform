import {getAllWorkers, getAllClients, changePass} from "../models/userModel.js";
import { getBodyData } from "../utils/getBodyData.js";
import jwt from 'jsonwebtoken';

async function getWorkers(req, res) {
    try {
        const jobs = await getAllWorkers();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(jobs));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "Workers was not find!"}));
    }
}

async function getClients(req, res) {
    try {
        const jobs = await getAllClients();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(jobs));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "Clients was not find!"}));
    }
}

async function changePassword(req, res) {
    try {
        const {email, currentPass, newPass} = await getBodyData(req);

        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id_client = decodedToken.id;

        const neww = {
            email, 
            currentPass,
            newPass,
            id_client
        };

        const valid = await changePass(neww);

        if (valid) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Parola schimbata cu succes' }));
            console.log("Parola schimbata cu succes");
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Parola sau email incorect' }));
            console.log("Parola sau email incorect");
        }
    } catch (error) {
        console.error("Eroare la schimbarea parolei: ", error);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Eroare pentru schimbarea parolei' }));
    }
}

export {getClients, getWorkers, changePassword}