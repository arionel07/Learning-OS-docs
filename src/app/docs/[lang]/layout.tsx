import { Header } from '@/components/header/Header'
import Sidebar from '@/components/sidebar/Sidebar'
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
		<div className="flex h-screen">
			<Sidebar
				docs={docs}
				lang={lang}
			/>
			<div className="flex-1 flex flex-col">
				<Header
					docs={docs}
					lang={lang}
				/>
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	)
}
