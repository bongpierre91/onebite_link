'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import Toast from '@/components/Toast'

function toKoreanError(message: string): string {
  const msg = message.toLowerCase()
  if (msg.includes('rate limit') || msg.includes('too many requests') || msg.includes('email rate limit exceeded')) {
    return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요'
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) {
    return '올바른 이메일 형식이 아닙니다'
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요'
  }
  return '이메일 발송에 실패했습니다. 다시 시도해주세요'
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const isFormFilled = email.trim() !== ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)

    if (error) {
      setToastMessage(toKoreanError(error.message))
      return
    }

    setSent(true)
  }

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}

      <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 py-12">
        <div className="w-full max-w-sm">
          {/* 로고 */}
          <div className="mb-8 text-center">
            <span className="text-2xl font-bold text-[var(--text)]">🔗 한입 링크</span>
          </div>

          <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
            {sent ? (
              /* ── 발송 성공 상태 ── */
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-2xl">
                  ✉️
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-[var(--text)]">메일을 발송했습니다</h1>
                  <p className="mt-1.5 text-sm text-[var(--text-sub)]">
                    <span className="font-medium text-[var(--text)]">{email}</span> 으로<br />
                    비밀번호 재설정 링크를 보내드렸습니다.<br />
                    메일함을 확인해주세요.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="auth-link mt-2 text-sm font-medium text-[var(--accent)]"
                >
                  로그인 페이지로 돌아가기
                </Link>
              </div>
            ) : (
              /* ── 이메일 입력 폼 ── */
              <>
                <h1 className="mb-2 text-xl font-semibold text-[var(--text)]">비밀번호 찾기</h1>
                <p className="mb-6 text-sm text-[var(--text-sub)]">
                  가입하신 이메일 주소를 입력하시면<br />
                  비밀번호 재설정 링크를 보내드립니다.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
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

                  <button
                    type="submit"
                    disabled={!isFormFilled || loading}
                    className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? '발송 중...' : '재설정 링크 발송'}
                  </button>
                </form>

                <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
                  <Link href="/login" className="auth-link font-medium text-[var(--accent)]">
                    로그인으로 돌아가기
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
