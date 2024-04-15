import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getProfileById } from "./db-querys"
import { ProfileType } from "./types"

export const getUserServerSide: (token: string | undefined) => Promise<ProfileType> = async (token) => {
    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const profileId: string | unknown = verifiedToken.payload.payload as string;
    const profile = await getProfileById(profileId);
  
    return profile as ProfileType;
  }