'use client'

import { useState } from 'react'
import NewFolderModal from './NewFolderModal'

export default function NewFolderButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-secondary flex items-center gap-1.5 rounded-md border border-[var(--border)] px-3.5 py-1.5 text-sm font-medium text-[var(--text)]"
      >
        <span className="text-base leading-none">+</span>
        새 폴더
      </button>

      {isOpen && <NewFolderModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
