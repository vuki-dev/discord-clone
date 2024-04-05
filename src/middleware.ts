import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";

export default function middleware(req: NextRequest, res: NextResponse) {
  let token = req.cookies.get("token");

  if (!token && (req.url.includes("login") || req.url.includes("register"))) {
    return;
  }

  if (!token && (!req.url.includes("login") || !req.url.includes("register"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((token && req.url.includes("login")) || req.url.includes("register")) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: VerifyErrors | null, decodedToken: JwtPayload | undefined) => {
        if(err) {
            console.log("Error", err.message);
            const response = NextResponse.next();
            response.cookies.delete('token');
            return response
        }
        else {
            console.log(decodedToken);
            return NextResponse.redirect(new URL("/", req.url));
        }
      }
    );
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
