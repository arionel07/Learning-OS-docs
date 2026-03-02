import { getDocBySlug } from '@/lib/docs.lib'
import { IDoc, TLanguage } from '@/types/docs.type'
import DocPage from './DocPage'

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

	return <DocPage doc={doc} />
}
