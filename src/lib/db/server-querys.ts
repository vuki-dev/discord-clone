import db from "./db";
import { MemberRole, ServerType } from "../types";

export const userCreateServer = async (
  id: string,
  userId: string,
  name: string,
  imageUrl: string,
  inviteCode: string
) => {
  const serverQuery = `INSERT INTO servers (id, user_id, name, image_url, invite_code) VALUES (?, ?, ?, ?, ?)`;

  const server: ServerType = await new Promise((res, rej) => {
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

  const serverId = server.id;

  const channelQuery = "INSERT INTO channels (name, user_id, server_id) VALUES (?, ?, ?)"

  const channel = await new Promise((res, rej) => {
      db.query( channelQuery, ["general", userId, serverId], (err, result) => {
        if(err){
          rej(err)
        } else {
          res(result)
        }
      })
  })
  
  const memberQuery = "INSERT INTO members (user_id, role, server_id) VALUES (?, ?, ?)"
  const role: MemberRole = "ADMIN"

  const member = await new Promise((res, rej) => {
    db.query( memberQuery, [userId, role, serverId ], (err, result) => {
      if(err){
        rej(err)
      } else {
        res(result)
      }
    })
})
  
};
