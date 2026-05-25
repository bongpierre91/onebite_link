'use client'

import { useState, useEffect, useRef } from 'react'
import { useFolders } from '@/lib/folder-context'

type Props = {
  onClose: () => void
}

export default function NewFolderModal({ onClose }: Props) {
  const [name, setName] = useState('')
  const { addFolder } = useFolders()
  const inputRef = useRef<HTMLInputElement>(null)

  // 열리면 인풋에 포커스
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // 전역 Escape 키 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSave() {
    if (!name.trim()) return
    addFolder(name)
    onClose()
  }

  return (
    /* 오버레이 — 클릭 시 닫기 */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* 모달 카드 — 클릭 전파 차단 */}
      <div
        className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-5 text-base font-semibold text-[var(--text)]">새 폴더</h2>

        {/* 폴더 이름 인풋 */}
        <div className="mb-5 flex flex-col gap-1.5">
          <label htmlFor="folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="folder-name"
            type="text"
            placeholder="폴더 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="input-field w-full rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
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
            disabled={!name.trim()}
            className="btn-accent flex-1 rounded-md bg-[var(--accent)] py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
