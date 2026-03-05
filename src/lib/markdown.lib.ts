import { IWikiLink, TDocsIndex, TLanguage } from '@/types/docs.type'
import { remark } from 'remark'
import html from 'remark-html'
import { createHighlighter, Highlighter } from 'shiki'

// ─────────────────────────────────────────────
// SHIKI HIGHLIGHTER (singleton)
// ─────────────────────────────────────────────

let highlighter: Highlighter | null = null

async function getHighlighter(): Promise<Highlighter> {
	if (highlighter) return highlighter

	highlighter = await createHighlighter({
		themes: ['github-light', 'github-dark'],
		langs: [
			'typescript',
			'javascript',
			'tsx',
			'jsx',
			'bash',
			'shell',
			'json',
			'css',
			'html',
			'markdown',
			'python',
			'rust',
			'go',
			'sql'
		]
	})

	return highlighter
}

// ─────────────────────────────────────────────
// SYNTAX HIGHLIGHTING
// ─────────────────────────────────────────────
/**
 * Replaces <pre><code class="language-ts">...</code></pre>
 * blocks in HTML with Shiki-highlighted versions.
 */

async function highlightCodeBlocks(rawHtml: string): Promise<string> {
	const hl = await getHighlighter()

	// Match <pre><code class="language-xxx">...</code></pre>
	const codeBlockRegex =
		/<pre><code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g

	const matches = [...rawHtml.matchAll(codeBlockRegex)]
	if (matches.length === 0) return rawHtml

	let result = rawHtml

	for (const match of matches) {
		let [fullMatch, lang, encoded] = match

		// Decode HTML entities from remark output
		const code = encoded
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")

		const language =
			lang && hl.getLoadedLanguages().includes(lang as never) ? lang : 'text'

		const highlighted = hl.codeToHtml(code, {
			lang: language,
			themes: {
				light: 'github-light',
				dark: 'github-dark'
			},
			defaultColor: false
		})

		// Wrap with filename support and copy button placeholder
		const wrapped = `
  <div class="code-block my-4 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
    ${
			lang
				? `<div class="code-block-header flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
      <span class="text-xs font-mono text-zinc-400 dark:text-zinc-500">${lang}</span>
      <button class="copy-btn text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors" data-code="${encodeURIComponent(code)}">
        Copy
      </button>
    </div>`
				: ''
		}
    <div class="code-block-content">
      ${highlighted}
    </div>
  </div>
`

		result = result.replace(fullMatch, () => wrapped)
	}

	return result
}

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
// WIKI-LINK INJECTOR
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
 * Public alias for injectWikiLinks.
 * Used by mdx.lib.ts before MDX compilation.
 */
export function injectWikiLinksToMd(
	content: string,
	index: TDocsIndex,
	lang: TLanguage
): string {
	return injectWikiLinks(content, index, lang)
}

// ─────────────────────────────────────────────
// MARKDOWN → HTML
// ─────────────────────────────────────────────

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

	// Apply syntax highlighting to code blocks
	const highlighted = await highlightCodeBlocks(result.toString())

	return highlighted
}
