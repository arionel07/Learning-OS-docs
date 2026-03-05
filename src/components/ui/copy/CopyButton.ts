'use client'

import { useEffect } from 'react'

export function useCopyButton(html: string) {
	useEffect(() => {
		if (!html) return

		document.querySelectorAll('.copy-btn').forEach(btn => {
			if ((btn as HTMLElement).dataset.initialized) return
			;(btn as HTMLElement).dataset.initialized = 'true'

			btn.addEventListener('click', () => {
				const code = decodeURIComponent((btn as HTMLElement).dataset.code ?? '')
				navigator.clipboard.writeText(code).then(() => {
					btn.textContent = 'Copied!'
					btn.classList.add('copied')
					setTimeout(() => {
						btn.textContent = 'Copy'
						btn.classList.remove('copied')
					}, 2000)
				})
			})
		})
	}, [html]) // Restarts when HTML is ready
}
