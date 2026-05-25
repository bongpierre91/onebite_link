'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { mockLinks, type Link } from './data'

type NewLinkData = Omit<Link, 'id' | 'createdAt'>

type LinkContextType = {
  links: Link[]
  addLink: (data: NewLinkData) => void
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
    // 최신 링크가 맨 앞으로
    setLinks((prev) => [newLink, ...prev])
  }

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error('useLinks must be used within <LinkProvider>')
  return ctx
}
