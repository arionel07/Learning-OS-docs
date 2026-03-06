'use client'

import { ITocItem } from '@/lib/toc.lib'
import { useEffect, useRef, useState } from 'react'

interface ITocProps {
	items: ITocItem[]
}

export function TableOfContents({ items }: ITocProps) {
	const [activeId, setActiveId] = useState<string>('')
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		if (!items.length) return

		observerRef.current?.disconnect()

		const handleIntersect = (entries: IntersectionObserverEntry[]) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					setActiveId(entry.target.id)
				}
			}
		}

		observerRef.current = new IntersectionObserver(handleIntersect, {
			rootMargin: '-10%, 0%, -80%, 0%',
			threshold: 0
		})

		items.forEach(item => {
			const el = document.getElementById(item.id)
			if (el) observerRef.current!.observe(el)
		})

		return () => observerRef.current?.disconnect()
	}, [])

	if (!items.length) return null

	return (
		<aside className="hidden xl:block w-56 shrink-0 relative">
			<div className="sticky top-24 right-25">
				{/* Title */}
				<p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide mb-3">
					On this page
				</p>

				{/* Divider */}
				<div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-3" />

				{/* Items */}
				<ul className="space-y-1">
					{items.map(item => (
						<li
							key={item.id}
							className="relative"
						>
							{/* Active indicator dot */}
							{activeId === item.id && (
								<span
									className="absolute -left-[22px] top-1/2 -translate-y-1/2
                  w-1.5 h-1.5 rounded-full bg-[#0072f5]"
								/>
							)}
							<a
								href={`#${item.id}`}
								className={`block text-xs leading-5 transition-colors duration-150 ${item.level === 3 ? 'pl-3' : ''} ${activeId === item.id ? 'text-[#0072f5] font-medium' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
								onClick={e => {
									e.preventDefault()
									document
										.getElementById(item.id)
										?.scrollIntoView({ behavior: 'smooth', block: 'start' })
									setActiveId(item.id)
								}}
							>
								{item.text}
							</a>
						</li>
					))}
				</ul>

				{/* Active indicator line */}
				<div className="absolute left-[-10px] top-0 bottom-0 w-px bg-zinc-100 dark:bg-zinc-800" />
			</div>
		</aside>
	)
}
