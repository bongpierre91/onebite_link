'use client'

import { useEffect, useState } from 'react'
import { useLinks } from '@/lib/link-context'
import { useFolders } from '@/lib/folder-context'

type LinkItem = {
  id: string
  title: string
  description: string
  folderId: string
}

type Props = {
  link: LinkItem
  onClose: () => void
}

export default function EditLinkModal({ link, onClose }: Props) {
  const { updateLink } = useLinks()
  const { folders } = useFolders()

  const [title, setTitle] = useState(link.title)
  const [description, setDescription] = useState(link.description)
  const [folderId, setFolderId] = useState(link.folderId)
  const [submitting, setSubmitting] = useState(false)

  // Escape 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleSave() {
    if (!title.trim() || submitting) return
    setSubmitting(true)
    await updateLink(link.id, {
      title: title.trim(),
      description: description.trim(),
      folderId,
    })
    setSubmitting(false)
    onClose()
  }

  return (
    /* 오버레이 */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* 모달 카드 */}
      <div
        className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 제목 */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-lg">✏️</span>
          <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>
        </div>

        {/* 폴더 선택 */}
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-[var(--text-sub)]">
            폴더
          </label>
          <select
            value={folderId}
            onChange={(e) => setFolderId(e.target.value)}
            className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--text)]"
          >
            <option value="">미분류</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* 제목 인풋 */}
        <div className="mb-3">
          <label className="mb-1 block text-xs font-medium text-[var(--text-sub)]">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--placeholder)]"
            placeholder="링크 제목"
          />
        </div>

        {/* 설명 텍스트에어리어 */}
        <div className="mb-5">
          <label className="mb-1 block text-xs font-medium text-[var(--text-sub)]">
            설명
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="input-field w-full resize-none rounded-md border border-[var(--border)] px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--placeholder)]"
            placeholder="링크에 대한 설명을 입력하세요"
          />
        </div>

        {/* 취소 / 저장 버튼 — 동일 크기 */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1 rounded-md border border-[var(--border)] py-2 text-sm font-medium text-[var(--text)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim() || submitting}
            className="btn-accent flex-1 rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? '저장 중…' : '저장'}
          </button>
        </div>
      </div>
    </div>
  )
}
