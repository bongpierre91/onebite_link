import Link from 'next/link'

export default function NewLinkButton() {
  return (
    <Link
      href="/new"
      className="btn-accent flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3.5 py-1.5 text-sm font-medium text-white"
    >
      <span className="text-base leading-none">+</span>
      새 링크
    </Link>
  )
}
