'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import Toast from '@/components/Toast'

type Status = 'loading' | 'form' | 'invalid'

function toKoreanError(message: string): string {
  const msg = message.toLowerCase()
  if (msg.includes('password should be at least') || msg.includes('password is too short')) {
    return '비밀번호는 최소 6자 이상이어야 합니다'
  }
  if (msg.includes('same password')) {
    return '이전 비밀번호와 다른 비밀번호를 입력해주세요'
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요'
  }
  return '비밀번호 재설정에 실패했습니다. 다시 시도해주세요'
}

export default function ResetPasswordPage() {
  const router = useRouter()

  const [status, setStatus] = useState<Status>('loading')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const isFormFilled = password !== '' && passwordConfirm !== ''

  useEffect(() => {
    // URL에 인증 코드가 있는지 확인 (PKCE) 또는 해시에 recovery 타입이 있는지 확인
    const url = new URL(window.location.href)
    const hasCode = url.searchParams.has('code')
    const hasRecoveryHash = window.location.hash.includes('type=recovery')

    if (!hasCode && !hasRecoveryHash) {
      // 인증 코드 없이 직접 접근한 경우
      setStatus('invalid')
      return
    }

    const supabase = createClient()

    // PASSWORD_RECOVERY 이벤트를 수신하면 폼 표시
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStatus('form')
      }
    })

    // 타임아웃: 5초 내에 이벤트가 오지 않으면 invalid 처리
    const timeout = setTimeout(() => {
      setStatus((prev) => (prev === 'loading' ? 'invalid' : prev))
    }, 5000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== passwordConfirm) {
      setToastMessage('비밀번호가 일치하지 않습니다')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setToastMessage(toKoreanError(error.message))
      return
    }

    // 비밀번호 변경 성공 → 로그인 페이지로 이동
    router.push('/login')
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

            {/* ── 로딩 상태 ── */}
            {status === 'loading' && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
                <p className="text-sm text-[var(--text-sub)]">인증 정보를 확인하는 중...</p>
              </div>
            )}

            {/* ── 유효하지 않은 링크 ── */}
            {status === 'invalid' && (
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h1 className="text-lg font-semibold text-[var(--text)]">유효하지 않은 링크</h1>
                  <p className="mt-1.5 text-sm text-[var(--text-sub)]">
                    비밀번호 재설정 링크가 만료되었거나<br />
                    올바르지 않습니다.
                  </p>
                </div>
                <Link
                  href="/forgot-password"
                  className="auth-link mt-2 text-sm font-medium text-[var(--accent)]"
                >
                  비밀번호 찾기 다시 시도하기
                </Link>
              </div>
            )}

            {/* ── 새 비밀번호 입력 폼 ── */}
            {status === 'form' && (
              <>
                <h1 className="mb-2 text-xl font-semibold text-[var(--text)]">새 비밀번호 설정</h1>
                <p className="mb-6 text-sm text-[var(--text-sub)]">
                  새로 사용할 비밀번호를 입력해주세요.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  {/* 새 비밀번호 */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
                      새 비밀번호
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="새 비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
                    />
                  </div>

                  {/* 새 비밀번호 확인 */}
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

                  {/* 변경 버튼 */}
                  <button
                    type="submit"
                    disabled={!isFormFilled || loading}
                    className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {loading ? '변경 중...' : '비밀번호 변경'}
                  </button>
                </form>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
