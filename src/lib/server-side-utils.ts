import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getUserById } from "./db/db-querys"
import { ProfileType } from "./types"
import { cookies } from "next/headers"

export const getUserServerSide: () => Promise<ProfileType> = async () => {
    const token = cookies().get('token')?.value

    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const userId: string | unknown = verifiedToken.payload.payload as string;
    const user = await getUserById(userId);
  
    return user as ProfileType;
  }