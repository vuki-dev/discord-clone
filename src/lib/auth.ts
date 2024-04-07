import { jwtVerify, JWTPayload, decodeJwt, SignJWT } from 'jose';
import { nanoid } from "nanoid";

export function getJwtSecretKey() {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT Secret key is not set');
	}

	const enc: Uint8Array = new TextEncoder().encode(secret);
	return enc;
}

const createToken = async (payload: any) => {
  const token = await new SignJWT({payload})
          .setProtectedHeader({alg: "HS256"})
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("1 day")
          .sign(new TextEncoder().encode(getJwtSecretKey().toString()))

  return token;
}

const verifyToken = async (token: string | any) => {
  // if doesnt work change encoder to simple jwtSecret
  try{
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey().toString()));
    return true;
  } catch (err) {
    //throw new Error("Token is not valid");
    return false;
  }
}

export { createToken, verifyToken };