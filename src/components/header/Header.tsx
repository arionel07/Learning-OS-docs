'use client'
import { LanguageSelect } from '../ui/button/lang/LanguageSelect'
import { ToggleThemeButton } from '../ui/button/theme/ToggleThemeButton'

export function Header() {
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
			{/* Logo */}
			<span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
				Learnin OS{' '}
				<span className="text-zinc-400 dark:text-zinc-500 font-normal">
					Docs
				</span>
			</span>
			{/* Controls */}
			<div className="flex items-center gap-1">
				<ToggleThemeButton />
				<div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />
				<LanguageSelect />
			</div>
		</header>
	)
}
