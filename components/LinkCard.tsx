type Link = {
  id: string
  title: string
  description: string
  url: string
  folder: string
  createdAt: string
}

type Props = {
  link: Link
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
    <article className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* 파비콘 + 제목 */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-base font-bold text-blue-600">
          {getFaviconLetter(link.title)}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-gray-900 group-hover:text-blue-600">
            {link.title}
          </h2>
          <p className="mt-0.5 truncate text-xs text-gray-400">
            {getDomain(link.url)}
          </p>
        </div>
      </div>

      {/* 설명 */}
      <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
        {link.description}
      </p>

      {/* 하단: 폴더 태그 + 날짜 */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
          📁 {link.folder}
        </span>
        <span className="text-xs text-gray-400">{link.createdAt}</span>
      </div>
    </article>
  )
}
