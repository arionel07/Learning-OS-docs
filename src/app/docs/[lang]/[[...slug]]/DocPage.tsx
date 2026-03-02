'use client'

import { parseMarkdown } from '@/lib/markdown.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc } from '@/types/docs.type'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

interface IDocPageProps {
	doc: IDoc
}

export default function DocPage({ doc }: IDocPageProps) {
	// getting language from jotai
	const setLang = useSetAtom(languageAtom)
	const [html, setHtml] = useState<string>('')

	// Synchronizing atom language with URL
	useEffect(() => {
		setLang(doc.lang)
	}, [doc.lang, setLang])

	// Parse Markdown into HTML
	useEffect(() => {
		let mounted = true
		parseMarkdown(doc.content).then(result => {
			if (mounted) setHtml(result)
		})

		return () => {
			mounted = false
		}
	}, [doc.content])

	return (
		<main className="flex flex-col max-w-5xl mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">{doc.frontmatter.title}</h1>
			{html === '' ? (
				<div className="animate-pulse space-y-3">
					<div className="h-4 bg-gray-400 rounded w-3/4" />
					<div className="h-4 bg-gray-400 rounded w-1/2" />
					<div className="h-4 bg-gray-400 rounded w-5/6" />
				</div>
			) : (
				<article
					className="prose prose-invert max-w-none"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			)}
		</main>
	)
}
