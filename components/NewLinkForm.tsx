'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFolders } from '@/lib/folder-context'
import { useLinks } from '@/lib/link-context'

type OgData = {
  title: string
  description: string
  image: string | null
  url: string
}

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState('')
  const [loading, setLoading] = useState(false)

  const { folders } = useFolders()
  const { addLink } = useLinks()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      // OG 정보 수집
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`)
      const og: OgData = await res.json()

      // 링크 저장
      addLink({
        title: og.title || url,
        description: og.description || '',
        url: og.url || url,
        folderId,
        thumbnail: og.image,
      })

      // 폴더가 선택된 경우 해당 폴더 페이지, 아니면 홈으로 이동
      router.push(folderId ? `/folder/${folderId}` : '/')
    } catch {
      // 네트워크 오류 시 URL만으로 저장
      addLink({
        title: url,
        description: '',
        url,
        folderId,
        thumbnail: null,
      })
      router.push(folderId ? `/folder/${folderId}` : '/')
    }
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
              disabled={loading}
              className="input-field w-full rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] placeholder:text-[var(--placeholder)] disabled:opacity-50"
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
              disabled={loading}
              className="input-field w-full rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] disabled:opacity-50"
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
              disabled={loading || !url.trim()}
              className="btn-accent w-full rounded-md bg-[var(--accent)] py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  링크 정보 수집 중...
                </span>
              ) : (
                '저장'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
