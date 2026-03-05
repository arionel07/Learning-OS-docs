'use client'
import { LINES } from '@/config/lines.config'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
	const [visible, setVisible] = useState<number[]>([])
	const [cursor, setCursor] = useState(true)

	useEffect(() => {
		LINES.forEach((line, i) => {
			setTimeout(() => {
				setVisible(v => [...v, i])
			}, line.delay)
		})

		const cursorInterval = setInterval(() => {
			setCursor(c => !c)
		}, 530)

		return () => clearInterval(cursorInterval)
	}, [])

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-[#0a0a0a]">
			{/* Terminal window */}
			<div className="w-full max-w-xl rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
				{/* Title bar */}
				<div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
					<div className="w-3 h-3 rounded-full bg-red-400" />
					<div className="w-3 h-3 rounded-full bg-yellow-400" />
					<div className="w-3 h-3 rounded-full bg-green-400" />
					<span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
						bash — learningos-docs
					</span>
				</div>

				{/* Terminal body */}
				<div className="bg-zinc-50 dark:bg-[#0d0d0d] px-5 py-5 font-mono text-xs min-h-48 space-y-1.5">
					{LINES.map((line, i) => (
						<div
							key={i}
							className={`transition-opacity duration-200 leading-5 
								${visible.includes(i) ? 'opacity-100' : 'opacity-0'} 
								${line.type === 'cmd' ? 'text-zinc-700 dark:text-zinc-300' : ''} 
								${line.type === 'info' ? 'text-zinc-400 dark:text-zinc-500' : ''} 
								${line.type === 'error' ? 'text-red-500 dark:text-red-400 font-semibold' : ''} 
								${line.type === 'trace' ? 'text-zinc-400 dark:text-zinc-600' : ''} 
								${line.type === 'hint' ? 'text-emerald-600 dark:text-emerald-400' : ''}
              `}
						>
							{line.text}
						</div>
					))}

					{/* Blinking cursor */}
					{visible.length === LINES.length && (
						<div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
							<span>$</span>
							<span
								className={`inline-block w-2 h-4 bg-zinc-700 dark:bg-zinc-300 transition-opacity duration-100 ${cursor ? 'opacity-100' : 'opacity-0'}`}
							/>
						</div>
					)}
				</div>
			</div>

			{/* 404 */}
			<div className="flex items-center gap-4 mb-8">
				<span className="text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					404
				</span>
				<div className="w-px h-12 bg-zinc-200 dark:bg-zinc-700" />
				<p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
					This page could not
					<br />
					be found.
				</p>
			</div>

			{/* Link back */}
			<Link
				href={'/docs/en'}
				className="mt-6 flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-150"
			>
				<ChevronLeft size={12} />
				Back to docs
			</Link>
		</div>
	)
}
