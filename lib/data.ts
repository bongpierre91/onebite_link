export type Folder = {
  id: string
  name: string
  count: number
}

export type Link = {
  id: string
  title: string
  description: string
  url: string
  folderId: string
  createdAt: string
}

export const folders: Folder[] = [
  { id: '1', name: '개발', count: 4 },
  { id: '2', name: '디자인', count: 2 },
  { id: '3', name: 'AI/ML', count: 2 },
  { id: '4', name: '뉴스', count: 0 },
  { id: '5', name: '학습', count: 1 },
]

export const mockLinks: Link[] = [
  {
    id: '1',
    title: 'Next.js 공식 문서',
    description:
      'Next.js는 풀스택 웹 애플리케이션을 구축하기 위한 React 프레임워크입니다. 사용자 인터페이스를 React 컴포넌트로 만들고, Next.js가 추가 기능과 최적화를 처리합니다.',
    url: 'https://nextjs.org',
    folderId: '1',
    createdAt: '2026.05.20',
  },
  {
    id: '2',
    title: 'Tailwind CSS',
    description:
      '유틸리티 퍼스트 CSS 프레임워크로, 클래스를 직접 HTML에 작성해 빠르게 커스텀 디자인을 구현할 수 있습니다.',
    url: 'https://tailwindcss.com',
    folderId: '1',
    createdAt: '2026.05.19',
  },
  {
    id: '3',
    title: 'Figma 디자인 시스템',
    description:
      'Figma는 UI/UX 디자인 협업 툴입니다. 팀과 함께 실시간으로 디자인을 만들고 공유할 수 있습니다.',
    url: 'https://figma.com',
    folderId: '2',
    createdAt: '2026.05.18',
  },
  {
    id: '4',
    title: 'OpenAI 플랫폼',
    description:
      'GPT-4, DALL·E 등 최신 AI 모델 API를 제공합니다. 텍스트, 이미지, 음성 생성 등 다양한 AI 기능을 애플리케이션에 통합할 수 있습니다.',
    url: 'https://platform.openai.com',
    folderId: '3',
    createdAt: '2026.05.17',
  },
  {
    id: '5',
    title: 'GitHub',
    description:
      '세계 최대 코드 호스팅 플랫폼으로, 버전 관리와 협업을 위한 Git 저장소를 제공합니다.',
    url: 'https://github.com',
    folderId: '1',
    createdAt: '2026.05.16',
  },
  {
    id: '6',
    title: 'Vercel',
    description:
      'Next.js 제작사의 클라우드 플랫폼으로, 프론트엔드 앱을 손쉽게 배포하고 확장할 수 있습니다.',
    url: 'https://vercel.com',
    folderId: '1',
    createdAt: '2026.05.15',
  },
  {
    id: '7',
    title: 'Hugging Face',
    description:
      'AI 모델 허브로, 수십만 개의 사전 학습 모델과 데이터셋을 공유하고 사용할 수 있는 커뮤니티 플랫폼입니다.',
    url: 'https://huggingface.co',
    folderId: '3',
    createdAt: '2026.05.14',
  },
  {
    id: '8',
    title: 'MDN Web Docs',
    description:
      'Mozilla의 공식 웹 개발 문서 사이트로, HTML, CSS, JavaScript에 대한 포괄적인 레퍼런스와 튜토리얼을 제공합니다.',
    url: 'https://developer.mozilla.org',
    folderId: '5',
    createdAt: '2026.05.13',
  },
  {
    id: '9',
    title: 'Dribbble',
    description:
      '전 세계 디자이너들이 자신의 작업물을 공유하는 포트폴리오 커뮤니티. UI/UX 디자인 영감을 얻기에 최적의 공간입니다.',
    url: 'https://dribbble.com',
    folderId: '2',
    createdAt: '2026.05.12',
  },
]
