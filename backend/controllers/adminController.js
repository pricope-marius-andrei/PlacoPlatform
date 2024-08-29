import { getBodyData } from "../utils/getBodyData.js";
import { getAllUsers, userDelete } from "../models/adminModel.js";

async function getUsers(req, res) {
    try {
        const users = await getAllUsers();

        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(users));

    } catch (error) {
        res.writeHead(400, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({message: "User not found!"}));
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = await getBodyData(req);

        const valid = await userDelete(id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User sters cu succes' }));
    } catch (error) {
        console.error("Eroare la stergerea acestui user: ", error);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Eroare la stergere' }));
    }
}

export {getUsers, deleteUser}