type LinkItem = {
  id: string
  title: string
  description: string
  url: string
  folder: string
  createdAt: string
}

type Props = {
  link: LinkItem
}

function getFaviconLetter(title: string) {
  return title.charAt(0).toUpperCase()
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

export default function LinkCard({ link }: Props) {
  return (
    <article className="link-card flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4">
      {/* 파비콘 + 제목 영역 */}
      <div className="flex items-start gap-3">
        {/* 파비콘 아바타 */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-bold text-[var(--text)]">
          {getFaviconLetter(link.title)}
        </div>

        {/* 제목 + 도메인 */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-[var(--text)]">
            {link.title}
          </h2>
          <p className="mt-0.5 truncate text-xs text-[var(--text-sub)]">
            {getDomain(link.url)}
          </p>
        </div>
      </div>

      {/* 설명 */}
      <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-sub)]">
        {link.description}
      </p>

      {/* 하단: 폴더 태그 + 날짜 */}
      <div className="flex items-center justify-between">
        <span className="rounded bg-[var(--hover-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
          📁 {link.folder}
        </span>
        <span className="text-xs text-[var(--text-sub)]">{link.createdAt}</span>
      </div>
    </article>
  )
}
