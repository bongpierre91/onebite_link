'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useFolders } from '@/lib/folder-context'
import { useLinks } from '@/lib/link-context'
import { createClient } from '@/utils/supabase/client'
import EditFolderModal from './EditFolderModal'
import DeleteFolderModal from './DeleteFolderModal'
import type { Folder } from '@/lib/data'

function PencilIcon() {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

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

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { folders } = useFolders()
  const { links } = useLinks()
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [deletingFolder, setDeletingFolder] = useState<Folder | null>(null)
  const [logoutLoading, setLogoutLoading] = useState(false)

  const isAllActive = pathname === '/'
  const activeFolderId = pathname.startsWith('/folder/')
    ? pathname.split('/folder/')[1]
    : null

  const handleLogout = async () => {
    setLogoutLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <>
      {/* 사이드바: 위쪽 콘텐츠는 스크롤, 하단 로그아웃은 고정 */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--card-bg)]">

        {/* 스크롤 가능한 내비게이션 영역 */}
        <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-3">
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
              const linkCount = links.filter((l) => l.folderId === folder.id).length

              return (
                <li key={folder.id} className="group relative">
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
                      className={`ml-2 shrink-0 rounded px-1.5 py-0.5 text-xs transition-opacity group-hover:opacity-0 ${
                        isActive
                          ? 'bg-[var(--accent)] text-white'
                          : 'bg-[var(--hover-bg)] text-[var(--text-sub)]'
                      }`}
                    >
                      {linkCount}
                    </span>
                  </Link>

                  <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      aria-label={`${folder.name} 폴더 수정`}
                      className="folder-edit-btn rounded p-0.5 text-[var(--text-sub)]"
                      onClick={() => setEditingFolder(folder)}
                    >
                      <PencilIcon />
                    </button>
                    <button
                      type="button"
                      aria-label={`${folder.name} 폴더 삭제`}
                      className="folder-delete-btn rounded p-0.5 text-[var(--text-sub)]"
                      onClick={() => setDeletingFolder(folder)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* 하단 고정: 로그아웃 버튼 + 개인정보 처리방침 */}
        <div className="px-2 py-3 border-t border-[var(--border)]">
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="btn-secondary flex w-full items-center gap-2 rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <LogoutIcon />
            {logoutLoading ? '로그아웃 중...' : '로그아웃'}
          </button>
          <Link
            href="/privacy"
            className="mt-2 block px-3 text-center text-xs text-[var(--text-sub)] hover:underline"
          >
            개인정보 처리방침
          </Link>
        </div>
      </aside>

      {editingFolder && (
        <EditFolderModal
          folder={editingFolder}
          onClose={() => setEditingFolder(null)}
        />
      )}
      {deletingFolder && (
        <DeleteFolderModal
          folder={deletingFolder}
          onClose={() => setDeletingFolder(null)}
        />
      )}
    </>
  )
}
