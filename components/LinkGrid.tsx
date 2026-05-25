import LinkCard from './LinkCard'
import { mockLinks, folders } from '@/lib/data'

type Props = {
  folderId?: string
}

export default function LinkGrid({ folderId }: Props) {
  const filtered = folderId
    ? mockLinks.filter((link) => link.folderId === folderId)
    : mockLinks

  const folderName = folderId
    ? (folders.find((f) => f.id === folderId)?.name ?? '알 수 없는 폴더')
    : null

  return (
    <section className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-700">
          {folderName ? (
            <>
              📁 {folderName}
              <span className="ml-2 text-sm font-normal text-gray-400">
                {filtered.length}개
              </span>
            </>
          ) : (
            <>
              전체
              <span className="ml-1 text-sm font-normal text-gray-400">
                {filtered.length}개
              </span>
            </>
          )}
        </h2>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-24 text-gray-400">
          <span className="text-5xl">🔗</span>
          <p className="text-sm">저장된 링크가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
