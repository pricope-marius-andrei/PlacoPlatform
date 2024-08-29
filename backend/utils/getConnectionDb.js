import pg from 'pg'

const {Client} = pg;

function getConnectionDb() {

    const dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,        
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        ssl: {
            rejectUnauthorized: false // Disable SSL verification
        }
    };

    return new Promise((resolve,reject) => {
        try {
            const client = new Client(dbConfig);
            resolve(client);

        } catch (error) {
            reject(error);
        }
    })
}

export {getConnectionDb};