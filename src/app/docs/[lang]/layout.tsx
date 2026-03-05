import { Header } from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
import { ScrollProgress } from '@/components/ui/scroll/ScrollProgress'
import { getAllDocs } from '@/lib/docs.lib'
import { IDoc, TLanguage } from '@/types/docs.type'
import { ReactNode } from 'react'

interface ILayoutProps {
	children: ReactNode
	params: Promise<{ lang: TLanguage }>
}

export default async function DocsLayout({ children, params }: ILayoutProps) {
	const { lang } = await params // ← await
	const docs: IDoc[] = getAllDocs(lang)

	return (
		<div className="flex h-screen flex-col">
			<ScrollProgress />
			<Header
				docs={docs}
				lang={lang}
			/>

			<div className="flex-1 flex">
				<Sidebar
					docs={docs}
					lang={lang}
				/>
				<div className="flex-1 docs-scroll">{children}</div>
			</div>
		</div>
	)
}
