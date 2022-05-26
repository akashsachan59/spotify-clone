import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
    //token will exist if user is logged in
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl

    // Allow the request if the following is true...
    // 1) Its a request for next-auth session and provider fetching
    // 2) the token exists

    if(pathname.includes('/api/auth') || token){
        return NextResponse.next();
    }

    // Redirect to login if no token and requesting to protected route

    if(!token && pathname !== "/login"){
        return NextResponse.redirect(`http://localhost:3001/login`)  
    }
}