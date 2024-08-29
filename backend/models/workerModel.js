import { getConnectionDb } from "../utils/getConnectionDb.js";

function byteArrayToBase64(byteArray) {
    return Buffer.from(byteArray).toString('base64');
}

function details(addDetails) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();
            const { contact, description, img, id_client } = addDetails;

            const imgBuffer = Buffer.from(img, 'base64');

            addDB.connect()
                .then(async () => {
                    try {
                        const res = await addDB.query('SELECT 1 FROM public."WorkerDetails" WHERE id_client = $1', [id_client]);

                        if (res.rows.length > 0) {
                            await addDB.query(
                                'UPDATE public."WorkerDetails" SET img = $1, contact = $2, description = $3 WHERE id_client = $4',
                                [imgBuffer, contact, description, id_client]
                            );
                        } else {
                            const text = `INSERT INTO public."WorkerDetails" (img, contact, description, id_client) VALUES ($1, $2, $3, $4) RETURNING *`;
                            const values = [imgBuffer, contact, description, id_client];
                            const insertedProfile = await addDB.query(text, values);
                        }

                        resolve("Operation successful");
                    } catch (queryError) {
                        reject(`Database operation failed: ${queryError.message}`);
                    } finally {
                        await addDB.end();
                    }
                })
                .catch(connectError => {
                    reject(`Connection to database failed: ${connectError.message}`);
                });
        } catch (error) {
            reject(error);
        }
    });
}

function getDetailsById(id_client) {
    return new Promise(async (resolve, reject) => {
        try {
            const adDB = await getConnectionDb();

            adDB.connect()
            .then(async () => {

                const query = `SELECT * FROM public."WorkerDetails" WHERE id_client = $1`;
                const values = [id_client];

                const res = await adDB.query(query, values);
                
                if (res.rows.length === 0) {
                    resolve({});
                    return;
                }

                const workerDetails = res.rows[0];
                const imgBase64 = workerDetails.img.toString('base64');

                const details = {
                    ...workerDetails,
                    img: imgBase64
                };

                await adDB.end();

                resolve(details);

            })
        } catch(error) {
            reject(error);
        }
    })
}

function skills(addSkill) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();
            const { category, description, img, id_client } = addSkill;

            const imgBuffer = Buffer.from(img, 'base64');

            addDB.connect()
                .then(async () => {

                    const text = `INSERT INTO public."WorkerSkills" (img, category, description, id_client) VALUES ($1, $2, $3, $4) RETURNING *`;
                    const values = [imgBuffer, category, description, id_client];
                    const insertedProfile = await addDB.query(text, values);
                        
                    resolve("Operation successful");
                    await addDB.end();
                })
        } catch (error) {
            reject(error);
        }
    });
}

function getSkillsById(id_client) {
    return new Promise(async (resolve, reject) => {
        try {
            const adDB = await getConnectionDb();

            adDB.connect()
            .then(async () => {

                const query = `SELECT * FROM public."WorkerSkills" WHERE id_client = $1`;
                const values = [id_client];

                const res = await adDB.query(query, values);
                
                if (res.rows.length === 0) {
                    resolve({});
                    return;
                }

                const skills = res.rows.map(workerSkill => ({
                    ...workerSkill,
                    img: workerSkill.img ? workerSkill.img.toString('base64') : null
                }));
    
                await adDB.end();
    
                resolve(skills);

            })
        } catch(error) {
            reject(error);
        }
    })
}

function getAllWorkers() {
    return new Promise(async (resolve, reject) => {
        try {
            const client = await getConnectionDb();

            client.connect()
            .then(async () => {
                const query = `SELECT * FROM public."WorkerDetails";`;
                const res = await client.query(query);

                const getWorkerDetails = res.rows.map(workerDetails => ({
                    ...workerDetails,
                    img: workerDetails.img ? workerDetails.img.toString('base64') : null
                }))

                await client.end();

                resolve(getWorkerDetails);
            })
        } catch (error) {
            reject(error);
        }
    })
}


export { details, getDetailsById, skills, getSkillsById, getAllWorkers };
