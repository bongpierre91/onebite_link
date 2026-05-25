import NewLinkButton from './NewLinkButton'
import NewFolderButton from './NewFolderButton'

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--card-bg)] px-4">
      {/* 좌측: 로고 */}
      <div className="flex items-center gap-2">
        <span className="text-lg">🔗</span>
        <span className="text-base font-semibold text-[var(--text)]">
          한입 링크
        </span>
      </div>

      {/* 우측: 새 폴더 | 새 링크 */}
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <NewLinkButton />
      </div>
    </header>
  )
}
