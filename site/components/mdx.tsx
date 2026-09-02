import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Download, Video } from '@/components/media';
import { Callout } from '@/components/callout';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // 覆盖默认 Callout：去掉内部那根与卡片边框重复的悬空竖线
    Callout,
    Download,
    Video,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
