'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolders } from '@/lib/folder-context'
import DeleteFolderModal from './DeleteFolderModal'
import type { Folder } from '@/lib/data'

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const { folders } = useFolders()
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null)

  const isAllActive = pathname === '/'
  const activeFolderId = pathname.startsWith('/folder/')
    ? pathname.split('/folder/')[1]
    : null

  return (
    <>
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
              <li key={folder.id} className="folder-item relative">
                {/* 폴더 링크 */}
                <Link
                  href={`/folder/${folder.id}`}
                  className={`nav-link flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm ${
                    isActive ? 'nav-link-active' : 'text-[var(--text)]'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 text-base">📁</span>
                    <span className="truncate">{folder.name}</span>
                  </span>
                  <span
                    className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-xs ${
                      isActive
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--hover-bg)] text-[var(--text-sub)]'
                    }`}
                  >
                    {folder.count}
                  </span>
                </Link>

                {/* 삭제 버튼 — hover 시 노출 */}
                <button
                  type="button"
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="folder-delete-btn absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-[var(--text-sub)]"
                  onClick={() => setDeletingFolder(folder)}
                >
                  <TrashIcon />
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      {/* 삭제 확인 모달 */}
      {deletingFolder && (
        <DeleteFolderModal
          folder={deletingFolder}
          onClose={() => setDeletingFolder(null)}
        />
      )}
    </>
  )
}
