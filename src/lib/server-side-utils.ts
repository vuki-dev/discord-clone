import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getUserById } from "./db/db-queries"
import { ServerType, UserType } from "./types"
import { cookies } from "next/headers"
import { getServer, getServerChannels, getServerMembers } from "./db/server-queries"

export const getUserServerSide: () => Promise<UserType> = async () => {
    const token = cookies().get('token')?.value

    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const userId: string | unknown = verifiedToken.payload.payload as string;
    const user = await getUserById(userId);
  
    return user as UserType;
  }

export const getServerFull: (serverId: string, userId: string) => Promise<ServerType> = async (serverId, userId) => {
    const server = await getServer(serverId, userId);
    server.members = await getServerMembers(serverId);
    server.channels = await getServerChannels(serverId);
    // console.log(server.members)
    // console.log(server.channels)

    return server as ServerType;
}