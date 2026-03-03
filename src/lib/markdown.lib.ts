import { IWikiLink, TDocsIndex, TLanguage } from '@/types/docs.type'
import { remark } from 'remark'
import html from 'remark-html'

// ─────────────────────────────────────────────
// WIKI-LINK PARSER
// ─────────────────────────────────────────────

/**
 * Parses all [[wiki-links]] from raw markdown content.
 * Supports: [[page]], [[page|label]], [[folder/page]]
 */
export function parseWikiLinks(content: string): IWikiLink[] {
	const regex = /\[\[([^\]]+)\]\]/g
	const links: IWikiLink[] = []
	let match: RegExpExecArray | null

	while ((match = regex.exec(content)) !== null) {
		const inner = match[1]
		const [target, label] = inner.split('|').map(s => s.trim())
		links.push({ target, label: label ?? target, resolvedSlug: null })
	}

	return links
}

/**
 * Resolves wiki-links against the docs index.
 * Mutates resolvedSlug on each IWikiLink.
 */
export function resolveWikiLinks(
	links: IWikiLink[],
	index: TDocsIndex
): IWikiLink[] {
	return links.map(link => {
		const doc = index.get(link.target.toLowerCase()) ?? index.get(link.target)
		return {
			...link,
			resolvedSlug: doc ? doc.slug : null
		}
	})
}

// ─────────────────────────────────────────────
// MARKDOWN → HTML
// ─────────────────────────────────────────────

/**
 * Replaces [[wiki-links]] in markdown with real <a> tags
 * before passing to remark, so they render as HTML links.
 */
function injectWikiLinks(
	content: string,
	index: TDocsIndex,
	lang: TLanguage
): string {
	return content.replace(/\[\[([^\]]+)\]\]/g, (_, inner) => {
		const [target, label] = inner.split('|').map((s: string) => s.trim())
		const doc = index.get(target.toLowerCase()) ?? index.get(target)

		if (!doc) {
			// Unresolved link — render as plain span
			return `<span class="wiki-link-missing" title="Page not found">${label ?? target}</span>`
		}

		const href = `/docs/${lang}/${doc.slug.join('/')}`
		return `[${label ?? target}](${href})`
	})
}

/**
 * Converts Markdown to HTML
 * Optionally resolves [[wiki-links]] if index and lang are provided.
 */

export async function parseMarkdown(
	md: string,
	index?: TDocsIndex,
	lang?: TLanguage
): Promise<string> {
	const processed = index && lang ? injectWikiLinks(md, index, lang) : md
	const result = await remark()
		.use(html, { sanitize: false })
		.process(processed)
	return result.toString()
}
