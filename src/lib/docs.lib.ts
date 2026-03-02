import { IDoc, TLanguage } from '@/types/docs.type'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import 'server-only'
import { IDocFrontmatter } from '../types/docs.type'

//Path to the documentation folder
const DOC_PATH = path.join(process.cwd(), 'src/content/docs')

/**
 * Loads a Markdown file by slug
 * @param slug - an array, e.g. ["editor","links"]
 * @returns the Doc object
 */
export function getDocBySlug(slug: string[], lang: TLanguage = 'en'): IDoc {
	const filePath = path.join(DOC_PATH, lang, `${slug.join('/')}.md`)

	//should throw when file does NOT exist
	if (!fs.existsSync(filePath)) {
		throw new Error(`Документ не найден: ${filePath}`)
	}

	const raw = fs.readFileSync(filePath, 'utf-8')
	const { data, content } = matter(raw)

	const frontmatter: IDocFrontmatter = {
		title: data.title ?? 'No name',
		description: data.description,
		order: data.order
	}

	return { slug, frontmatter, content, lang }
}

/**
 * Loads all documents from the docs folder recursively
 * @returns the Doc array
 */
export function getAllDocs(lang: TLanguage = 'en'): IDoc[] {
	const walk = (dir: string, baseSlug: string[] = []): IDoc[] => {
		let docs: IDoc[] = []
		const entries = fs.readdirSync(dir, { withFileTypes: true })

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

	return walk(path.join(DOC_PATH, lang))
}
