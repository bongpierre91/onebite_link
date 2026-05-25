'use client'

import { useState } from 'react'
import DeleteLinkModal from './DeleteLinkModal'
import EditLinkModal from './EditLinkModal'

type LinkItem = {
  id: string
  title: string
  description: string
  url: string
  folderId: string
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

export default function LinkCard({ link }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <>
      <article className="group link-card relative flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)]">
        {/* 수정/삭제 버튼 그룹 — 우측 상단, hover 시 표시 */}
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            aria-label={`${link.title} 링크 수정`}
            onClick={() => setIsEditing(true)}
            className="rounded-md bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] shadow-sm ring-1 ring-[var(--border)] transition-colors hover:text-[var(--accent)]"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            aria-label={`${link.title} 링크 삭제`}
            onClick={() => setIsDeleting(true)}
            className="rounded-md bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] shadow-sm ring-1 ring-[var(--border)] transition-colors hover:text-[var(--error)]"
          >
            <TrashIcon />
          </button>
        </div>

        {/* 썸네일 — 있을 경우만 표시 */}
        {link.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
            alt={link.title}
            className="h-36 w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}

        {/* 카드 본문 */}
        <div className="flex flex-col gap-3 p-4">
          {/* 파비콘 + 제목 */}
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

      {/* 수정 모달 */}
      {isEditing && (
        <EditLinkModal
          link={{
            id: link.id,
            title: link.title,
            description: link.description,
            folderId: link.folderId,
          }}
          onClose={() => setIsEditing(false)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {isDeleting && (
        <DeleteLinkModal
          linkId={link.id}
          linkTitle={link.title}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </>
  )
}
