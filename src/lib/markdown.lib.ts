import { remark } from 'remark'
import html from 'remark-html'

/**
 * Converts Markdown to HTML
 * @param md - Markdown content
 * @returns HTML string
 */

export async function parseMarkdown(md: string): Promise<string> {
	const result = await remark().use(html).process(md)
	return result.toString()
}
