'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolders } from '@/lib/folder-context'

export default function Sidebar() {
  const pathname = usePathname()
  const { folders } = useFolders()

  const isAllActive = pathname === '/'
  const activeFolderId = pathname.startsWith('/folder/')
    ? pathname.split('/folder/')[1]
    : null

  return (
    <aside className="flex w-52 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-[var(--border)] bg-[var(--card-bg)] px-2 py-3">
      {/* All */}
      <Link
        href="/"
        className={`nav-link flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
          isAllActive ? 'nav-link-active' : 'text-[var(--text)]'
        }`}
      >
        <span className="text-base">🗂️</span>
        All
      </Link>

      {/* 구분선 */}
      <div className="my-2 border-t border-[var(--border)]" />

      {/* 폴더 섹션 레이블 */}
      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-sub)]">
        폴더
      </p>

      {/* 폴더 목록 */}
      <ul className="flex flex-col gap-0.5">
        {folders.map((folder) => {
          const isActive = activeFolderId === folder.id
          return (
            <li key={folder.id}>
              <Link
                href={`/folder/${folder.id}`}
                className={`nav-link flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm ${
                  isActive ? 'nav-link-active' : 'text-[var(--text)]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">📁</span>
                  {folder.name}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-[var(--accent)] text-white'
                      : 'bg-[var(--hover-bg)] text-[var(--text-sub)]'
                  }`}
                >
                  {folder.count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
