'use client'
import { ITabsProps } from '@/types/docs.type'
import { Children, ReactNode, useState } from 'react'

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function Tabs({ items, children }: ITabsProps) {
	const [active, setActive] = useState(0)

	// Each direct child = one tab panel
	const panels = Children.toArray(children)
	return (
		<div className="my-4 rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
			{/* Tab bar */}
			<div className="">
				{items.map((item, i) => (
					<button
						key={item}
						onClick={() => setActive(i)}
						className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 border-b-2 -mb-px ${active === i ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100' : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
					>
						{item}
					</button>
				))}
			</div>

			{/* Active panel */}
			<div className="p-4 bg-white dark:bg-zinc-900">
				{panels[active] ?? null}
			</div>
		</div>
	)
}

// ─────────────────────────────────────────────
// TAB PANEL (used inside <Tabs>)
// ─────────────────────────────────────────────
export function Tab({ children }: { children: ReactNode }) {
	return (
		<div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>
	)
}
