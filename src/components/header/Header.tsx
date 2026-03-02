'use client'
import { LanguageSelect } from '../ui/button/lang/LanguageSelect'
import { ToggleThemeButton } from '../ui/button/theme/ToggleThemeButton'

export function Header() {
	return (
		<header className="flex justify-between items-center p-4 border-b border-zinc-50 dark:border-zinc-800">
			<h1 className="font-bold text-xl">Learnin OS Docs</h1>
			<div className="flex gap-2">
				{/* Theme toggle */}
				<ToggleThemeButton />

				{/* Language select */}
				<LanguageSelect />
			</div>
		</header>
	)
}
