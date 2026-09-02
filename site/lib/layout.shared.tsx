import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { repoUrl, siteUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2.5 text-[18px] font-bold tracking-[-0.01em]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/docs/logo.png" alt="PaperBell" width={27} height={27} className="pb-mark" />
          <span>PaperBell</span>
          <span className="text-fd-muted-foreground text-[15px] font-normal">文档</span>
        </span>
      ),
      url: siteUrl,
    },
    links: [
      {
        text: '主站',
        url: siteUrl,
        external: true,
      },
      {
        text: '价格',
        url: `${siteUrl}/pricing`,
        external: true,
      },
    ],
    githubUrl: repoUrl,
  };
}
