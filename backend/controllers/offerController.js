import { createNewOffer, getOffers, deleteOffer, updateOfferAcceptedStatus,updateOfferValue, getWorkerOffers } from "../models/offerModel.js";
import {getBodyData} from "../utils/getBodyData.js";
import jwt from 'jsonwebtoken';

async function createNewWorkOffer(req,res) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }
        
        const offer = await getBodyData(req);        
        const response = await createNewOffer(offer);

        res.writeHead(201, {"Content-Type" : "application/json"});
        res.end(JSON.stringify({"message": "Oferta a fost creata", "offer": response}));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Oferta nu a fost creata"}));
    }
}

async function getAdOffersList(req, res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const offers = await getOffers(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(offers));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la furnizare listei de oferte!"}));
    }
}

async function deleteOfferFromList(req,res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const offerDeleted = await deleteOffer(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(offerDeleted));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la stergerea ofertei!"}));
    }
}

async function updateOfferStatus(req,res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const updatedOffer = await updateOfferAcceptedStatus(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(updatedOffer));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la actualizarea ofertei!"}));
    }
}

async function updateOfferValueController(req, res) {
    try {
        if(!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const offer = await getBodyData(req);
        const response = await updateOfferValue(offer);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(response));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la actualizarea valorii ofertei!"}));
    }
}

async function getWorkerWork(req, res) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }
        
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken);
        const idWorker = decodedToken.id;

        console.log(idWorker);

        const work = await getWorkerOffers(idWorker);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(work));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la furnizare listei de oferte!"}));
    }

}

export {createNewWorkOffer,getAdOffersList, deleteOfferFromList, updateOfferStatus, updateOfferValueController, getWorkerWork};