'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { folders as initialFolders, type Folder } from './data'

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)

  function addFolder(name: string) {
    const newFolder: Folder = {
      id: String(Date.now()),
      name: name.trim(),
      count: 0,
    }
    setFolders((prev) => [...prev, newFolder])
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FolderContext)
  if (!ctx) throw new Error('useFolders must be used within <FolderProvider>')
  return ctx
}
