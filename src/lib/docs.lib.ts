import { IDoc, TDocsIndex, TLanguage } from '@/types/docs.type'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import 'server-only'
import { IDocFrontmatter } from '../types/docs.type'

//Path to the documentation folder
const DOC_PATH = path.join(process.cwd(), 'src/content/docs')

// ─────────────────────────────────────────────
// CACHE
// ─────────────────────────────────────────────

const cache = new Map<string, IDoc[]>()

// ─────────────────────────────────────────────
// FRONTMATTER PARSER
// ─────────────────────────────────────────────
function parseFrontmatter(data: Record<string, unknown>): IDocFrontmatter {
	return {
		title: (data.title as string) ?? 'No name',
		description: data.description as string | undefined,
		order: data.order as number | undefined,
		draft: (data.draft as boolean | undefined) ?? false,
		aliases: Array.isArray(data.aliases)
			? (data.aliases as string[])
			: undefined,
		tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined
	}
}

// ─────────────────────────────────────────────
// GET SINGLE DOC
// ─────────────────────────────────────────────

/**
 * Loads a Markdown file by slug
 * @param slug - an array, e.g. ["editor","links"]
 * @param lang - document language
 */
export function getDocBySlug(slug: string[], lang: TLanguage = 'en'): IDoc {
	const filePath = path.join(DOC_PATH, lang, `${slug.join('/')}.md`)
	const folderPath = path.join(DOC_PATH, lang, slug.join('/'))

	// ← if there is no file but there is a folder, we return index doc
	if (!fs.existsSync(filePath)) {
		if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
			return {
				slug,
				frontmatter: {
					title: slug[slug.length - 1]
						.replace(/-/g, ' ')
						.replace(/\b\w/g, c => c.toUpperCase())
				},
				content: '',
				lang,
				isIndex: true // folder
			}
		}
		throw new Error(`Документ не найден: ${filePath}`)
	}

	const raw = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(raw)
	const frontmatter = parseFrontmatter(data)

	return { slug, frontmatter, content, lang }
}

// ─────────────────────────────────────────────
// GET ALL DOCS
// ─────────────────────────────────────────────
/**
 * Loads all documents recursively for a given language.
 * Results are cached per language (invalidated on restart).
 * Draft pages are included — filter them in UI if needed.
 */
export function getAllDocs(lang: TLanguage = 'en'): IDoc[] {
	if (cache.has(lang)) return cache.get(lang)!

	const walk = (dir: string, baseSlug: string[] = []): IDoc[] => {
		if (!fs.existsSync(dir)) return []

		const entries = fs.readdirSync(dir, { withFileTypes: true })
		let docs: IDoc[] = []

		for (const entry of entries) {
			const entryPath = path.join(dir, entry.name)
			const slug = [...baseSlug, entry.name.replace(/\.md$/, '')]

			if (entry.isDirectory()) {
				docs = docs.concat(walk(entryPath, slug))
			} else if (entry.isFile() && entry.name.endsWith('.md')) {
				docs.push(getDocBySlug(slug, lang))
			}
		}

		return docs
	}

	const docs = walk(path.join(DOC_PATH, lang))
	cache.set(lang, docs)
	return docs
}

// ─────────────────────────────────────────────
// DOCS INDEX (for wiki-link resolution)
// ─────────────────────────────────────────────

/**
 * Builds a flat lookup map from all docs.
 * Keys: last slug segment + all aliases → IDoc
 * Used to resolve [[wiki-links]] quickly.
 */

export function buildDocsIndex(lang: TLanguage = 'en'): TDocsIndex {
	const docs = getAllDocs(lang)
	const index: TDocsIndex = new Map()

	for (const doc of docs) {
		// Key by last slug segment: "links" → doc
		const key = doc.slug[doc.slug.length - 1]
		index.set(key, doc)

		// Key by full slug path: "editor/links" → doc
		index.set(doc.slug.join('/'), doc)

		// Key by each alias if defined
		if (doc.frontmatter.aliases) {
			for (const alias of doc.frontmatter.aliases) {
				index.set(alias.toLowerCase(), doc)
			}
		}
	}

	return index
}
