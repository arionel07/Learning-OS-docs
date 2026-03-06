import { buildDocsIndex } from '@/lib/docs.lib'
import { compileMDXCached } from '@/lib/mdx.lib'
import { IDoc } from '@/types/docs.type'

export async function DocMDX({ doc }: { doc: IDoc }) {
	const index = buildDocsIndex(doc.lang)
	const { content } = await compileMDXCached(doc, index)

	return (
		<article className="text-zinc-700 dark:text-zinc-300">{content}</article>
	)
}
