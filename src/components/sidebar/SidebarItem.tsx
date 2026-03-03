'use client'

import { ISidebarItem } from '@/types/docs.type'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { isAnyChildActive } from './util/sidebar.util'

interface ISidebarItemProps {
	item: ISidebarItem
	lang: string
	pathname: string
	depth?: number
}

// ─────────────────────────────────────────────
// FOLDER NODE
// ─────────────────────────────────────────────

const FolderNode = memo(function FolderNode({
	item,
	lang,
	pathname,
	depth
}: ISidebarItemProps) {
	const hasChildren = !!item.children?.length
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		if (hasChildren && isAnyChildActive(item.children!, lang, pathname)) {
			setIsOpen(true)
		}
	}, [pathname])

	return (
		<li>
			<button
				className="w-full flex items-center gap-1.5 py-1 rounded text-left text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-xs font-semibold uppercase tracking-wide"
				onClick={() => setIsOpen(o => !o)}
			>
				<span
					className={`text-[10px] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
				>
					<ChevronRight size={14} />
				</span>
				{item.title}
			</button>

			{isOpen && hasChildren && (
				<ul className="ml-3 border-l border-zinc-200 dark:border-zinc-700 pl-2 mt-0.5 space-y-0.5">
					{item.children?.map(child => (
						<SidebarItem
							key={child.slug.join('/')}
							lang={lang}
							item={child}
							pathname={pathname}
							depth={depth ? depth + 1 : undefined}
						/>
					))}
				</ul>
			)}
		</li>
	)
})

// ─────────────────────────────────────────────
// PAGE NODE
// ─────────────────────────────────────────────

const PageNode = memo(function PageNode({
	item,
	lang,
	pathname,
	depth
}: ISidebarItemProps) {
	const href = `/docs/${lang}/${item.slug.join('/')}`
	const isActive = pathname === href
	const hasChildren = !!item.children?.length

	return (
		<li>
			<Link
				href={href}
				className={`relative block px-2 py-1 rounded transition-colors text-sm ${
					isActive
						? 'text-[#879b85] dark:text-[#B3644B] underline font-medium folder-link-active'
						: 'text-[#1f1f1f] dark:text-[#cbcabf] hover:bg-zinc-200 folder-link-active-hover dark:hover:bg-zinc-800'
				}`}
			>
				{item.title}
			</Link>
			{hasChildren && (
				<ul className="ml-3 border-l border-zinc-200 dark:border-zinc-700 pl-2 mt-0.5 space-y-0.5">
					{item.children?.map(child => (
						<SidebarItem
							key={child.slug.join('/')}
							lang={lang}
							item={child}
							pathname={pathname}
							depth={depth ? depth + 1 : undefined}
						/>
					))}
				</ul>
			)}
		</li>
	)
})

// ─────────────────────────────────────────────
// SIDEBAR ITEM (router)
// ─────────────────────────────────────────────

const SidebarItem = memo(function SidebarItem({
	item,
	lang,
	pathname,
	depth = 0
}: ISidebarItemProps) {
	if (item.isFolder) {
		return (
			<FolderNode
				item={item}
				lang={lang}
				pathname={pathname}
				depth={depth}
			/>
		)
	}

	return (
		<PageNode
			item={item}
			lang={lang}
			pathname={pathname}
			depth={depth}
		/>
	)
})

export default SidebarItem
