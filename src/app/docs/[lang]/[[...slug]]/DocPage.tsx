'use client'

import { useCopyButton } from '@/components/ui/copy/CopyButton'
import { DocSkeleton } from '@/components/ui/loader/DocSkeleton'
import { PrevNext } from '@/components/ui/prevnext/PrevNext'
import { TableOfContents } from '@/components/ui/toc/TableOfContents'
import { parseMarkdown } from '@/lib/markdown.lib'
import { extractToc, injectHeadingIds, ITocItem } from '@/lib/toc.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc, TDocsIndex } from '@/types/docs.type'
import { useSetAtom } from 'jotai'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { DocContent } from './DocContent'
import { DocHeader } from './DocHeader'

interface IDocPageProps {
	doc: IDoc
	indexEntries: Record<string, IDoc>
	prev: IDoc | null
	next: IDoc | null
	mdxContent?: ReactNode
}

export default function DocPage({
	next,
	prev,
	doc,
	indexEntries,
	mdxContent
}: IDocPageProps) {
	// getting language from jotai
	const setLang = useSetAtom(languageAtom)
	const [html, setHtml] = useState<string>('')
	const [toc, setToc] = useState<ITocItem[]>([])
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
			if (mounted) {
				const witIds = injectHeadingIds(result)
				setHtml(witIds)
				setToc(extractToc(witIds))
			}
		})

		return () => {
			mounted = false
		}
	}, [doc.content, index, doc.lang])

	return (
		<div className="min-h-full">
			<div className="max-w-5xl mx-auto px-8 py-8 flex gap-12">
				{/* Main content */}
				<div className="flex-1 min-w-0">
					{html === '' ? (
						<DocSkeleton />
					) : (
						<>
							<DocHeader doc={doc} />
							{mdxContent ? mdxContent : <DocContent html={html} />}
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

				{/* TOC */}
				<TableOfContents items={toc} />
			</div>
		</div>
	)
}
