import { getConnectionDb } from "../utils/getConnectionDb.js";

function putReviewModel(review) {
    return new Promise(async (resolve,reject) => {
        try {
            const db = await getConnectionDb();
            const {stars, comment, userId} = review;

            db.connect().then(
                async () => {
                    const query = `INSERT INTO public."Review" ("stars", "comment", "id_worker") VALUES ($1, $2, $3) RETURNING *`;
                    const values = [stars, comment, userId];

                    const res = await db.query(query,values);

                    await db.end();

                    resolve(res.rows[0]);
                }
            )
            .catch((error) => reject(error))
        } catch (error) {
            reject(error);
        }
    })
}

function getReviews(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getConnectionDb();

            db.connect()
            .then(async ()=> {
                const query = `SELECT * from public."Review" where "id_worker"=${id};`;

                const res = await db.query(query);

                resolve(res.rows);
            })
            .catch((error) => console.log(error)) 
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}

export { putReviewModel, getReviews };