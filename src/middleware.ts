import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  let token = req.cookies.get("token");

  if (token) {
    let isValidToken = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: VerifyErrors | null, decodedToken: JwtPayload | undefined) => {
        if(err) {
          return false;
        }
        else {
          return true;
        }
      }
    );

    if(!isValidToken){
      if(!req.url.includes('login') && !req.url.includes('register')){
        const response = NextResponse.redirect(new URL('/login', req.url));
        response.cookies.delete('token');
        return response;
      }
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
  
  } else {
    if( !req.url.includes('login') && !req.url.includes('register')){
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
