import { NextRequest, NextResponse } from "next/server";
import { ROLE } from "./constants";
import { BASE_PATH } from "./constants";

export function middleware(request: NextRequest) {
    let accessToken = request.cookies.get('accessToken')?.value
    let userData = request.cookies.get('userData')?.value
    let isUser = userData ? JSON.parse(userData).usrRoles === ROLE.USER : false;

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL(`${BASE_PATH}/home`, request.url));
    }
    if (request.nextUrl.pathname === '/customer-support') {
        return NextResponse.redirect(new URL(`${BASE_PATH}/customer-support/notice`, request.url));
    }

    // redirect when logged
    if (accessToken && userData && request.nextUrl.pathname.endsWith("/login")) {
        return NextResponse.redirect(new URL(`${BASE_PATH}/home`, request.url))
    }
    if (accessToken && userData && !isUser) {
        return NextResponse.next()
    }

    // user access to pages
    if (accessToken && userData && isUser && !request.nextUrl.pathname.startsWith("/cms")) {
        return NextResponse.next()
    }
    if (accessToken && userData && isUser && request.nextUrl.pathname.startsWith("/cms")) {
        return NextResponse.redirect(new URL(`${BASE_PATH}/home`, request.url))
    }

    // guest access
    if ((!accessToken || !userData) && request.nextUrl.pathname.startsWith("/cms") && !request.nextUrl.pathname.endsWith("/login")) {
        return NextResponse.redirect(new URL(`${BASE_PATH}/cms/login`, request.url))
    }
    if ((!accessToken || !userData) && !request.nextUrl.pathname.endsWith("/login")) {
        return NextResponse.redirect(new URL(`${BASE_PATH}/login`, request.url))
    }
}

export const config = {
    matcher: ['/', '/cms/:path*', '/login', '/customer-support/qa', '/diet-management/:path*', '/customer-support'],
};