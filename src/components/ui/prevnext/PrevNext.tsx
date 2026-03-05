import { IDoc, TLanguage } from '@/types/docs.type'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface IPrevNextProps {
	prev: IDoc | null
	next: IDoc | null
	lang: TLanguage
}

export function PrevNext({ prev, next, lang }: IPrevNextProps) {
	if (!prev && !next) return null

	return (
		<div className="flex items-stretch gap-3 mt-12 pt-6 border-t border-zinc-300 dark:border-zinc-800">
			{/* Prev */}
			<div className="flex-1">
				{prev && (
					<Link
						href={`/docs/${lang}/${prev.slug.join('/')}`}
						className='group flex flex-col gap-1 p-4 h-full rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-150"'
					>
						<span className="flex items-center gap-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">
							<ChevronLeft
								size={12}
								className="group-hover:-translate-x-0.5 transition-transform duration-150"
							/>
							Previous
						</span>
						<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
							{prev.frontmatter.title}
						</span>
						{prev.frontmatter.description && (
							<span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
								{prev.frontmatter.description}
							</span>
						)}
					</Link>
				)}
			</div>

			{/* Next */}
			<div className="flex-1">
				{next && (
					<Link
						href={`/docs/${lang}/${next.slug.join('/')}`}
						className="group flex flex-col gap-1 p-4 h-full rounded-lg border
              border-zinc-200 dark:border-zinc-700
              hover:border-zinc-300 dark:hover:border-zinc-600
              hover:bg-zinc-50 dark:hover:bg-zinc-800/50
              transition-all duration-150 items-end text-right"
					>
						<span
							className="flex items-center gap-1 text-[10px] font-medium
              text-zinc-400 dark:text-zinc-500 uppercase tracking-wide"
						>
							Next
							<ChevronRight
								size={12}
								className="group-hover:translate-x-0.5 transition-transform duration-150"
							/>
						</span>
						<span
							className="text-sm font-medium text-zinc-900 dark:text-zinc-100
              group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
						>
							{next.frontmatter.title}
						</span>
						{next.frontmatter.description && (
							<span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
								{next.frontmatter.description}
							</span>
						)}
					</Link>
				)}
			</div>
		</div>
	)
}
