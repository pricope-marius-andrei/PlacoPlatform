import {getBodyData} from "../utils/getBodyData.js"
import { addAd, getAdsByClientId, getAllClientAds, getClientAdById } from "../models/adClientModel.js"
import jwt from 'jsonwebtoken';

async function createAdClient(req, res) {
    try {
        const {title, description, category, img} = await getBodyData(req);
        
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id_client = decodedToken.id;

        const add = {
            title,
            description,
            category, 
            id_client,
            img
        };

        const valid = await addAd(add);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Anunt creat cu succes', valid }));
    } catch(error) {
        console.error("Eroare la crearea anuntului: ", error);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Anunt esuat' }));
    }
} 

async function getClientAds(req, res) {
    try{

        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id_client = decodedToken.id;

        const ads = await getAdsByClientId(id_client);
        console.log("Client ads:", ads);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ads));
    } catch(error) {
        console.error("Eroare la obtinerea anunturilor: ", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nu s-au putut obtine anunturile' }));
    }
}

async function getAllAds(req, res) {
    try {
        const ads = await getAllClientAds();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ads));
    } catch (error) {
        console.error("Eroare la obtinerea anunturilor: ", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nu s-au putut obtine anunturile' }));
    }
}

async function getAdById(req, res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }
        const ad = await getClientAdById(id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ad));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nu s-a putut obtine anuntul!' }));
    }
}

export { createAdClient, getClientAds, getAllAds, getAdById };