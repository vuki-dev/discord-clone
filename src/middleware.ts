import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { VerifyErrors, JwtPayload } from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  let tokenCookie = req.cookies.get("token");
  let jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    jwtSecret = "";
  }

  if (tokenCookie) {
    let isValidToken = jwt.verify(
      tokenCookie.value,
      jwtSecret,
      (err: VerifyErrors | null, decodedToken: JwtPayload | undefined) => {
        if(err) {
          console.log("token invalid");
          console.log(err)
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
