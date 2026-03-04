'use client'

import { buildSearchIndex, searchDocs } from '@/lib/search.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc, ISearchResult } from '@/types/docs.type'
import { useAtomValue } from 'jotai'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface ISearchModalProps {
	onClose: () => void
	docs: IDoc[]
}

export function SearchModal({ onClose, docs }: ISearchModalProps) {
	const [query, setQuery] = useState('')
	const [selected, setSelected] = useState(0)
	const lang = useAtomValue(languageAtom)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	// Build Fuse index from docs
	const index = useMemo(() => buildSearchIndex(docs), [docs])

	// Search results
	const results: ISearchResult[] = useMemo(
		() => searchDocs(index, query),
		[index, query]
	)

	// Auto-focus input
	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	// Reset selection when results change
	useEffect(() => {
		setSelected(0)
	}, [results])

	// Close on Escape, navigate with arrows + enter
	useEffect(() => {
		const handleKeyDow = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			} else if (e.key === 'ArrowDown') {
				e.preventDefault()
				setSelected(i => Math.min(i + 1, results.length - 1))
			} else if (e.key === 'ArrowUp') {
				e.preventDefault()
				setSelected(i => Math.max(i - 1, 0))
			} else if (e.key === 'Enter' && results[selected]) {
				e.preventDefault()
				router.push(`/docs/${lang}/${results[selected].slug.join('/')}`)
				onClose()
			}
		}

		window.addEventListener('keydown', handleKeyDow)
		return () => window.removeEventListener('keydown', handleKeyDow)
	}, [results, selected, lang, onClose, router])

	return createPortal(
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-99 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed left-1/2 top-24 z-100 w-full max-w-xl -translate-x-1/2 px-4">
				<div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
					{/* Input */}
					<div className="flex items-center gap-3 px-4 border-b border-zinc-100 dark:border-zinc-800">
						<Search size={15} />

						<input
							ref={inputRef}
							value={query}
							onChange={e => setQuery(e.target.value)}
							placeholder="Search docs..."
							className="flex-1 h-12 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none"
						/>

						<kbd
							onClick={onClose}
							className="text-[10px] px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
						>
							Esc
						</kbd>
					</div>

					{/* Results */}
					<ul className="max-h-80 overflow-y-auto py-2">
						{query === '' && (
							<li className="px-4 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
								Start trying to search...
							</li>
						)}

						{query !== '' && results.length === 0 && (
							<li className="px-4 py-8 text-center text-sm text-zinc-400 dark:text-zinc-600">
								No results for{' '}
								<span className="text-zinc-900 dark:text-zinc-100">
									{query}
								</span>
							</li>
						)}

						{results.map((result, i) => (
							<li key={result.slug.join('/')}>
								<Link
									href={`/docs/${lang}/${result.slug.join('/')}`}
									onClick={onClose}
									className={`flex flex-col gap-0.5 px-4 py-2.5 transition-colors ${i === selected ? 'bg-zinc-100 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
									onMouseEnter={() => setSelected(i)}
								>
									<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
										{result.title}
									</span>
									<span className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
										{result.excerpt}
									</span>
								</Link>
							</li>
						))}
					</ul>

					{/* Footer */}
					{results.length > 0 && (
						<div
							className="flex items-center gap-3 px-4 py-2 border-t border-zinc-100
              dark:border-zinc-800 text-[10px] text-zinc-400 dark:text-zinc-600"
						>
							<span>
								<kbd className="font-sans">↑↓</kbd> navigate
							</span>
							<span>
								<kbd className="font-sans">↵</kbd> open
							</span>
							<span>
								<kbd className="font-sans">Esc</kbd> close
							</span>
						</div>
					)}
				</div>
			</div>
		</>,
		document.body
	)
}
