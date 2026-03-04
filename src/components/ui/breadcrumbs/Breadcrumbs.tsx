'use client'

import { TLanguage } from '@/types/docs.type'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface IBreadcrumbsProps {
	slug: string[]
	lang: TLanguage
}

export function Breadcrumbs({ slug, lang }: IBreadcrumbsProps) {
	// Build crumbs from slug segments
	// e.g. ["editor", "links"] →
	// Docs → editor → links

	const crumbs = slug.map((segment, i) => ({
		// "getting-started" → "Getting Started"
		label: segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
		href: `/docs/${lang}/${slug.slice(0, i + 1).join('/')}`,
		isLast: i === slug.length - 1
	}))

	return (
		<nav
			aria-label="Breadcrumb"
			className="flex items-center gap-1.5 mb-6"
		>
			{/* Docs root */}
			<Link
				href={`/docs/${lang}`}
				className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
			>
				Docs
			</Link>

			{crumbs.map(crumb => (
				<span
					key={crumb.href}
					className="flex items-center gap-1.5"
				>
					{/* Separator */}
					<ChevronRight
						className="text-zinc-300 dark:text-zinc-600 shrink-0"
						size={12}
					/>

					{crumb.isLast ? (
						// Current page — not clickable
						<span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
							{crumb.label}
						</span>
					) : (
						// Parent page — clickable
						<Link
							href={crumb.href}
							className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
						>
							{crumb.label}
						</Link>
					)}
				</span>
			))}
		</nav>
	)
}
