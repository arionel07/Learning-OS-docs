import { getAllDocs } from '@/lib/docs.lib'
import { TLanguage } from '@/types/docs.type'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://learningos.dev'
const LANGUAGES: TLanguage[] = ['en', 'ru']

export default function sitemap(): MetadataRoute.Sitemap {
	const routes: MetadataRoute.Sitemap = []

	// ─────────────────────────────────────────────
	// STATIC ROUTES
	// ─────────────────────────────────────────────

	routes.push({
		url: BASE_URL,
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 1.0
	})

	// ─────────────────────────────────────────────
	// DOCS ROUTES — все языки
	// ─────────────────────────────────────────────
	for (const lang of LANGUAGES) {
		// Root docs page
		routes.push({
			url: `${BASE_URL}/docs/${lang}`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9
		})

		// All docs pages

		const docs = getAllDocs(lang)

		for (const doc of docs) {
			if (doc.frontmatter.draft) continue // skip drafts

			routes.push({
				url: `${BASE_URL}/docs/${lang}/${doc.slug.join('/')}`,
				lastModified: new Date(),
				changeFrequency: 'weekly',
				priority: 0.8,
				alternates: {
					languages: {
						en: `${BASE_URL}/docs/en/${doc.slug.join('/')}`,
						ru: `${BASE_URL}/docs/ru/${doc.slug.join('/')}`
					}
				}
			})
		}
	}

	return routes
}
