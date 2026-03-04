import { MDXComponents } from '@/components/mdx/MDXComponents'
import { IDoc, IMDXResult, TDocsIndex, TLanguage } from '@/types/docs.type'
import { compileMDX } from 'next-mdx-remote/rsc'
import { injectWikiLinksToMd } from './markdown.lib'

// ─────────────────────────────────────────────
// COMPILE MDX
// ─────────────────────────────────────────────

/**
 * Compiles MDX string into a React element.
 * Supports wiki-links injection before compilation.
 *
 * @param source - raw MDX/MD content
 * @param index  - docs index for wiki-link resolution (optional)
 * @param lang   - language for wiki-link hrefs (optional)
 */
export async function compileMDXContent(
	source: string,
	index?: TDocsIndex,
	lang?: TLanguage
): Promise<IMDXResult> {
	// Inject wiki-links before MDX compilation
	const processed =
		index && lang ? injectWikiLinksToMd(source, index, lang) : source

	const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
		source: processed,
		components: MDXComponents,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				development: process.env.NODE_ENV === 'development'
			}
		}
	})

	return { content, frontmatter }
}

// ─────────────────────────────────────────────
// CACHE
// ─────────────────────────────────────────────

const mdxCache = new Map<string, IMDXResult>()

/**
 * Cached version of compileMDXContent.
 * Key: slug + lang
 */
export async function compileMDXCached(
	doc: IDoc,
	index: TDocsIndex
): Promise<IMDXResult> {
	const key = `${doc.lang}:${doc.slug.join('/')}`

	if (mdxCache.has(key)) return mdxCache.get(key)!

	const result = await compileMDXContent(doc.content, index, doc.lang)
	mdxCache.set(key, result)

	return result
}
