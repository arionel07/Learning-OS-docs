export interface ITocItem {
	id: string
	text: string
	level: 2 | 3
}

function toId(text: string): string {
	return (
		text
			.toLowerCase()
			.trim()
			// Заменяем пробелы на дефис
			.replace(/\s+/g, '-')
			// Убираем только спецсимволы но оставляем кириллицу и латиницу
			.replace(/[^\p{L}\p{N}-]/gu, '')
			// Убираем двойные дефисы
			.replace(/-+/g, '-')
			// Убираем дефисы в начале и конце
			.replace(/^-|-$/g, '')
	)
}
/**
 * Extracts h2 and h3 headings from HTML string.
 * Adds id attributes to each heading for anchor links.
 */
export function extractToc(html: string): ITocItem[] {
	const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
	const items: ITocItem[] = []
	const usedIds = new Map<string, number>()

	let match: RegExpExecArray | null
	while ((match = regex.exec(html)) !== null) {
		const level = parseInt(match[1]) as 2 | 3
		const text = match[2].replace(/<[^>]+>/g, '').trim()
		let id = toId(text)

		// Защита от дублирующихся id
		if (usedIds.has(id)) {
			const count = usedIds.get(id)! + 1
			usedIds.set(id, count)
			id = `${id}-${count}`
		} else {
			usedIds.set(id, 1)
		}

		if (id) items.push({ id, text, level })
	}

	return items
}

/**
 * Injects id attributes into h2/h3 tags in HTML string.
 * Required for TOC anchor links to work.
 */

export function injectHeadingIds(html: string): string {
	const usedIds = new Map<string, number>()

	return html.replace(
		/<h([23])([^>]*)>(.*?)<\/h[23]>/gi,
		(_, level, attrs, content) => {
			const text = content.replace(/<[^>]+>/g, '').trim()
			let id = toId(text)

			if (usedIds.has(id)) {
				const count = usedIds.get(id)! + 1
				usedIds.set(id, count)
				id = `${id}-${count}`
			} else {
				usedIds.set(id, 1)
			}

			if (!id) return `<h${level}${attrs}>${content}</h${level}>`
			return `<h${level}${attrs} id="${id}">${content}</h${level}>`
		}
	)
}
