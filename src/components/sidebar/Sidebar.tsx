'use client'
import { IDoc } from '@/types/docs.type'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import SidebarItem from './SidebarItem'
import { buildTree } from './util/sidebar.util'

export interface ISidebarProps {
	docs: IDoc[]
	lang: 'en' | 'ru'
}

export default function Sidebar({ docs, lang }: ISidebarProps) {
	const pathname = usePathname()

	const tree = useMemo(() => buildTree(docs), [docs])

	return (
		<aside className="w-64 border-r p-4 overflow-y-auto border-zinc-200 dark:border-zinc-700">
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
	)
}
