import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

const createToken = (profile_id: string | unknown) => {
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  const maxAge = 24 * 60 * 60;

  return jwt.sign({ profile_id }, jwtSecret, { expiresIn: maxAge });
};

export { createToken };