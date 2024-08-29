import { getConnectionDb } from "../utils/getConnectionDb.js";

function getAllUsers() {
    return new Promise(async (resolve,reject) => {
        try {
            const client = await getConnectionDb();

            client
            .connect()
            .then(async ()=> {

                const query = `SELECT ID, EMAIL, TYPE FROM public."User" WHERE TYPE='1' OR TYPE='2';` 
                const res = await client.query(query);

                resolve(res.rows);
                
                client
                    .end()
                    .then(() => {
                        console.log('Connection to PostgreSQL closed');
                    })
                    .catch((err) => {
                        console.error('Error closing connection', err);
                    });
            })
            .catch((error) => {reject(error)})
            
        } catch (error) {
            reject(error)
        }
    })
}

function userDelete(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            await client.connect();
            const query = `DELETE FROM public."User" WHERE id=$1;`;
            const res = await client.query(query, [id]);
            const user = res.rows[0];

            await client.end();
            resolve(user);
        } catch(error) {
            reject(error);
        }
    })
}

export {getAllUsers, userDelete}