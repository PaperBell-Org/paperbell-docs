#!/usr/bin/env bash
#
# 构建并发布 PaperBell 文档站到生产服务器。
#
#   bash scripts/deploy.sh
#
# 一般不需要手动跑：推送到 main 后 GitHub Actions 会自动构建并同步
# （.github/workflows/deploy-docs.yml）。这个脚本留作应急或本地验证。
#
# 做的事情：
#   1. 由仓库根目录下的 markdown 重新生成 content/docs
#   2. next build（静态导出到 out/）
#   3. 打包上传，服务器上原子替换 /www/wwwroot/paperbell-docs/docs
#
# nginx 配置一次性写好了，发布时不需要动：
#   /www/server/panel/vhost/nginx/snippets/paperbell-docs.conf
#   由 extension/{next.paperbell.cn,main}/paperbell-docs.conf 各 include 一次
#
set -euo pipefail

SSH_HOST=${SSH_HOST:-Tecent-Paperbelll}
REMOTE_DIR=/www/wwwroot/paperbell-docs
SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$SITE_DIR"

echo "==> 1/4 生成 MDX 内容"
node scripts/build-content.mjs

echo "==> 2/4 构建静态站点"
pnpm build

echo "==> 3/4 打包上传"
rm -f docs-dist.tar.gz
tar -czf docs-dist.tar.gz -C out .
ls -lh docs-dist.tar.gz
scp -o ConnectTimeout=20 docs-dist.tar.gz "$SSH_HOST:/tmp/docs-dist.tar.gz"

echo "==> 4/4 服务器上原子替换"
ssh -o ConnectTimeout=20 "$SSH_HOST" "set -e
rm -rf $REMOTE_DIR/docs.new
mkdir -p $REMOTE_DIR/docs.new
tar -xzf /tmp/docs-dist.tar.gz -C $REMOTE_DIR/docs.new
chown -R www:www $REMOTE_DIR/docs.new
find $REMOTE_DIR/docs.new -type d -exec chmod 755 {} +
find $REMOTE_DIR/docs.new -type f -exec chmod 644 {} +
rm -rf $REMOTE_DIR/docs.old
[ -d $REMOTE_DIR/docs ] && mv $REMOTE_DIR/docs $REMOTE_DIR/docs.old
mv $REMOTE_DIR/docs.new $REMOTE_DIR/docs
rm -rf $REMOTE_DIR/docs.old /tmp/docs-dist.tar.gz
du -sh $REMOTE_DIR/docs"

echo "==> 验证"
for u in https://paperbell.cn/docs/ https://next.paperbell.cn/docs/; do
  printf '%-40s ' "$u"
  curl -s -o /dev/null -w 'status=%{http_code}\n' "$u"
done

echo "完成：https://paperbell.cn/docs/"
