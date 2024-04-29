import db from "./db";
import { ChannelType, MemberType, MemberRole, ServerType } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

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

export const memberOfServers = async (userId: string | unknown) => {
  // this query gets all servers where an user is member of;
  const query = `SELECT members.*, servers.name, servers.image_url, servers.invite_code
  FROM members
  JOIN servers ON members.server_id = servers.id
  WHERE members.user_id = ?`;


  const rows: any[] = await new Promise((res, rej) => {
    db.query(query, [userId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });

  return rows;
};

export const getServer = async (
  serverId: string | unknown,
  userId: string | unknown
) => {
  const query = `SELECT servers.*
  FROM servers
  JOIN members ON servers.id = members.server_id
  WHERE servers.id = ? AND members.user_id = ?`;

  const rows: any[] = await new Promise((res, rej) => {
    db.query(query, [serverId, userId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(JSON.stringify(result)));
      }
    });
  });

  const server = rows[0];
  return server;
};

export const getServerChannels = async (serverId: string | unknown) => {
  const query = `SELECT * FROM channels WHERE server_id = ? ORDER BY created_at ASC`;

  const serverChannels: ChannelType[] = await new Promise((res, rej) => {
    db.query(query, [serverId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(JSON.stringify(result)));
      }
    });
  });

  return serverChannels;
};

export const getServerMembers = async (serverId: string | unknown) => {
  const query = `SELECT members.*, users.name, users.email, users.image_url
    FROM members
    JOIN users ON members.user_id = users.id
    WHERE members.server_id = ? ORDER BY role ASC`;

  const serverMembers: MemberType[] = await new Promise((res, rej) => {
    db.query(query, [serverId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(JSON.stringify(result)));
      }
    });
  });

  return serverMembers;
};

export const updateInviteCode = async (userId: string, serverId: string) => {
  const query = `UPDATE servers
  SET invite_code = ?
  WHERE user_id = ? AND id = ?`;

  const newCode = uuidv4();

  const server = await new Promise((res, rej) => {
    db.query(query, [newCode, userId, serverId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(getServer(serverId, userId));
      }
    });
  });

  return server;
};

export const getExistingServer = async (inviteCode: string, userId: string) => {
  const query = `SELECT servers.*
  FROM servers
  JOIN members ON servers.id = members.server_id
  WHERE servers.invite_code = ? AND members.user_id = ?`
  
  const rows: MemberType[] = await new Promise((res, rej) => {
    db.query(query, [inviteCode, userId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(JSON.stringify(result)));
      }
    });
  });

  return rows[0];
};

export const joinOnInvite = async (inviteCode: string, userId: string) => {
  const getServerByInvCodeQuery = `SELECT * FROM servers
  WHERE invite_code = ?`
  
  const joinServerQuery = `INSERT INTO members (user_id, server_id) VALUES (?, ?)`

  const rows: ServerType = await new Promise((res, rej) => {
    let server: ServerType;

    db.query(getServerByInvCodeQuery, [inviteCode], (err, result) => {
      if(err) {
        rej(err)
      } else {
        server = result[0];
        db.query(joinServerQuery, [userId, server.id], (err,result) => {
          if(err){
            rej(err)
          } else {
            res(server);
          }
        })
      }
    })
  })

  return rows;
}

export const editServer = async (serverId: string, userId: string, values: {name: string, imageUrl: string}) => {
  const {name, imageUrl} = values;

  const query = `UPDATE servers
  SET name = ?, image_url = ?
  WHERE id = ? AND user_id = ?;`

  const server = await new Promise((res,rej)=>{
    db.query(query, [name, imageUrl, serverId, userId],async (err,result)=>{
      if(err){
        rej(err)
      } else {
        const server = await getServer(serverId, userId);
        res(server);
      }
    })
  })


  return server;
}