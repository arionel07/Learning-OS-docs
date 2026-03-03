const Shimmer = ({ className }: { className: string }) => (
	<div
		className={`relative overflow-hidden rounded-md bg-zinc-300/90 dark:bg-zinc-800 ${className}`}
	>
		<div className="shimmer-wave absolute inset-0" />
	</div>
)

export function DocSkeleton() {
	return (
		<>
			<style>{`
        .shimmer-wave {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer-move 1.6s ease-in-out infinite;
        }
        @keyframes shimmer-move {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

			<main className="flex flex-col max-w-6xl py-4">
				{/* Breadcrumb */}
				<div className="flex items-center gap-2 mb-6">
					<Shimmer className="h-3.5 w-16" />
					<span className="text-zinc-400 dark:text-zinc-600 text-xs">/</span>
					<Shimmer className="h-3.5 w-24" />
				</div>

				{/* Title */}
				<Shimmer className="h-9 w-2/5 mb-3" />

				{/* Description */}
				<Shimmer className="h-4 w-3/5 mb-8" />

				{/* Divider */}
				<div className="h-px bg-zinc-300 dark:bg-zinc-800 mb-8" />

				{/* Paragraph 1 */}
				<div className="space-y-2.5 mb-6">
					<Shimmer className="h-3.5 w-full" />
					<Shimmer className="h-3.5 w-full" />
					<Shimmer className="h-3.5 w-4/5" />
				</div>

				{/* Paragraph 2 */}
				<div className="space-y-2.5 mb-6">
					<Shimmer className="h-3.5 w-full" />
					<Shimmer className="h-3.5 w-11/12" />
					<Shimmer className="h-3.5 w-3/5" />
				</div>

				{/* Code block */}
				<Shimmer className="h-28 w-full mb-6 rounded-lg" />

				{/* Paragraph 3 */}
				<div className="space-y-2.5 mb-6">
					<Shimmer className="h-3.5 w-full" />
					<Shimmer className="h-3.5 w-5/6" />
					<Shimmer className="h-3.5 w-4/5" />
					<Shimmer className="h-3.5 w-2/3" />
				</div>

				{/* Subheading */}
				<Shimmer className="h-6 w-1/4 mb-4" />

				{/* Paragraph 4 */}
				<div className="space-y-2.5">
					<Shimmer className="h-3.5 w-full" />
					<Shimmer className="h-3.5 w-11/12" />
					<Shimmer className="h-3.5 w-3/4" />
				</div>
			</main>
		</>
	)
}
