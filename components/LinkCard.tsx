type LinkItem = {
  id: string
  title: string
  description: string
  url: string
  folder: string
  createdAt: string
  thumbnail: string | null
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
    <article className="link-card flex flex-col rounded-lg border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden">
      {/* 썸네일 — 있을 경우만 표시 */}
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={link.thumbnail}
          alt={link.title}
          className="h-36 w-full object-cover"
          onError={(e) => {
            // 이미지 로딩 실패 시 썸네일 영역 숨김
            e.currentTarget.style.display = 'none'
          }}
        />
      )}

      {/* 카드 본문 */}
      <div className="flex flex-col gap-3 p-4">
        {/* 파비콘 + 제목 영역 */}
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--hover-bg)] text-sm font-bold text-[var(--text)]">
            {getFaviconLetter(link.title)}
          </div>

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
        {link.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-[var(--text-sub)]">
            {link.description}
          </p>
        )}

        {/* 하단: 폴더 태그 + 날짜 */}
        <div className="flex items-center justify-between">
          <span className="rounded bg-[var(--hover-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
            📁 {link.folder || '미분류'}
          </span>
          <span className="text-xs text-[var(--text-sub)]">{link.createdAt}</span>
        </div>
      </div>
    </article>
  )
}
