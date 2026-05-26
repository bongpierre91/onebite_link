'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { Folder } from './data'

type FolderContextType = {
  folders: Folder[]
  addFolder: (name: string) => Promise<void>
  renameFolder: (id: string, newName: string) => Promise<void>
  deleteFolder: (id: string) => Promise<void>
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([])

  // Supabase에서 폴더 목록 초기 로드
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('folder')
      .select('id, name')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) {
          setFolders(data.map((f) => ({ id: String(f.id), name: f.name })))
        }
      })
  }, [])

  // Supabase에 폴더 추가
  async function addFolder(name: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('folder')
      .insert({ name: name.trim() })
      .select('id, name')
      .single()

    if (!error && data) {
      setFolders((prev) => [...prev, { id: String(data.id), name: data.name }])
    }
  }

  async function renameFolder(id: string, newName: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('folder')
      .update({ name: newName.trim() })
      .eq('id', id)

    if (!error) {
      setFolders((prev) =>
        prev.map((f) => (f.id === id ? { ...f, name: newName.trim() } : f)),
      )
    }
  }

  async function deleteFolder(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('folder')
      .delete()
      .eq('id', id)

    if (!error) {
      setFolders((prev) => prev.filter((f) => f.id !== id))
    }
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
