import db from "./db";

const registerProfile = async (username: string, email: string, hashedPassword: string) => {
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

const getProfileId = async (email: string) => {
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

export { registerProfile, getProfileId };