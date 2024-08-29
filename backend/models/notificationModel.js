import {getConnectionDb} from '../utils/getConnectionDb.js';

function getNotifications(workerId) {
  return new Promise(async (resolve, reject) => {
    try {
        const db = await getConnectionDb();

        db.connect()
        .then(async () => {

            const query = `SELECT * FROM public."WorkerNotifications" ORDER BY created_at DESC; `;
            const response = await db.query(query);

            await db.end(); 
            resolve(response.rows);
        })
        .catch((error) => {console.log(error); reject(error);});
    } catch (error) {
        reject(error);
    }
  });
}

function createNewNotification(notification) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await getConnectionDb();

            const {worker_id, created_at, id_offer, ad_id, accepted_status} = notification;

            db.connect()
            .then(async () => {
                if(notification.id_offer === undefined)
                {
                  const query = `INSERT INTO public."WorkerNotifications" (worker_id, created_at, ad_id, accepted_status) VALUES ('${worker_id}', '${created_at}', ${ad_id}, '${accepted_status}') RETURNING *`;
                  const response = await db.query(query);

                  await db.end();
                  resolve(response.rows[0]);
                }
                else 
                {
                  const query = `INSERT INTO public."WorkerNotifications" (worker_id, created_at, id_offer, ad_id, accepted_status) VALUES ('${worker_id}', '${created_at}', '${id_offer}', '${ad_id}', '${accepted_status}') RETURNING *`;
                  const response = await db.query(query);

                  await db.end(); 
                  resolve(response.rows[0]);
                }

            })
            .catch((error) => {console.log(error); reject(error);});
        } catch (error) {
            reject(error);
        }
    });
}

function deleteNotification(idNotification) {
  return new Promise(async (resolve, reject) => {
    try {
        const db = await getConnectionDb();

        db.connect()
        .then(async () => {
            const query = `DELETE FROM public."WorkerNotifications" WHERE notification_id=${idNotification};`;

            const res = await db.query(query);
            await db.end();
            resolve(res.rows[0]);
        })
        .catch((error) => {console.log(error); reject(error);});
    } catch (error) {
        reject(error);
    }
  });
}

export {getNotifications, createNewNotification, deleteNotification};