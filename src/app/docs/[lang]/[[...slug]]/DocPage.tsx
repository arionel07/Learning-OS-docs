'use client'

import { Breadcrumbs } from '@/components/ui/breadcrumbs/Breadcrumbs'
import { useCopyButton } from '@/components/ui/copy/CopyButton'
import { DocSkeleton } from '@/components/ui/loader/DocSkeleton'
import { PrevNext } from '@/components/ui/prevnext/PrevNext'
import { parseMarkdown } from '@/lib/markdown.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc, TDocsIndex } from '@/types/docs.type'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'

interface IDocPageProps {
	doc: IDoc
	indexEntries: Record<string, IDoc>
	prev: IDoc | null
	next: IDoc | null
}

export default function DocPage({
	next,
	prev,
	doc,
	indexEntries
}: IDocPageProps) {
	// getting language from jotai
	const setLang = useSetAtom(languageAtom)
	const [html, setHtml] = useState<string>('')
	useCopyButton(html)

	//Recovering a Map from a plain object
	const index: TDocsIndex = useMemo(
		() => new Map(Object.entries(indexEntries)),
		[indexEntries]
	)

	// Synchronizing atom language with URL
	useEffect(() => {
		setLang(doc.lang)
	}, [doc.lang, setLang])

	// Pass index and lang to parseMarkdown - wiki links are resolved here
	useEffect(() => {
		let mounted = true
		parseMarkdown(doc.content, index, doc.lang).then(result => {
			if (mounted) setHtml(result)
		})

		return () => {
			mounted = false
		}
	}, [doc.content, index, doc.lang])

	return (
		<div className="min-h-full overflow-y-auto">
			<div className="max-w-3xl mx-auto px-8 py-8">
				{/* Breadcrumbs */}
				<Breadcrumbs
					lang={doc.lang}
					slug={doc.slug}
				/>

				{html === '' ? (
					<DocSkeleton />
				) : (
					<>
						{/* Page header */}
						<div className="mb-8">
							<h1
								className="text-3xl font-bold tracking-tight
                text-zinc-900 dark:text-zinc-100 mb-3"
							>
								{doc.frontmatter.title}
							</h1>

							{doc.frontmatter.description && (
								<p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
									{doc.frontmatter.description}
								</p>
							)}

							{/* Tags */}
							{doc.frontmatter.tags?.length && (
								<div className="flex gap-1.5 mt-3 flex-wrap">
									{doc.frontmatter.tags.map(tag => (
										<span
											key={tag}
											className="text-[11px] px-2 py-0.5 rounded-full font-medium
                        bg-zinc-100 dark:bg-zinc-800
                        text-zinc-500 dark:text-zinc-400
                        border border-zinc-200 dark:border-zinc-700"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>

						{/* Divider */}
						<div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-8" />
						{/* Content */}
						<article
							className="
                text-zinc-700 dark:text-zinc-300

                [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:dark:text-zinc-100
                [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2
                [&_h2]:border-b [&_h2]:border-zinc-100 [&_h2]:dark:border-zinc-800

                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_h3]:dark:text-zinc-100
                [&_h3]:mt-8 [&_h3]:mb-3

                [&_p]:text-sm [&_p]:leading-7 [&_p]:mb-4

                [&_a]:text-zinc-900 [&_a]:dark:text-zinc-100
                [&_a]:underline [&_a]:underline-offset-4
                [&_a]:decoration-zinc-300 [&_a]:dark:decoration-zinc-600
                hover:[&_a]:decoration-zinc-600 dark:hover:[&_a]:decoration-zinc-400

                [&_ul]:my-4 [&_ul]:ml-4 [&_ul]:space-y-1.5 [&_ul]:list-disc
                [&_ol]:my-4 [&_ol]:ml-4 [&_ol]:space-y-1.5 [&_ol]:list-decimal
                [&_li]:text-sm [&_li]:leading-7



                [&_blockquote]:my-4 [&_blockquote]:pl-4
                [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-200 [&_blockquote]:dark:border-zinc-700
                [&_blockquote]:text-zinc-500 [&_blockquote]:dark:text-zinc-400 [&_blockquote]:italic

                [&_hr]:my-8 [&_hr]:border-zinc-100 [&_hr]:dark:border-zinc-800

                [&_table]:w-full [&_table]:text-sm [&_table]:my-4
                [&_thead]:bg-zinc-50 [&_thead]:dark:bg-zinc-800/50
                [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-xs
                [&_th]:font-semibold [&_th]:text-zinc-500 [&_th]:dark:text-zinc-400
                [&_th]:border-b [&_th]:border-zinc-200 [&_th]:dark:border-zinc-700
                [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-xs
                [&_td]:border-b [&_td]:border-zinc-100 [&_td]:dark:border-zinc-800
              "
							dangerouslySetInnerHTML={{ __html: html }}
						/>

						{/* Prev / Next */}
						<PrevNext
							prev={prev}
							next={next}
							lang={doc.lang}
						/>

						{/* Footer */}
						<div
							className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800
              flex items-center justify-between"
						>
							<span className="text-xs text-zinc-400 dark:text-zinc-600">
								{doc.slug.join(' / ')}
							</span>
							<span className="text-xs text-zinc-400 dark:text-zinc-600">
								{doc.lang.toUpperCase()}
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
