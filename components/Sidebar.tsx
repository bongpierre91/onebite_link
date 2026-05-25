'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { folders } from '@/lib/data'

export default function Sidebar() {
  const pathname = usePathname()

  const isAllActive = pathname === '/'
  const activeFolderId = pathname.startsWith('/folder/')
    ? pathname.split('/folder/')[1]
    : null

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col gap-1 overflow-y-auto border-r border-gray-200 bg-white p-3">
      {/* All 버튼 */}
      <Link
        href="/"
        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isAllActive
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>🗂️</span>
        All
      </Link>

      {/* 구분선 */}
      <div className="my-2 border-t border-gray-100" />

      {/* 폴더 목록 */}
      <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
        폴더
      </p>
      <ul className="mt-1 flex flex-col gap-0.5">
        {folders.map((folder) => {
          const isActive = activeFolderId === folder.id
          return (
            <li key={folder.id}>
              <Link
                href={`/folder/${folder.id}`}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>📁</span>
                  {folder.name}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500'
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
