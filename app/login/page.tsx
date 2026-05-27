'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Toast from '@/components/Toast'

/** Supabase 로그인 오류 메시지 → 한국어 변환 */
function toKoreanError(message: string): string {
  const msg = message.toLowerCase()
  if (
    msg.includes('invalid login credentials') ||
    msg.includes('invalid credentials') ||
    msg.includes('wrong password')
  ) {
    return '이메일 또는 비밀번호가 올바르지 않습니다'
  }
  if (msg.includes('email not confirmed')) {
    return '이메일 인증이 완료되지 않았습니다. 메일함을 확인해주세요'
  }
  if (msg.includes('user not found')) {
    return '등록되지 않은 이메일입니다'
  }
  if (
    msg.includes('rate limit') ||
    msg.includes('too many requests') ||
    msg.includes('email rate limit exceeded')
  ) {
    return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요'
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요'
  }
  return '로그인에 실패했습니다. 다시 시도해주세요'
}

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // 두 필드 모두 입력됐을 때만 버튼 활성화
  const isFormFilled = email.trim() !== '' && password !== ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      setToastMessage(toKoreanError(error.message))
      return
    }

    // 로그인 성공 → 인덱스 페이지로 이동
    router.push('/')
  }

  return (
    <>
      {/* 에러 토스트 */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}

      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12">
        <div className="w-full max-w-sm">
          {/* 로고 */}
          <div className="mb-8 text-center">
            <span className="text-2xl font-bold text-[var(--text)]">🔗 한입 링크</span>
          </div>

          {/* 카드 */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
            <h1 className="mb-6 text-xl font-semibold text-[var(--text)]">로그인</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* 이메일 */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
                />
              </div>

              {/* 비밀번호 */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
                />
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                disabled={!isFormFilled || loading}
                className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            {/* 회원가입 링크 */}
            <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="auth-link font-medium text-[var(--accent)]">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
