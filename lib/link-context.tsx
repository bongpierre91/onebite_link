'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { Link } from './data'

type NewLinkData = Omit<Link, 'id' | 'createdAt'>
type UpdateLinkData = Pick<Link, 'title' | 'description' | 'folderId'>

type LinkContextType = {
  links: Link[]
  addLink: (data: NewLinkData) => Promise<void>
  deleteLink: (id: string) => void
  updateLink: (id: string, data: UpdateLinkData) => void
}

const LinkContext = createContext<LinkContextType | null>(null)

// Supabase row → UI Link 변환
function toLink(row: Record<string, unknown>): Link {
  const d = new Date(row.created_at as string)
  const createdAt = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  return {
    id: String(row.id),
    url: row.url as string,
    title: (row.title as string) ?? '',
    description: (row.description as string) ?? '',
    thumbnail: (row.thumbnail_url as string) ?? null,
    folderId: row.folder_id ? String(row.folder_id) : '',
    createdAt,
  }
}

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([])

  // Supabase에서 링크 초기 로드 (최신순)
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('link')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) {
          setLinks(data.map(toLink))
        }
      })
  }, [])

  // Supabase에 링크 추가
  async function addLink(data: NewLinkData) {
    const supabase = createClient()
    const { data: inserted, error } = await supabase
      .from('link')
      .insert({
        url: data.url,
        title: data.title || null,
        description: data.description || null,
        thumbnail_url: data.thumbnail,
        folder_id: data.folderId ? parseInt(data.folderId) : null,
      })
      .select('*')
      .single()

    if (!error && inserted) {
      setLinks((prev) => [toLink(inserted), ...prev])
    }
  }

  function deleteLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id))
  }

  function updateLink(id: string, data: UpdateLinkData) {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)))
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error('useLinks must be used within <LinkProvider>')
  return ctx
}
