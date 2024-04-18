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
  channel_type: ChannelInteractionType | null;
  user_id: string;
  server_id: string;
  created_at: Date;
  updated_at: Date;
}

export type MemberRole = "ADMIN" | "MODERATOR" | "GUEST";

export type ChannelInteractionType = "AUDIO" | "VIDEO" | "TEXT";
