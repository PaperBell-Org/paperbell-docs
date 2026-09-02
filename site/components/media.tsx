import { basePath } from '@/lib/shared';

function withBase(src: string) {
  return src.startsWith('/') ? `${basePath}${src}` : src;
}

/**
 * 附件下载链接（pdf / docx / lua 等）。
 * 用普通 <a> 而不是 next/link，避免静态导出下走客户端路由。
 */
export function Download({
  href,
  name,
  children,
}: {
  href: string;
  name?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={withBase(href)}
      download={name}
      className="inline-flex items-center gap-1.5 font-medium text-fd-primary underline underline-offset-4 decoration-fd-primary/40 hover:decoration-fd-primary"
    >
      {children ?? name ?? '下载附件'}
    </a>
  );
}

/** 文档内嵌视频。 */
export function Video({ src, poster }: { src: string; poster?: string }) {
  return (
    <video
      controls
      preload="metadata"
      playsInline
      poster={poster ? withBase(poster) : undefined}
      className="my-6 w-full rounded-lg border border-fd-border"
    >
      <source src={withBase(src)} />
      你的浏览器不支持 video 标签。
    </video>
  );
}
