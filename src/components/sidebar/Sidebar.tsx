'use client'
import { IDoc } from '@/types/docs.type'
import { BookmarkX, Hamburger } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import SidebarItem from './SidebarItem'
import { buildTree } from './util/sidebar.util'

export interface ISidebarProps {
	docs: IDoc[]
	lang: 'en' | 'ru'
}

export default function Sidebar({ docs, lang }: ISidebarProps) {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const tree = useMemo(() => buildTree(docs), [docs])

	//Close when changing pages
	useEffect(() => {
		setIsOpen(false)
	}, [pathname])

	//Block body scrolling when the sidebar is open
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<>
			{/* Backdrop — только мобил, только когда открыт */}
			{isOpen && (
				<div
					className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
					onClick={() => setIsOpen(false)}
				/>
			)}

			{/* Кнопка открытия — только мобил */}
			<button
				onClick={() => setIsOpen(d => !d)}
				className="fixed bottom-4 right-4 z-50 md:hidden w-10 h-10 rounded-full shadow-lg flex items-center justify-center bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900"
				aria-label="Open menu"
			>
				<Hamburger size={23} />
			</button>

			{/* Sidebar */}
			<aside
				className={`static top-0 left-0 bottom-0 z-40 w-64 border-r border-[#e4e4e7] pt-20 dark:border-[#27272a] bg-[#fafafa] dark:bg-[#111111] p-4 overflow-y-auto transition-transform duration-250 ease-in-out md:relative md:translate-x-0 md:z-auto md:pt-4 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
			>
				{/* Шапка с кнопкой закрытия — только мобил */}
				<div className="flex items-center justify-between mb-4 md:hidden">
					<span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
						Menu
					</span>
					<button
						onClick={() => setIsOpen(false)}
						className="w-6 h-6 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
					>
						<BookmarkX />
					</button>
				</div>

				<ul className="space-y-0.5">
					{tree.map(item => (
						<SidebarItem
							key={item.slug.join('/')}
							item={item}
							lang={lang}
							pathname={pathname}
						/>
					))}
				</ul>
			</aside>
		</>
	)
}
