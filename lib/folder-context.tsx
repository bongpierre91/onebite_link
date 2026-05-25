'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { folders as initialFolders, type Folder } from './data'

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => void
  renameFolder: (id: string, newName: string) => void
  deleteFolder: (id: string) => void
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

  function renameFolder(id: string, newName: string) {
    setFolders((prev) =>
      prev.map((f) => (f.id === id ? { ...f, name: newName.trim() } : f)),
    )
  }

  function deleteFolder(id: string) {
    setFolders((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, renameFolder, deleteFolder }}>
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FolderContext)
  if (!ctx) throw new Error('useFolders must be used within <FolderProvider>')
  return ctx
}
