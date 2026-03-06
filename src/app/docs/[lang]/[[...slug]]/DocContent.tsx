import { ARTICLE_STYLES } from '@/config/article.config'

export function DocContent({ html }: { html: string }) {
	return (
		<article
			className={ARTICLE_STYLES}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
