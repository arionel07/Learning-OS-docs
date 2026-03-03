'use client'

import { buildSearchIndex, ISearchResult, searchDocs } from '@/lib/search.lib'
import { languageAtom } from '@/store/language.store'
import { IDoc } from '@/types/docs.type'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

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
	const results: ISearchResult[] = useMemo(() => searchDocs(index, query))

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

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			{/* Modal */}
			<div className="">
				<div className="">
					<div className="">
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-zinc-400 shrink-0"
						>
							<circle
								cx="11"
								cy="11"
								r="8"
							/>
							<path d="m21 21-4.35-4.35" />
						</svg>
					</div>
				</div>
			</div>
			{/* Input */}

			{/* Results */}

			{/* Footer */}
		</>
	)
}
