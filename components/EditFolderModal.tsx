'use client'

import { useState, useEffect, useRef } from 'react'
import { useFolders } from '@/lib/folder-context'
import type { Folder } from '@/lib/data'

type Props = {
  folder: Folder
  onClose: () => void
}

export default function EditFolderModal({ folder, onClose }: Props) {
  const [name, setName] = useState(folder.name)
  const { renameFolder } = useFolders()
  const inputRef = useRef<HTMLInputElement>(null)

  // 열리면 인풋에 포커스 + 전체 선택
  useEffect(() => {
    const input = inputRef.current
    if (!input) return
    input.focus()
    input.select()
  }, [])

  // Escape 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function handleSave() {
    const trimmed = name.trim()
    if (!trimmed || trimmed === folder.name) {
      onClose()
      return
    }
    renameFolder(folder.id, trimmed)
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
        <h2 className="mb-5 text-base font-semibold text-[var(--text)]">폴더 이름 수정</h2>

        {/* 폴더 이름 인풋 */}
        <div className="mb-5 flex flex-col gap-1.5">
          <label htmlFor="edit-folder-name" className="text-sm font-medium text-[var(--text)]">
            폴더 이름
          </label>
          <input
            ref={inputRef}
            id="edit-folder-name"
            type="text"
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
