import { ChannelInteractionType, ChannelType } from "../types";
import db from "./db";

export const createChannel = async (values: {name: string, type: string},serverId: string, userId: string) => {
    const query = `SELECT servers.* 
    FROM servers
    JOIN members ON servers.id = members.server_id
    WHERE servers.id = ? AND members.user_id = ? AND members.role = "ADMIN" OR members.role = "MODERATOR"`

    return await new Promise((res,rej)=>{
        db.query(query,[serverId, userId], (err,result)=>{
            if(err){
                rej(err)
            } else {
                const createChannelQuery = `
                INSERT INTO channels (name, channel_type, user_id, server_id)
                VALUES (?, ?, ?, ?)`

                db.query(createChannelQuery, [values.name, values.type, userId, serverId ], (err, result) => {
                    if(err){
                        rej(err)
                    } else {
                        res(result) // it will return first query result
                    }
                })
            }
        })
    })
}

export const deleteChannel = async (channelId: string, serverId: string, userId: string) => {
    const query = `
  DELETE channels
  FROM channels
  JOIN servers on servers.id = channels.server_id
  JOIN members on members.server_id = channels.server_id
  WHERE channels.id = ? AND servers.id = ? AND members.user_id = ? AND members.role IN ('ADMIN', 'MODERATOR') AND channels.name <> 'general'`

  return await new Promise((res, rej) => {
    db.query(query, [channelId, serverId, userId], (err, result)=>{
      if(err){
        rej(err)
      } else {
        res(result);
      }
    })
  })
}

export const editChannel = async (channelId: string, serverId: string, userId: string, {name, type}: {name: string, type: ChannelInteractionType}) => {
    const query = `
    UPDATE channels
    JOIN servers on servers.id = channels.server_id
    JOIN members on members.server_id = channels.server_id
    SET channels.name = ?, channels.channel_type = ?
    WHERE channels.id = ? AND servers.id = ? AND members.user_id = ? AND members.role IN ('ADMIN', 'MODERATOR') AND channels.name <> 'general'`
  
    return await new Promise((res, rej) => {
      db.query(query, [name, type, channelId, serverId, userId], (err, result)=>{
        if(err){
          rej(err)
        } else {
          res(result);
        }
      })
    })
}

export const getChannel = async (channelId:string) => {
    const query = `
    SELECT * FROM channels
    WHERE channels.id = ?`

    const channel: ChannelType = await new Promise((res, rej) => {
      db.query(query, [channelId], (err, result) => {
        if (err) {
          rej(err);
        } else {
          res(JSON.parse(JSON.stringify(result[0])));
        }
      });
    });

    return channel;
}