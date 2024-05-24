import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import {Server as SocketIOServer } from "socket.io";

export interface UserType {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface ServerType {
  id: string;
  name: string;
  image_url: string;
  invite_code: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  members?: MemberType[];
  channels?: ChannelType[];
}

export interface MemberType {
  id: string;
  role: MemberRole;
  user_id: string;
  server_id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  image_url: string | null;
}

export interface ChannelType {
  id: string;
  name: string;
  channel_type: ChannelInteractionType;
  user_id: string;
  server_id: string;
  created_at: Date;
  updated_at: Date;
}

export enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST"
}

export enum ChannelInteractionType {
  AUDIO = "AUDIO",
  TEXT = "TEXT",
  VIDEO = "VIDEO"
}

export interface ConversationType {
  id: string;
  memberOneId: string;
  memberTwoId: string;
  memberOne: UserType;
  memberTwo: UserType;
}

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    }
  }
}
