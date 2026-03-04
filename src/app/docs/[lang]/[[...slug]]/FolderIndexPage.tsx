import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { IDoc } from '@/types/docs.type'
import Link from 'next/link'

interface IFolderIndexPageProps {
	doc: IDoc
	children: IDoc[]
}

export function FolderIndexPage({ doc, children }: IFolderIndexPageProps) {
	return (
		<main className="flex flex-col max-w-5xl mx-auto p-8">
			<Breadcrumbs
				lang={doc.lang}
				slug={doc.slug}
			/>

			<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
				{doc.frontmatter.title}
			</h1>

			{doc.frontmatter.description && (
				<p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">
					{doc.frontmatter.description}
				</p>
			)}

			<div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-8" />

			{/* Cards grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				{children
					.sort(
						(a, b) => (a.frontmatter.order ?? 99) - (b.frontmatter.order ?? 99)
					)
					.map(child => (
						<Link
							key={child.slug.join('/')}
							href={`/docs/${doc.lang}/${child.slug.join('/')}`}
							className="group flex flex-col gap-1 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-150"
						>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">
									{child.frontmatter.title}
								</span>
								{/* Arrow */}
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className=""
								>
									<path d="m9 18 6-6-6-6" />
								</svg>
								{/* <ChevronRight
									className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-150"
									size={12}
								/> */}
							</div>

							{child.frontmatter.description && (
								<span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
									{child.frontmatter.description}
								</span>
							)}

							{/* Tags */}
							{child.frontmatter.tags?.length && (
								<div className="flex gap-1 mt-1 flex-wrap">
									{child.frontmatter.tags.map(tag => (
										<span
											key={tag}
											className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</Link>
					))}
			</div>
		</main>
	)
}
