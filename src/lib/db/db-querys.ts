import db from "./db";
import bcrypt from "bcrypt";

export const registerUser = async (username: string, email: string, hashedPassword: string) => {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    console.log("ide")

    await new Promise ((res, rej) => {
        db.query(query, [username, email, hashedPassword], (err, result) => {
          if (err) {
            rej(err.message)
          } else {
            res(result);
          }
        });
    });
}

export const getUserId = async (email: string) => {
    let selectQuery = `SELECT id FROM users WHERE email = ?`;

    const userId = await new Promise((res, rej) => {
        db.query(selectQuery, [email], (err, result) => {
            if (err) {
                rej(err.message)
            } else {
                res(result[0].id);
            }
        })
    })

    return userId;
}

export const getUserById = async (userId:string | unknown) => {
    let query = `SELECT id, name, email, created_at FROM users WHERE id = ?`;

    const user = await new Promise((res, rej) => {
        db.query(query, [userId], (err, result) => {
            if (err) {
                rej(err.message)
            } else {
                res(result[0]);
            }
        })
    })

    return user;    
}

export const emailInUseCheck = async (email: string) => {
    let query = `SELECT * FROM users where email = ?`
    const emailArr: [] = await new Promise((res, rej) => {
        db.query(query, [email], (err, result) => {
            if(err){
                rej(err.message);
            } else {
                res(result);
            }
        })
    } )

    if(emailArr.length > 0){
        throw new Error("Email already in use")
    }
}

export const userLogin = async (email:string, password:string) =>{ 
    let query = `SELECT * FROM users WHERE email = ?`;
    const rows: any[] = await new Promise((res, rej) => {
        db.query(query, [email], (err, result) => {
            if(err){
                rej(err.message)
            } else {
                res(result);
            }
        })
    });
    
    if(rows.length === 0){
        throw new Error("Invalid credentials");
    }

    const user = rows[0];

    const passwordsMatch = await bcrypt.compare(password, user.password);
    
    if(!passwordsMatch){
        throw new Error("Invalid credentials");
    } else{
        return user;
    }
}

export const memberOfServers = async (userId:string | unknown) => {
    // this query gets all servers where an user is member of;
    const query = `SELECT servers.*, members.*
    FROM servers
    JOIN members ON servers.user_id = members.user_id
    WHERE servers.user_id = ?`

    const rows:any[] = await new Promise((res, rej) => {
        db.query(query, [userId] ,(err, result) => {
            if(err){
                rej(err);
            } else {
                res(result);
            }
        })
    })

    return rows;
}