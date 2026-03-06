import { IDoc, ISidebarItem } from '@/types/docs.type'

// ─────────────────────────────────────────────
// TREE BUILDER
// ─────────────────────────────────────────────

/**
 * Builds a sidebar tree from a flat list of docs.
 * - Filters out drafts
 * - Groups nested pages under folder nodes
 * - Sorts by frontmatter.order at every level
 */

export function buildTree(docs: IDoc[]): ISidebarItem[] {
	const visible = docs.filter(d => !d.frontmatter.draft)
	const map: Record<string, ISidebarItem> = {}

	for (const doc of visible) {
		const rootSegment = doc.slug[0]
		const isIndex = doc.slug[doc.slug.length - 1] === 'index'

		if (doc.slug.length === 1) {
			// Top-level page
			if (!map[rootSegment]) {
				map[rootSegment] = {
					title: doc.frontmatter.title,
					slug: doc.slug,
					order: doc.frontmatter.order,
					draft: doc.frontmatter.draft,
					isFolder: false,
					children: []
				}
			} else {
				map[rootSegment].title = doc.frontmatter.title
				map[rootSegment].slug = doc.slug
				map[rootSegment].order = doc.frontmatter.order
				map[rootSegment].isFolder = false
			}
		} else {
			// Nested page — обычный дочерний элемент
			if (!map[rootSegment]) {
				map[rootSegment] = {
					title: rootSegment
						.replace(/-/g, ' ')
						.replace(/\b\w/g, c => c.toUpperCase()),
					slug: [rootSegment],
					isFolder: true,
					children: []
				}
			}

			// Пропускаем index.md глубже вложенных папок
			if (!isIndex) {
				map[rootSegment].children?.push({
					title: doc.frontmatter.title,
					slug: doc.slug,
					order: doc.frontmatter.order,
					draft: doc.frontmatter.draft,
					isFolder: false,
					children: []
				})
			}
		}
	}

	for (const node of Object.values(map)) {
		if (node.children?.length) {
			node.children.sort(sortByOrder)
		}
	}

	return Object.values(map).sort(sortByOrder)
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Sorts sidebar items by frontmatter.order (missing order goes to end) */
export function sortByOrder(a: ISidebarItem, b: ISidebarItem) {
	return (a.order ?? 99) - (b.order ?? 99)
}

/**
 * Checks if any direct child of a node matches the current pathname.
 * Used to auto-open folders when a child page is active.
 */
export function isAnyChildActive(
	children: ISidebarItem[],
	lang: string,
	pathname: string
): boolean {
	return children.some(
		child => pathname === `/docs/${lang}/${child.slug.join('/')}`
	)
}
