'use client'

import { useEffect, useState } from 'react'
import { useLinks } from '@/lib/link-context'

type Props = {
  linkId: string
  linkTitle: string
  onClose: () => void
}

export default function DeleteLinkModal({ linkId, linkTitle, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const { deleteLink } = useLinks()

  // Escape 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleDelete() {
    if (submitting) return
    setSubmitting(true)
    await deleteLink(linkId)
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
        <div className="mb-1 flex items-center gap-2">
          <span className="text-lg">🗑️</span>
          <h2 className="text-base font-semibold text-[var(--text)]">링크 삭제</h2>
        </div>

        {/* 안내 문구 */}
        <p className="mb-5 mt-2 text-sm text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{linkTitle}</span> 링크를
          삭제하시겠습니까?
          <br />
          이 작업은 되돌릴 수 없습니다.
        </p>

        {/* 취소 / 삭제 버튼 — 동일 크기 */}
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
            onClick={handleDelete}
            disabled={submitting}
            className="btn-danger flex-1 rounded-md bg-[var(--error)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? '삭제 중…' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  )
}
