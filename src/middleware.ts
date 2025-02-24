import {
  type MiddlewareConfig,
  type NextRequest,
  NextResponse,
} from 'next/server'
import { env } from '@/lib/env'
import { jwtVerify } from 'jose'

const publicRoutes = [
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/registrar', whenAuthenticated: 'redirect' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/login'

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('token')?.value as string

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET)

    await jwtVerify(authToken, secret)

    console.log('Token válido ✅')

    return NextResponse.next()
  } catch (error) {
    console.error('Token inválido ❌', error)

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    const response = NextResponse.redirect(redirectUrl)
    response.headers.set('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0')

    return response
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
