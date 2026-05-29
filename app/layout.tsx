import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { FolderProvider } from '@/lib/folder-context'
import { LinkProvider } from '@/lib/link-context'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | 한입 링크',
    default: '한입 링크',
  },
  description: '내 링크를 깔끔하게 정리하세요',
  openGraph: {
    title: '한입 링크',
    description: '내 링크를 깔끔하게 정리하세요',
    siteName: '한입 링크',
    images: [{ url: '/thumbnail.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '한입 링크',
    description: '내 링크를 깔끔하게 정리하세요',
    images: ['/thumbnail.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-[var(--bg)] text-[var(--text)]">
        <FolderProvider>
          <LinkProvider>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  )
}
