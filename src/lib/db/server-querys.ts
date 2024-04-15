import db from "./db";

export const createServer = async (name: string, imageUrl: string) => {
    const query = `INSERT INTO profile (name, email, password) VALUES (?, ?, ?)`;

    await new Promise ((res, rej) => {
        
    });
}