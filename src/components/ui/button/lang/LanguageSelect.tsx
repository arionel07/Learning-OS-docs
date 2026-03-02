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
			className="p-2 border rounded cursor-pointer border-zinc-300 bg-zinc-100/30 dark:border-zinc-800 dark:bg-zinc-900 shadow-md"
		>
			{lang === 'en' ? 'RU' : 'EN'}
		</button>
	)
}
