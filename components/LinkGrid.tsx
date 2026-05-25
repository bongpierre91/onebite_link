'use client'

import LinkCard from './LinkCard'
import { useFolders } from '@/lib/folder-context'
import { useLinks } from '@/lib/link-context'

type Props = {
  folderId?: string
}

export default function LinkGrid({ folderId }: Props) {
  const { folders } = useFolders()
  const { links } = useLinks()

  const filtered = folderId
    ? links.filter((link) => link.folderId === folderId)
    : links

  const folderName = folderId
    ? (folders.find((f) => f.id === folderId)?.name ?? '알 수 없는 폴더')
    : null

  return (
    <section className="p-6">
      {/* 섹션 헤더 */}
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-base font-semibold text-[var(--text)]">
          {folderName ? `📁 ${folderName}` : '전체'}
        </h2>
        <span className="rounded bg-[var(--hover-bg)] px-1.5 py-0.5 text-xs text-[var(--text-sub)]">
          {filtered.length}
        </span>
      </div>

      {/* 빈 상태 */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-[var(--text-sub)]">
          <span className="text-5xl">🔗</span>
          <p className="text-sm">저장된 링크가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((link) => {
            const folder = folders.find((f) => f.id === link.folderId)
            return (
              <LinkCard
                key={link.id}
                link={{ ...link, folder: folder?.name ?? '' }}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
