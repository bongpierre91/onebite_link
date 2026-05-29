import type { Metadata } from 'next'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'

export const metadata: Metadata = {
  title: '폴더',
}

export default async function FolderPage(props: PageProps<'/folder/[folderId]'>) {
  const { folderId } = await props.params

  return (
    <div className="flex h-full flex-col">
      {/* 인덱스와 동일한 헤더 */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* 인덱스와 동일한 사이드바 */}
        <Sidebar />

        {/* 메인: 해당 폴더의 링크 그리드 */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <LinkGrid folderId={folderId} />
        </main>
      </div>
    </div>
  )
}
