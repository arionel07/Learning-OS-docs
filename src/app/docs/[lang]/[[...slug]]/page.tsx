import {
	buildDocsIndex,
	getAllDocs,
	getDocBySlug,
	getPrevNextDocs
} from '@/lib/docs.lib'
import { IDoc, TLanguage } from '@/types/docs.type'
import { Metadata } from 'next'
import { DocMDX } from './DocMDX'
import DocPage from './DocPage'
import { FolderIndexPage } from './FolderIndexPage'

interface IPageProps {
	params: Promise<{ lang: TLanguage; slug?: string[] }>
}

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────
export async function generateMetadata({
	params
}: IPageProps): Promise<Metadata> {
	const { lang, slug: rawSlug } = await params
	const slug = rawSlug ?? ['index']

	try {
		const doc = getDocBySlug(slug, lang)

		const title = doc.frontmatter.title
		const description =
			doc.frontmatter.description ?? `${title} — Learning OS Docs`
		const url = `https://learningos.dev/docs/${lang}/${slug.join('/')}`

		return {
			title: `${title} — Learnin OS Docs`,
			description,
			openGraph: {
				title,
				description,
				url,
				siteName: 'Learnin OS Docs',
				type: 'article',
				images: [
					{
						url: `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&lan=${lang}`,
						width: 1200,
						height: 630,
						alt: title
					}
				]
			},
			twitter: {
				card: 'summary_large_image',
				title,
				description,
				images: [`/api/og?title=${encodeURIComponent(title)}&lang=${lang}`]
			},
			alternates: {
				canonical: url,
				languages: {
					en: `/docs/en/${slug.join('/')}`,
					ru: `/docs/ru/${slug.join('/')}`
				}
			}
		}
	} catch {
		return {
			title: 'Learning OS Docs',
			description: 'Documentation'
		}
	}
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default async function Page({ params }: IPageProps) {
	// Determine the slug
	// If not, take the index

	const { lang, slug: rawSlug } = await params
	const slug = rawSlug ?? ['index']
	// Uploading a document (server-side)
	//const doc: IDoc = getDocBySlug(slug, lang, [slug.join('/'), lang])

	const doc: IDoc = getDocBySlug(slug, lang)

	// Folder - display the index page with cards
	if (doc.isIndex) {
		const allDocs = getAllDocs(lang)
		const children = allDocs.filter(
			d =>
				d.slug.length === slug.length + 1 &&
				d.slug.slice(0, slug.length).join('/') === slug.join('/')
		)
		return (
			<FolderIndexPage
				children={children}
				doc={doc}
			/>
		)
	}

	const index = buildDocsIndex(lang)
	const { next, prev } = getPrevNextDocs(slug, lang) // next prev

	if (doc.isMdx) {
		return (
			<DocPage
				doc={doc}
				indexEntries={Object.fromEntries(index)}
				prev={prev}
				next={next}
				mdxContent={<DocMDX doc={doc} />} // ← передаём готовый JSX
			/>
		)
	}
	return (
		<DocPage
			doc={doc}
			indexEntries={Object.fromEntries(index)}
			prev={prev}
			next={next}
		/>
	)
}
