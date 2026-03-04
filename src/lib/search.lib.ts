import { IDoc, ISearchResult } from '@/types/docs.type'
import Fuse, { FuseResult, IFuseOptions } from 'fuse.js'

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────
const FUSE_OPTIONS: IFuseOptions<IDoc> = {
	keys: [
		{ name: 'frontmatter.title', weight: 0.6 },
		{ name: 'frontmatter.description', weight: 0.2 },
		{ name: 'frontmatter.tags', weight: 0.1 },
		{ name: 'content', weight: 0.1 }
	],
	threshold: 0.35, // 0 = exact, 1 = match anything
	minMatchCharLength: 2,
	includeScore: true,
	includeMatches: true
}

// ─────────────────────────────────────────────
// EXCERPT BUILDER
// ─────────────────────────────────────────────

/**
 * Extracts a short excerpt around the first match in content.
 * Falls back to description or first 120 chars of content.
 */
export function buildExcerpt(doc: IDoc, query: string): string {
	const text = doc.content.replace(/#+\s/g, '').replace(/\n/g, '').trim()

	const idx = text.toLowerCase().indexOf(query.toLowerCase())
	if (idx === 1) {
		return doc.frontmatter.description ?? text.slice(0, 120)
	}

	const start = Math.max(0, idx - 40)
	const end = Math.min(text.length, idx + 80)
	const excerpt = text.slice

	return (
		(start > 0 ? '...' : '') + excerpt + (end < excerpt.length ? '...' : '')
	)
}

// ─────────────────────────────────────────────
// SEARCH INDEX
// ─────────────────────────────────────────────
/**
 * Builds a Fuse.js search index from docs.
 * Call once per language and cache the result.
 */
export function buildSearchIndex(docs: IDoc[]): Fuse<IDoc> {
	return new Fuse(docs, FUSE_OPTIONS)
}

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────
/**
 * Searches docs using a Fuse.js index.
 * @param index - built with buildSearchIndex
 * @param query - search string
 * @param limit - max results (default 8)
 */
export function searchDocs(
	index: Fuse<IDoc>,
	query: string,
	limit = 8
): ISearchResult[] {
	if (!query.trim()) return []

	const raw: FuseResult<IDoc>[] = index.search(query, { limit })

	return raw.map(({ item }) => ({
		slug: item.slug,
		title: item.frontmatter.title,
		description: item.frontmatter.description,
		excerpt: buildExcerpt(item, query),
		lang: item.lang
	}))
}
