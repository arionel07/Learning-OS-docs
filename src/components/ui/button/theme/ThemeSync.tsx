'use client'
import { themeAtom } from '@/store/theme.store'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

export function ThemeSync() {
	const theme = useAtomValue(themeAtom)

	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])

	return null
}
