import { type NextRequest, NextResponse } from 'next/server'

/** HTML 문자열에서 특정 meta 태그의 content 값을 추출 */
function getMetaContent(html: string, attribute: string, value: string): string | null {
  const patterns = [
    // <meta property="og:title" content="...">
    new RegExp(
      `<meta[^>]*${attribute}=["']${value}["'][^>]*content=["']([^"']*?)["']`,
      'i',
    ),
    // <meta content="..." property="og:title">
    new RegExp(
      `<meta[^>]*content=["']([^"']*?)["'][^>]*${attribute}=["']${value}["']`,
      'i',
    ),
  ]
  for (const pattern of patterns) {
    const match = html.match(pattern)
    if (match?.[1]?.trim()) return match[1].trim()
  }
  return null
}

/** 상대 URL → 절대 URL 변환 */
function resolveUrl(base: string, relative: string): string {
  try {
    return new URL(relative, base).toString()
  } catch {
    return relative
  }
}

/** HTML 엔티티 디코딩 */
function decodeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')

  if (!rawUrl) {
    return NextResponse.json({ error: 'url 파라미터가 필요합니다.' }, { status: 400 })
  }

  try {
    const res = await fetch(rawUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    })

    // HTML이 아닌 응답(이미지, PDF 등)은 URL 그대로 반환
    const contentType = res.headers.get('content-type') ?? ''
    if (!contentType.includes('text/html')) {
      const domain = new URL(rawUrl).hostname.replace('www.', '')
      return NextResponse.json({ title: domain, description: '', image: null, url: rawUrl })
    }

    const html = await res.text()

    const title = decodeHtml(
      getMetaContent(html, 'property', 'og:title') ??
        getMetaContent(html, 'name', 'twitter:title') ??
        html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ??
        rawUrl,
    )

    const description = decodeHtml(
      getMetaContent(html, 'property', 'og:description') ??
        getMetaContent(html, 'name', 'description') ??
        getMetaContent(html, 'name', 'twitter:description') ??
        '',
    )

    const rawImage =
      getMetaContent(html, 'property', 'og:image') ??
      getMetaContent(html, 'name', 'twitter:image') ??
      null
    const image = rawImage ? resolveUrl(rawUrl, rawImage) : null

    const url =
      getMetaContent(html, 'property', 'og:url') ?? rawUrl

    return NextResponse.json({ title, description, image, url })
  } catch (err) {
    // 타임아웃, 네트워크 에러 등 — 빈 OG 데이터로 응답
    const domain = (() => {
      try { return new URL(rawUrl).hostname.replace('www.', '') } catch { return rawUrl }
    })()
    console.warn('[og] fetch failed:', rawUrl, err)
    return NextResponse.json({ title: domain, description: '', image: null, url: rawUrl })
  }
}
