'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Toast from '@/components/Toast'

/** Supabase 오류 메시지 → 한국어 변환 */
function toKoreanError(message: string): string {
  const msg = message.toLowerCase()
  if (msg.includes('user already registered') || msg.includes('already been registered')) {
    return '이미 가입된 이메일 주소입니다'
  }
  if (msg.includes('password should be at least') || msg.includes('password is too short')) {
    return '비밀번호는 최소 6자 이상이어야 합니다'
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) {
    return '올바른 이메일 형식이 아닙니다'
  }
  if (msg.includes('rate limit') || msg.includes('too many requests') || msg.includes('email rate limit exceeded')) {
    return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요'
  }
  if (msg.includes('signup is disabled') || msg.includes('signups not allowed')) {
    return '현재 회원가입이 비활성화되어 있습니다'
  }
  return '회원가입에 실패했습니다. 다시 시도해주세요'
}

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // 세 필드 모두 입력됐을 때만 버튼 활성화
  const isFormFilled =
    email.trim() !== '' && password !== '' && passwordConfirm !== ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 비밀번호 일치 확인
    if (password !== passwordConfirm) {
      setToastMessage('비밀번호가 일치하지 않습니다')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      setToastMessage(toKoreanError(error.message))
      return
    }

    // 회원가입 성공 → 인덱스 페이지로 이동
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
            <h1 className="mb-6 text-xl font-semibold text-[var(--text)]">회원가입</h1>

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

              {/* 비밀번호 확인 */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password-confirm"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  비밀번호 확인
                </label>
                <input
                  id="password-confirm"
                  type="password"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
                />
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                disabled={!isFormFilled || loading}
                className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? '처리 중...' : '회원가입'}
              </button>
            </form>

            {/* 로그인 링크 */}
            <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="auth-link font-medium text-[var(--accent)]">
                로그인
              </Link>
            </p>

            {/* 개인정보 처리방침 */}
            <p className="mt-3 text-center text-xs text-[var(--text-sub)]">
              <Link href="/privacy" className="hover:underline">
                개인정보 처리방침
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
