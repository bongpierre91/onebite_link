import NewLinkButton from './NewLinkButton'

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      {/* 좌측: 텍스트 로고 */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">🔗</span>
        <h1 className="text-xl font-bold tracking-tight text-blue-600">
          한입 링크
        </h1>
      </div>

      {/* 우측: 새 링크 버튼 */}
      <NewLinkButton />
    </header>
  )
}
