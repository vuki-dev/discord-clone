import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  let tokenCookie = req.cookies.get("token");
  let token = tokenCookie?.value;
  
  if(tokenCookie && token === undefined || token === ""){
    if( !req.url.includes('login') && !req.url.includes('register')){
      const response = NextResponse.redirect(new URL('/login', req.url));
      response.cookies.delete('token');
      return response;
    }
    const response = NextResponse.next();
    response.cookies.delete('token');
    return response;
  }

  const verifiedToken = token && await verifyToken(token);

  if(!verifiedToken){
    if( !req.url.includes('login') && !req.url.includes('register')){
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if(verifiedToken){
    if( req.url.includes('login') || req.url.includes('register')){
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
