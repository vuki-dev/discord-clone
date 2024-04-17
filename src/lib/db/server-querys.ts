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

  const channelQuery =
    "INSERT INTO channels (name, user_id, server_id) VALUES (?, ?, ?)";

  const channel = await new Promise((res, rej) => {
    db.query(channelQuery, ["general", userId, serverId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });

  const memberQuery =
    "INSERT INTO members (user_id, role, server_id) VALUES (?, ?, ?)";
  const role: MemberRole = "ADMIN";

  const member = await new Promise((res, rej) => {
    db.query(memberQuery, [userId, role, serverId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
  
  return server;
};

export const memberOfServers = async (userId:string | unknown) => {
  // this query gets all servers where an user is member of;
  const query = `SELECT servers.*, members.role
  FROM servers
  JOIN members ON servers.user_id = members.user_id
  WHERE servers.user_id = ? AND members.server_id = servers.id`

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
