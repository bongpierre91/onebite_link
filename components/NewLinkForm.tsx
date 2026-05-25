'use client'

import { useState } from 'react'
import { useFolders } from '@/lib/folder-context'

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState('')
  const { folders } = useFolders()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(
      `저장 완료!\nURL: ${url}\n폴더: ${folders.find((f) => f.id === folderId)?.name ?? '없음'}`,
    )
  }

  return (
    <div className="flex flex-1 items-start justify-center p-10">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
        {/* 폼 제목 */}
        <h2 className="mb-1 text-xl font-semibold text-[var(--text)]">새 링크 추가</h2>
        <p className="mb-6 text-sm text-[var(--text-sub)]">
          저장할 링크 URL과 폴더를 선택하세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* URL 인풋 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
              링크 URL
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="input-field w-full rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] placeholder:text-[var(--placeholder)]"
            />
          </div>

          {/* 폴더 셀렉트 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
              폴더
            </label>
            <select
              id="folder"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)]"
            >
              <option value="">폴더를 선택하세요</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  📁 {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* 저장 버튼 */}
          <div className="pt-1">
            <button
              type="submit"
              className="btn-accent w-full rounded-md bg-[var(--accent)] py-2.5 text-sm font-semibold text-white"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
