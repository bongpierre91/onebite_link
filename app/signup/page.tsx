import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-[var(--bg)]">
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-[var(--text)]">🔗 한입 링크</span>
        </div>

        {/* 카드 */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
          <h1 className="mb-6 text-xl font-semibold text-[var(--text)]">회원가입</h1>

          <form className="flex flex-col gap-4">
            {/* 이메일 */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text)]"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
              />
            </div>

            {/* 비밀번호 */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text)]"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
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
                className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
              />
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="btn-accent mt-2 w-full rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white"
            >
              회원가입
            </button>
          </form>

          {/* 로그인 링크 */}
          <p className="mt-5 text-center text-sm text-[var(--text-sub)]">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="auth-link font-medium text-[var(--accent)]">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
