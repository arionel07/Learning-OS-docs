'use client'
import { themeAtom } from '@/store/theme.store'
import { IDoc, TLanguage } from '@/types/docs.type'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import logoWhite from '../../../public/ChatGPT Image Mar 3, 2026, 07_24_30 PM-Photoroom.svg'
import logoBlack from '../../../public/logo-light-dark-Photoroom.png'
import { LanguageSelect } from '../ui/button/lang/LanguageSelect'
import { ToggleThemeButton } from '../ui/button/theme/ToggleThemeButton'
import { SearchButton } from '../ui/search/SearchButton'

interface IHeaderProps {
	docs: IDoc[]
	lang: TLanguage
}

export function Header({ docs, lang }: IHeaderProps) {
	const theme = useAtomValue(themeAtom)
	return (
		<header className="sticky top-0 z-50 flex items-center justify-between px-6 h-18 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
			{/* Logo */}
			<span className="flex items-center text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
				<div className="w-11 h-11 mr-2">
					<Image
						src={theme === 'light' ? logoBlack : logoWhite}
						alt="31"
					/>
				</div>
				<div className="">
					Learnin OS{' '}
					<span className="text-zinc-400 dark:text-zinc-500 font-normal">
						Docs
					</span>
				</div>
			</span>

			{/* Controls  */}
			<div className="flex items-center gap-1">
				<SearchButton docs={docs} />
				<div className="ml-5 flex items-center gap-1">
					<ToggleThemeButton />
					<div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1" />
					<LanguageSelect />
				</div>
			</div>
		</header>
	)
}
