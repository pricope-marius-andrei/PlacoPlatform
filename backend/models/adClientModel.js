import { getConnectionDb } from "../utils/getConnectionDb.js"

function byteArrayToBase64(byteArray) {
    return Buffer.from(byteArray).toString('base64');
}

function addAd(add) {
    return new Promise(async (resolve, reject) => {
        try {
            const addDB = await getConnectionDb();

            const { title, description, category, id_client, img } = add;

            const imgBuffer = Buffer.from(img, 'base64');

            addDB.connect()
            .then(async () => {

                const query = `INSERT INTO public."ClientAdd" (title, description, category, id_client, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
                const values = [title, description, category, id_client, imgBuffer];

                const res = await addDB.query(query, values);
                const newAd = res.rows[0];

                await addDB.end();

                resolve(newAd);
            })
        } catch(error) {
            reject(error);
        }
    })
}

function getAdsByClientId(id_client) {
    return new Promise(async (resolve, reject) => {
        try {
            const adDB = await getConnectionDb();

            adDB.connect()
            .then(async () => {

                const query = `SELECT * FROM public."ClientAdd" WHERE id_client = $1`;
                const values = [id_client];

                const res = await adDB.query(query, values);
            
                const ads = res.rows.map(ad => ({
                    ...ad,
                    img: ad.img ? ad.img.toString('base64') : null
                }));

                await adDB.end();

                resolve(ads);

            })
        } catch(error) {
            reject(error);
        }
    })
}

function getAllClientAds() {
    return new Promise(async (resolve, reject) => {
        try {
            const adsDb = await getConnectionDb();

            adsDb.connect()
            .then(async () => {
                const query = `SELECT * FROM public."ClientAdd";`;
                const res = await adsDb.query(query);
                

                res.rows.map(ad => console.log(byteArrayToBase64(ad.img)));
                
                const ads = res.rows.map(ad => ({
                    ...ad,
                    img: ad.img ? `data:image/png;base64,${byteArrayToBase64(ad.img)}` : null
                }));

                await adsDb.end();

                resolve(ads);
            })
        } catch (error) {
            reject(error);
        }
    })
}

function getClientAdById(adId) {
    return new Promise(async (resolve,reject) => {
        try {
            const adDb = await getConnectionDb();

            adDb.connect() 
            .then(async () => {
                const query = `SELECT * FROM public."ClientAdd" WHERE id_add=${adId};`;
                const res = await adDb.query(query);

                const ads = res.rows.map(ad => ({
                    ...ad,
                    img: ad.img ? `data:image/png;base64,${byteArrayToBase64(ad.img)}` : null
                }));

                await adDb.end();
                resolve(ads);

            })
        } catch (error) {
            reject(error);
        }
    })
}

export { addAd, getAdsByClientId, getAllClientAds, getClientAdById };