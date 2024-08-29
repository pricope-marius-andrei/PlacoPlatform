import { getConnectionDb } from "../utils/getConnectionDb.js";
import bcrypt from 'bcrypt';

function getAllWorkers() {
    return new Promise(async (resolve,reject) => {
        try {
            const client = await getConnectionDb();

            client
            .connect()
            .then(async ()=> {
                
                console.log("The connection was established!")

                const query = `SELECT * FROM public."User" WHERE TYPE='2';` 
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

function getAllClients() {
    return new Promise(async (resolve,reject) => {
        try {
            const client = await getConnectionDb();

            client
            .connect()
            .then(async ()=> {
                
                console.log("The connection was established!")

                const query = `SELECT * FROM public."User" WHERE TYPE='1';` 
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

function changePass({ email, currentPass, newPass, id_client }) {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            await client.connect();
            const query = `SELECT * FROM public."User" WHERE id=$1 AND email=$2;`;
            const values = [id_client, email];
            const res = await client.query(query, values);
            const user = res.rows[0];

            if (user && await bcrypt.compare(currentPass, user.password)) {
                const hashedNewPass = await bcrypt.hash(newPass, 10);
                const updateQuery = `UPDATE public."User" SET password=$1 WHERE id=$2;`;
                await client.query(updateQuery, [hashedNewPass, id_client]);
                resolve(true);
            } else {
                resolve(false);
            }
            await client.end();
        } catch(error) {
            reject(error);
        }
    })
}

export {getAllWorkers, getAllClients, changePass};