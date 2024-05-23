import { ConversationType, UserType } from "../types";
import db from "./db";

export const findConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  const query = `SELECT * FROM conversations
    WHERE conversations.member_one_id = ? AND conversations.member_two_id = ?`;

  const conversation = await new Promise((res, rej) => {
    db.query(query, [memberOneId, memberTwoId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result[0] ? JSON.parse(JSON.stringify(result[0])) : result[0]);
      }
    });
  });

  return conversation as ConversationType;
};

export const createConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  const insertQuery = `INSERT INTO conversations (member_one_id, member_two_id)
                         VALUES (?, ?)`;

  await new Promise((res, rej) => {
    db.query(insertQuery, [memberOneId, memberTwoId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });

  const selectQuery = `SELECT * FROM conversations 
                         WHERE member_one_id = ? AND member_two_id = ?`;

  const newConversation = await new Promise((res, rej) => {
    db.query(selectQuery, [memberOneId, memberTwoId], (err, result) => {
      if (err) {
        rej(err);
      } else {
        res(JSON.parse(JSON.stringify(result[0])));
      }
    });
  });

  return newConversation as ConversationType;
};

export const getConversationMember = async (memberId: string) => {
    const query = `select users.* from users
    join members on users.id = members.user_id
    where members.id = ?`

    const member = await new Promise((res, rej) => {
        db.query(query, [memberId], (err, result) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(JSON.stringify(result[0])));
          }
        });
      });

    return member as UserType;
}
