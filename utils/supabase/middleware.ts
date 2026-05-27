import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

/** 로그인이 필요한 보호된 경로인지 확인 */
function isProtectedPath(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname.startsWith('/folder') ||
    pathname.startsWith('/new')
  )
}

/**
 * Supabase 세션을 갱신하고, 보호된 경로에 비로그인 사용자가 접근하면
 * /login으로 리다이렉트합니다.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // 1) request 쿠키 갱신 (options는 request.cookies.set이 지원하지 않음)
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        // 2) 갱신된 request 기반으로 새 response 생성
        supabaseResponse = NextResponse.next({ request })
        // 3) response 쿠키에도 반영 (브라우저로 전달)
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // IMPORTANT: getUser()는 반드시 createServerClient 직후에 호출해야 합니다.
  // 그 사이에 다른 로직을 넣으면 세션 갱신이 깨질 수 있습니다.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // 비로그인 상태에서 보호된 경로 접근 시 /login으로 리다이렉트
  if (!user && isProtectedPath(pathname)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // IMPORTANT: supabaseResponse를 그대로 반환해야 쿠키 동기화가 유지됩니다.
  return supabaseResponse
}
