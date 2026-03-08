import { useState } from 'react'

export function useCopy() {
	const [copied, setCopied] = useState<boolean>(false)
	const copy = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 1500)
		})
	}
	return { copied, copy }
}
