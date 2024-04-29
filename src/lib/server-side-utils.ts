import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getUserById } from "./db/db-queries"
import { UserType } from "./types"
import { cookies } from "next/headers"

export const getUserServerSide: () => Promise<UserType> = async () => {
    const token = cookies().get('token')?.value

    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const userId: string | unknown = verifiedToken.payload.payload as string;
    const user = await getUserById(userId);
  
    return user as UserType;
  }