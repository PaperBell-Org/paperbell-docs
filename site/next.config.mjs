import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/**
 * 文档站以子路径的形式挂在主站下：https://paperbell.cn/docs/...
 * 因此 basePath 固定为 /docs，并使用静态导出（服务器上没有 Node，只有 nginx）。
 *
 * @type {import('next').NextConfig}
 */
const config = {
  output: 'export',
  basePath: '/docs',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
