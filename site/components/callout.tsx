import { cn } from '@/lib/cn';
import { CircleCheck, CircleX, Info, Lightbulb, TriangleAlert } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

/**
 * 覆盖 fumadocs 默认的 Callout。
 *
 * 默认实现是「卡片 + 内部一根 w-0.5 的半透明圆角竖线」，而卡片本身已经有
 * 边框把区域圈出来了，竖线属于重复的分隔；它又被容器的 ps-1 顶出约 4px
 * 缝隙，看着像浮在里面的一道多余装饰。
 *
 * 这里换成一小段贴着左边缘、垂直居中的强调条：不走满整条边，也就不必跟着
 * 圆角拐弯。区域只由卡片界定一次，类型靠这一小段颜色和图标传达。
 */
type CalloutType = 'info' | 'idea' | 'success' | 'warning' | 'error';

const ICONS: Record<CalloutType, typeof Info> = {
  info: Info,
  idea: Lightbulb,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
};

// warn / tip 是 fumadocs 里的别名，保持兼容
function resolveType(type: string): CalloutType {
  if (type === 'warn') return 'warning';
  if (type === 'tip') return 'idea';
  return (type in ICONS ? type : 'info') as CalloutType;
}

export interface CalloutProps extends Omit<ComponentProps<'div'>, 'title'> {
  type?: string;
  title?: ReactNode;
  icon?: ReactNode;
}

export function Callout({
  type = 'info',
  title,
  icon,
  children,
  className,
  style,
  ...props
}: CalloutProps) {
  const resolved = resolveType(type);
  const Icon = ICONS[resolved];

  return (
    <div
      className={cn(
        'relative my-4 flex gap-2.5 rounded-xl border',
        'bg-fd-card p-3 text-sm text-fd-card-foreground shadow-sm',
        className,
      )}
      style={
        {
          '--callout-color': `var(--color-fd-${resolved}, var(--color-fd-muted))`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* 短强调条：start-[-1px] 盖住卡片那 1px 边框，读起来就是边缘本身的一段 */}
      <span
        aria-hidden="true"
        className="absolute start-[-1px] top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-(--callout-color)"
      />
      {icon ?? (
        <Icon
          className={cn(
            'size-5 shrink-0',
            // idea 用线框灯泡，其余用实心图标配卡片色字形，与 fumadocs 默认观感一致
            resolved === 'idea'
              ? 'fill-(--callout-color) text-(--callout-color)'
              : 'fill-(--callout-color) text-fd-card',
          )}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {title ? <p className="my-0! font-medium">{title}</p> : null}
        <div className="prose-no-margin text-fd-muted-foreground empty:hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
