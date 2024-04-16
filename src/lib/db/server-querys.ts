import db from "./db";

export const userCreateServer = async (
  id: string,
  userId: string,
  name: string,
  imageUrl: string,
  inviteCode: string
) => {
  const serverQuery = `INSERT INTO servers (id, user_id, name, image_url, invite_code) VALUES (?, ?, ?, ?, ?)`;

  const server = await new Promise((res, rej) => {
    db.query(
      serverQuery,
      [id, userId, name, imageUrl, inviteCode],
      (err, result) => {
        if (err) {
          rej(err);
        } else {
          // Retrieve the inserted server data

          const getServerQuery = `SELECT * FROM servers WHERE id = ?`;
          db.query(getServerQuery, [id], (err, serverResult) => {
            if (err) {
              rej(err);
            } else {
              // Return the inserted server data
              res(serverResult[0]);
            }
          });
        }
      }
    );
  });

  console.log("server", server);
};
