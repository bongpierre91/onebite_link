'use client'

import { useState } from 'react'
import { folders } from '@/lib/data'

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 저장 API 연동
    alert(`저장 완료!\nURL: ${url}\n폴더: ${folders.find((f) => f.id === folderId)?.name ?? '없음'}`)
  }

  return (
    <div className="flex flex-1 items-start justify-center p-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-lg font-bold text-gray-900">새 링크 추가</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* URL 인풋 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">
              링크 URL
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* 폴더 셀렉트 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder"
              className="text-sm font-medium text-gray-700"
            >
              폴더
            </label>
            <select
              id="folder"
              value={folderId}
              onChange={(e) => setFolderId(e.target.value)}
              className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
          >
            저장
          </button>
        </form>
      </div>
    </div>
  )
}
