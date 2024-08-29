import { putReviewModel, getReviews } from "../models/reviewModel.js";
import { getBodyData } from "../utils/getBodyData.js";

async function putReview(req, res, userId) {
    try {
        const { stars, comment } = await getBodyData(req);

        const addReview = {
            stars,
            comment,
            userId
        };

        const valid = await putReviewModel(addReview);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'S-a adaugat acest review cu succes', valid }));
    } catch (error) {
        console.error("Error in putReview:", error.message);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Eroare in adaugarea acestui review!", error: error.message }));
    }
}

async function getReviewsById(req, res, id) {
    try {
        if (!req.headers.authorization) {
            throw new Error('Authorization header missing');
        }

        const review = await getReviews(id);

        res.writeHead(200, {"Content-Type" : "application/json"});
        res.end(JSON.stringify(review));
    } catch (error) {
        res.writeHead(400, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify({"message": "Eroare la furnizare de review-uri!"}));
    }
}

export { putReview, getReviewsById };
