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