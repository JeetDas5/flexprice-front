import { cn } from '@/lib/utils';

/**
 * A placeholder component used to display a loading state for content.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn('animate-pulse rounded-[6px] bg-muted', className)} {...props} />;
}

export { Skeleton };
