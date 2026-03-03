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
			aria-label="Toggle theme"
			className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
		>
			{theme === 'light' ? (
				<Moon
					size={16}
					strokeWidth={1.5}
				/>
			) : (
				<Sun
					size={16}
					strokeWidth={1.5}
				/>
			)}
		</button>
	)
}
