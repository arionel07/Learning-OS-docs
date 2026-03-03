'use client'

import { DocSkeleton } from '@/components/ui/loader/DocSkeleton'
import { parseMarkdown } from '@/lib/markdown.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc, TDocsIndex } from '@/types/docs.type'
import { useSetAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'

interface IDocPageProps {
	doc: IDoc
	indexEntries: Record<string, IDoc>
}

export default function DocPage({ doc, indexEntries }: IDocPageProps) {
	// getting language from jotai
	const setLang = useSetAtom(languageAtom)
	const [html, setHtml] = useState<string>('')

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
		<main className="flex flex-col max-w-5xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{doc.frontmatter.title}</h1>
			{html === '' ? (
				<DocSkeleton />
			) : (
				<article
					className="prose prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)}
		</main>
	)
}
