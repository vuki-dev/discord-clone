import db from "./db";

export const updateMemberRole = async (role:string, serverId: string, userId: string, memberId: string) => {
    const query = `update members
    join servers on servers.id = members.server_id
    set members.role = ?
    where servers.id = ? and servers.user_id = ? and members.id = ? and members.user_id <> ?`

    const server = await new Promise((res, rej) => {
        db.query(query, [role, serverId, userId, memberId, userId], (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(result);
          }
        });
    });

    return server;
}

export const kickMember = async (memberId: string, serverId: string, userId: string) => {
  const query = `DELETE members
  FROM members
  JOIN servers ON servers.id = members.server_id
  WHERE members.id = ? AND servers.id = ? AND servers.user_id = ?`

  return await new Promise((res, rej) => {
      db.query(query, [memberId, serverId, userId], (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
  }); 
}