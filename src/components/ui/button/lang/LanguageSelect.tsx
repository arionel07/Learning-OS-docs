import { languageAtom } from '@/store/language.store'
import { TLanguage } from '@/types/docs.type'
import { useAtom } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSelect() {
	// Getting the language Jotai
	const [lang, setLang] = useAtom(languageAtom)

	// router and pathName from next js for change path and route
	const router = useRouter()
	const pathname = usePathname()

	// function for change path and route
	const handleLanguageChange = (newLang: TLanguage) => {
		setLang(newLang)

		// We take lang from the URL, not from atom - they may diverge
		// replace /docs/en/... with /docs/ru/...
		const newPath = pathname.replace(/\/(en|ru)\//, `/${newLang}/`)
		router.push(newPath)
	}

	return (
		<button
			onClick={() => handleLanguageChange(lang === 'en' ? 'ru' : 'en')}
			aria-label="Switch language"
			className="h-8 px-2.5 flex items-center rounded-md text-xs font-medium tracking-wide text-zinc-500 hover:text-zinc-900 dark:text-zinc-40 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-150"
		>
			{lang === 'en' ? 'RU' : 'EN'}
		</button>
	)
}
