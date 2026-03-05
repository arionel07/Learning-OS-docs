import {
	buildDocsIndex,
	getAllDocs,
	getDocBySlug,
	getPrevNextDocs
} from '@/lib/docs.lib'
import { IDoc, TLanguage } from '@/types/docs.type'
import DocPage from './DocPage'
import { FolderIndexPage } from './FolderIndexPage'

interface IPageProps {
	params: Promise<{ lang: TLanguage; slug?: string[] }>
}

export default async function page({ params }: IPageProps) {
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
				d.slug.length === d.slug.length + 1 &&
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
	return (
		<DocPage
			doc={doc}
			indexEntries={Object.fromEntries(index)}
			prev={prev}
			next={next}
		/>
	)
}
