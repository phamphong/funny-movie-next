import { NextRequest, NextResponse } from 'next/server';
import { decodeToken } from './utils/tokenUtil';

export const config = {
  matcher: [
    '/share',
  ],
}

export async function middleware(request: NextRequest): Promise<NextResponse<BaseResponse<any>>> {

  if (!request.cookies.get("token")?.value) {
    return NextResponse.redirect(new URL('/', request.url)) as NextResponse<BaseResponse<any>>;
  }

  const requestHeaders = new Headers(request.headers);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  }) as NextResponse<BaseResponse<any>>;
}
