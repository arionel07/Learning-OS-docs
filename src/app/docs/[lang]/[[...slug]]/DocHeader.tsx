import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { IDoc } from '@/types/docs.type'

export function DocHeader({ doc }: { doc: IDoc }) {
	return (
		<>
			<Breadcrumbs
				lang={doc.lang}
				slug={doc.slug}
			/>

			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
					{doc.frontmatter.title}
				</h1>

				{doc.frontmatter.description && (
					<p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
						{doc.frontmatter.description}
					</p>
				)}

				{doc.frontmatter.tags?.length && (
					<div className="flex gap-1.5 mt-3 flex-wrap">
						{doc.frontmatter.tags.map(tag => (
							<span
								key={tag}
								className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-8" />
		</>
	)
}
