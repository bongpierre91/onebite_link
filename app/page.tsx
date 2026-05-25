import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import LinkGrid from '@/components/LinkGrid'

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      {/* 상단 헤더 */}
      <Header />

      {/* 본문: 사이드바 + 메인 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 사이드바 */}
        <Sidebar />

        {/* 메인 섹션 */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg)]">
          <LinkGrid />
        </main>
      </div>
    </div>
  )
}
