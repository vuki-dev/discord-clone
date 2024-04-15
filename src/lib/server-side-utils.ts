import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getProfileById } from "./db/db-querys"
import { ProfileType } from "./types"
import { cookies } from "next/headers"

export const getUserServerSide: () => Promise<ProfileType> = async () => {
    const token = cookies().get('token')?.value

    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const profileId: string | unknown = verifiedToken.payload.payload as string;
    const profile = await getProfileById(profileId);
  
    return profile as ProfileType;
  }