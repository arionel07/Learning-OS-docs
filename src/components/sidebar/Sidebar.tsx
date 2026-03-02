'use client'
import { IDoc, ISidebarItem } from '@/types/docs.type'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useMemo } from 'react'

interface ISidebarProps {
	docs: IDoc[]
	lang: 'en' | 'ru'
}

const SidebarItemComponent = memo(function SidebarItemComponent({
	item,
	lang,
	pathname
}: {
	item: ISidebarItem
	lang: string
	pathname: string
}) {
	const href = `/docs/${lang}/${item.slug.join('/')}`
	const isActive = pathname === href

	return (
		<li className="mb-1">
			<Link
				href={href}
				className={`block px-2 py-1 rounded transition-colors ${isActive ? 'bg-blue-500 text-white' : 'text-blue-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
			>
				{item.title}
			</Link>
			{item.children && item.children.length > 0 && (
				<ul className="ml-4">
					{item.children.map(child => (
						<SidebarItemComponent
							key={child.slug.join('/')}
							item={child}
							lang={lang}
							pathname={pathname}
						/>
					))}
				</ul>
			)}
		</li>
	)
})

export default function Sidebar({ docs, lang }: ISidebarProps) {
	const pathname = usePathname()

	const tree = useMemo<ISidebarItem[]>(() => {
		const map: Record<string, ISidebarItem> = {}

		docs.forEach(doc => {
			const rootSegment = doc.slug[0]

			if (doc.slug.length === 1) {
				// Top-level document
				if (!map[rootSegment]) {
					map[rootSegment] = {
						title: doc.frontmatter.title,
						slug: doc.slug,
						children: []
					}
				} else {
					// The node is already created as a folder - update the title
					map[rootSegment].title = doc.frontmatter.title
					map[rootSegment].slug = doc.slug
				}
			} else {
				// Embedded document
				if (!map[rootSegment]) {
					map[rootSegment] = {
						title: rootSegment,
						slug: [rootSegment],
						children: []
					}
				}

				map[rootSegment].children = map[rootSegment].children ?? []
				map[rootSegment].children!.push({
					title: doc.frontmatter.title,
					slug: doc.slug,
					children: []
				})
			}
		})

		//Sort by frontmatter.order if present
		const sorted = Object.values(map).sort((a, b) => {
			const aDoc = docs.find(d => d.slug.join('/') === a.slug.join('/'))
			const bDoc = docs.find(d => d.slug.join('/') === b.slug.join('/'))
			return (aDoc?.frontmatter.order ?? 99) - (bDoc?.frontmatter.order ?? 99)
		})

		return sorted
	}, [docs])

	return (
		<aside className="w-64 border-r p-4 overflow-y-auto border-zinc-200 dark:border-zinc-700">
			<ul>
				{tree.map(item => (
					<SidebarItemComponent
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
