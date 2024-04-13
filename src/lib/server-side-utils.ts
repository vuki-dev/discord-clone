import { jwtVerify } from "jose"
import { getJwtSecretKey } from "./auth"
import { getProfileById } from "./db-querys"

export async function getUserServerSide(token: string | undefined) {
    const verifiedToken = await jwtVerify(token ? token : "", new TextEncoder().encode(getJwtSecretKey().toString()))
    const profileId: string | unknown = verifiedToken.payload.payload;
    const profile = await getProfileById(profileId);
  
    return profile
  }