import Link from 'next/link'

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800"
    >
      <span className="text-lg leading-none">+</span>
      새 링크
    </Link>
  )
}
