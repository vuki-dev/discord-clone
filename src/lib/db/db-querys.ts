import db from "./db";
import bcrypt from "bcrypt";

export const registerProfile = async (username: string, email: string, hashedPassword: string) => {
    const query = `INSERT INTO profile (name, email, password) VALUES (?, ?, ?)`;

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

export const getProfileId = async (email: string) => {
    let selectQuery = `SELECT id FROM profile WHERE email = ?`;

    const profileId = await new Promise((res, rej) => {
        db.query(selectQuery, [email], (err, result) => {
            if (err) {
                rej(err.message)
            } else {
                res(result[0].id);
            }
        })
    })

    return profileId;
}

export const getProfileById = async (profileId:string | unknown) => {
    let query = `SELECT id, name, email, created_at FROM profile WHERE id = ?`;

    const profile = await new Promise((res, rej) => {
        db.query(query, [profileId], (err, result) => {
            if (err) {
                rej(err.message)
            } else {
                res(result[0]);
            }
        })
    })

    return profile;    
}

export const emailInUseCheck = async (email: string) => {
    let query = `SELECT * FROM profile where email = ?`
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
    let query = `SELECT * FROM profile WHERE email = ?`;
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

export const memberOfServers = async (profileId:string | unknown) => {
    // this query gets all servers where an profile is member of;
    const query = `SELECT server.*, member.*
    FROM server
    JOIN member ON server.profile_id = member.profile_id
    WHERE server.profile_id = ?`

    const rows:any[] = await new Promise((res, rej) => {
        db.query(query, [profileId] ,(err, result) => {
            if(err){
                rej(err);
            } else {
                res(result);
            }
        })
    })

    return rows;
}