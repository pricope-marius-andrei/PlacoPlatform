import { getConnectionDb } from "../utils/getConnectionDb.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function register(user) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {email, phone, password1, type} = user;

            const salt = await bcrypt.genSalt(10);

            const hashPasword = await bcrypt.hash(password1, salt);

            client
            .connect()
            .then(async () => {
                const text = `INSERT INTO public."User" (email, phone, password, type) VALUES ($1, $2, $3, $4) RETURNING *`;
                const values = [email, phone, hashPasword, type];

                const res = await client.query(text, values);
                const newUser = res.rows[0];
    
                const token = jwt.sign(
                    { id: newUser.id, email: newUser.email, type: newUser.type },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                );

                await client.end();
    
                //resolve(res.rows[0]);
                resolve({ user: newUser, token });
            })
        } catch (error) {
            reject(error);
        }
    })
}

function login(user) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();
            const {email, password} = user;

            const query = `SELECT * FROM public."User" WHERE email = $1`;
            const values = [email];


            client
            .connect()
            .then(async () => {
                const result = await client.query(query, values);

                    if (result.rows.length === 0) {
                        reject("Emailul nu exista in baza de date.");
                    } else {
                        const user = result.rows[0];
                        const passwordMatch = await bcrypt.compare(password, user.password);
                        
                        if (passwordMatch) {
                            const updateQuery = `UPDATE public."User" SET "logStatus" = true WHERE email = $1`;
                            const updateValues = [email];
                            await client.query(updateQuery, updateValues);

                            const token = jwt.sign(
                                { id: user.id, email: user.email, type: user.type },
                                process.env.JWT_SECRET,
                                { expiresIn: process.env.JWT_EXPIRES_IN }
                            );


                            client.end();

                            resolve({ user, token });
                        } else {
                            reject("Parola incorecta.");
                        }
                    }

                    await client.end();
            })
        } catch (error) {
            reject(error);
        }
    })
}

function logout(email) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();

            const query = `SELECT * FROM public."User" WHERE email = $1`;
            const values = [email];

            client.connect().then(async () => {
                const result = await client.query(query, values);

                if (result.rows.length === 0) {
                    reject("Emailul nu exista in baza de date.");
                } else {
                    const user = result.rows[0];

                    const updateQuery = `UPDATE public."User" SET "logStatus" = false WHERE email = $1`;
                    const updateValues = [email];
                    await client.query(updateQuery, updateValues);

                    client.end();
                    resolve(user);
                }
            })
        } catch(error) {
            reject(error);
        }
    })
}

function forgot({email, newPass}) {
    return new Promise (async (resolve, reject) => {
        try {
            const client = await getConnectionDb();

            const query = `SELECT * FROM public."User" WHERE email = $1`;
            const values = [email];

            client.connect().then(async () => {
                const result = await client.query(query, values);

                if (result.rows.length === 0) {
                    reject("Emailul nu exista in baza de date.");
                } else {
                    const user = result.rows[0];

                    const hashedPassword = await bcrypt.hash(newPass, 10);

                    const updatePasswordQuery = `UPDATE public."User" SET "password" = $1 WHERE email = $2`;
                    const updatePasswordValues = [hashedPassword, email];
                    await client.query(updatePasswordQuery, updatePasswordValues);

                    client.end();
                    resolve(user);
                }
            })
        } catch(error) {
            reject(error);
        }
    })
}

export { register, login, logout, forgot };

