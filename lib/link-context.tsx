'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { mockLinks, type Link } from './data'

type NewLinkData = Omit<Link, 'id' | 'createdAt'>
type UpdateLinkData = Pick<Link, 'title' | 'description' | 'folderId'>

type LinkContextType = {
  links: Link[]
  addLink: (data: NewLinkData) => void
  deleteLink: (id: string) => void
  updateLink: (id: string, data: UpdateLinkData) => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>(mockLinks)

  function addLink(data: NewLinkData) {
    const today = new Date()
    const createdAt = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`
    const newLink: Link = {
      id: String(Date.now()),
      createdAt,
      ...data,
    }
    setLinks((prev) => [newLink, ...prev])
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
