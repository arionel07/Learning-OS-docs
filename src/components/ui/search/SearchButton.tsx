'use client'

import { IDoc } from '@/types/docs.type'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SearchModal } from './SearchModal'

interface ISearchButtonProps {
	docs: IDoc[]
}

export function SearchButton({ docs }: ISearchButtonProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	// ⌘K / Ctrl+K shortcut
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault()
				setIsOpen(o => !o)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 px-3 h-8 rounded-md text-xs text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-150 w-38 md:w-48 cursor-text"
			>
				{/* Search icon */}
				<Search size={13} />
				<span className="flex-1 text-left">Search...</span>

				{/* Keyboard shortcut badge */}
				<kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-zinc-400 dark:text-zinc-600">
					<span className="text-xs">⌘</span>k
				</kbd>
			</button>
			{isOpen && (
				<SearchModal
					docs={docs}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</>
	)
}
