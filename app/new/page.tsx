import type { Metadata } from 'next'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import NewLinkForm from '@/components/NewLinkForm'

export const metadata: Metadata = {
  title: '링크 추가',
}

export default function NewPage() {
  return (
    <div className="flex h-full flex-col">
      {/* 인덱스와 동일한 헤더 */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 인덱스와 동일한 사이드바 */}
        <Sidebar />

        {/* 메인: 새 링크 폼 */}
        <main className="flex flex-1 overflow-y-auto bg-[var(--bg)]">
          <NewLinkForm />
        </main>
      </div>
    </div>
  )
}
