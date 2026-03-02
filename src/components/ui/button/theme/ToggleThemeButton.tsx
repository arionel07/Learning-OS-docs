import { themeAtom } from '@/store/theme.store'
import { useAtom } from 'jotai'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

export function ToggleThemeButton() {
	// getting theme from jotai
	const [theme, setTheme] = useAtom(themeAtom)

	// Theme class for body
	useEffect(() => {
		document.documentElement.className = theme
	}, [theme])
	return (
		<button
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			className="p-2 border rounded cursor-pointer border-zinc-300 bg-zinc-100/30 dark:border-zinc-800 dark:bg-zinc-900 shadow-md"
		>
			{theme === 'light' ? <Moon /> : <Sun />}
		</button>
	)
}
