import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export default function middleware(req: NextRequest) {
    let token = req.cookies.get("token");

    if(!token && (req.url.includes('login') || req.url.includes('register'))){
        return;
    }

    if(!token && (!req.url.includes('login') || !req.url.includes('register')) ){
        return NextResponse.redirect(new URL('/login',req.url))
    }

    if(token && req.url.includes('login') || req.url.includes('register')){
        return NextResponse.redirect(new URL('/', req.url))
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};