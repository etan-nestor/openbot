import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * If true, the skeleton will animate with a subtle pulse
   * @default true
   */
  animate?: boolean
  /**
   * Custom animation duration in milliseconds
   * @default 1500
   */
  animationDuration?: number
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      animate = true,
      animationDuration = 1500,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-800 rounded-md',
          animate && 'animate-pulse',
          className
        )}
        style={
          animate
            ? {
                animationDuration: `${animationDuration}ms`,
              }
            : undefined
        }
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }