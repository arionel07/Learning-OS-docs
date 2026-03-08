'use client'
import { ToggleThemeButton } from '@/components/ui/button/theme/ToggleThemeButton'
import { FEATURES, ICON_COLORS } from '@/config/home.config'
import { useCopy } from '@/hooks/useCopy'
import { themeAtom } from '@/store/theme.store'
import { useAtomValue } from 'jotai'
import { ArrowDownToLine, Check, Copy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import LightLogo from '../../public/android-chrome-512x512-Photoroom(1).png'
import darkLogo from '../../public/android-chrome-512x512.png'

// ── install commands ─────────────────────────────────────────────────────────
const CMDS = {
	bun: 'bun add @learning-os/core',
	npm: 'npm install @learning-os/core',
	pnpm: 'pnpm add @learning-os/core',
	yarn: 'yarn add @learning-os/core'
} as const
type Pkg = keyof typeof CMDS

export default function Home() {
	const theme = useAtomValue(themeAtom)
	const [pkg, setPkg] = useState<Pkg>('bun')

	const { copied, copy } = useCopy()
	//const featReveal = useReveal()
	//const usageReveal = useReveal()

	return (
		<div className="relative min-h-screen bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 font-sans overflow-x-hidden">
			{/* ── GRID BACKGROUND ── */}
			<div
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] dark:opacity-[0.4]"
				style={{
					backgroundImage: `
            linear-gradient(var(--grid-color, rgba(0,0,0,0.08)) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-color, rgba(0,0,0,0.08)) 1px, transparent 1px)
          `,
					backgroundSize: '40px 40px'
				}}
			/>
			<style>{`
        .dark { --grid-color: rgba(255,255,255,0.06); }
      `}</style>
			{/* ── NAV ── */}
			<nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
				<div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
					{/* Logo + links */}
					<div className="flex items-center gap-8">
						<Link
							href={'/'}
							className="flex items-center gap-2.5 shrink-0"
						>
							<Image
								src={theme === 'dark' ? darkLogo : LightLogo}
								height={28}
								width={28}
								className="rounded-md border border-zinc-900 dark:border-zinc-200"
								alt="logo"
							/>
							<span className="font-['Instrument_Serif'] text-[17px] text-zinc-900 dark:text-zinc-50 tracking-tight">
								Learning OS
							</span>
						</Link>

						<div className="hidden sm:flex items-center gap-5">
							{['Docs', 'Changelog', 'Github'].map(l => (
								<Link
									key={l.length}
									href={
										l === 'Docs'
											? '/docs/en'
											: l === 'Changelog'
												? 'https://github.com/arionel07'
												: 'https://github.com/arionel07/Learning-OS-docs'
									}
									className="text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
								>
									{l}
								</Link>
							))}
						</div>
					</div>

					{/* Right CTA */}
					<div className="flex items-center ">
						<ToggleThemeButton />
						<Link
							href={'#install'}
							className="ml-3 text-[13px] font-medium px-3.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
						>
							Get Started →
						</Link>
					</div>
				</div>
			</nav>

			{/* ── MAIN ── */}
			<main className="relative z-10">
				{/* ── HERO ── */}
				<section className="max-w-3xl mx-auto px-6 pt-20 pb-14 text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 text-[11px] font-['GeistMono',monospace] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full px-3.5 py-1.5 mb-8 bg-white dark:bg-zinc-900">
						<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
						Early Access — v0.1.0
					</div>
					{/* Heading */}
					<h1 className="text-[clamp(36px,6vw,62px)] font-semibold tracking-[-0.04em] leading-[1.1] text-zinc-900 dark:text-zinc-50 mb-5">
						Your knowledge,{' '}
						<em className="font-['Instrument_Serif'] font-normal not-italic text-zinc-400 dark:text-zinc-500">
							structured by design
						</em>
					</h1>

					<p className="text-[15px] text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
						A note-taking system built around intentional architecture. Choose
						your structure — link books, todos, timers, and stats in one living
						graph.
					</p>

					{/* CTAs */}
					<div className="flex items-center justify-center gap-3 flex-wrap">
						<Link
							href={'#'}
							className="inline-flex items-center gap-2 text-[14px] font-medium px-5 py-2.5 rounded-md bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:opacity-85 transition-opacity"
						>
							<ArrowDownToLine size={14} />
							Download for macOS
						</Link>
						<Link
							href={'/docs/en'}
							className="inline-flex items-center gap-2 text-[14px] font-medium px-5 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
						>
							Read the docs →
						</Link>
					</div>
				</section>

				{/* ── INSTALL CARD ── */}
				<div
					id="install"
					className="max-w-[600px] mx-auto px-6 mb-20"
				>
					<div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
						{/* Tabs */}
						<div className="flex border-b border-zinc-200 dark:border-zinc-800 px-4">
							{(Object.keys(CMDS) as Pkg[]).map(p => (
								<button
									key={p}
									onClick={() => setPkg(p)}
									className={[
										"font-['GeistMono',monospace] text-[11px] px-3 py-2.5 border-b-[1.5px] -mb-px transition-colors tracking-wide",
										pkg === p
											? 'text-zinc-900 dark:text-zinc-50 border-zinc-900 dark:border-zinc-50'
											: 'text-zinc-400 dark:text-zinc-500 border-transparent hover:text-zinc-600 dark:hover:text-zinc-300'
									].join(' ')}
								>
									{p}
								</button>
							))}
						</div>
						{/* Command */}
						<div className="flex items-center justify-between px-4 py-3">
							<code className="font-['GeistMono',monospace] text-[13px] text-zinc-700 dark:text-zinc-200 flex gap-2">
								<span className="text-zinc-400">$</span>
								{pkg === 'bun' && (
									<>
										<span className="text-[#F471B7]">bun</span>
										<span>add</span>
										<span className="text-blue-400">@learning-os/core</span>
									</>
								)}
								{pkg === 'npm' && (
									<>
										<span className="text-red-400">npm</span>
										<span>install</span>
										<span className="text-blue-400">@learning-os/core</span>
									</>
								)}
								{pkg === 'pnpm' && (
									<>
										<span className="text-[#F69220]">pnpm</span>
										<span>add</span>
										<span className="text-blue-400">@learning-os/core</span>
									</>
								)}
								{pkg === 'yarn' && (
									<>
										<span className="text-[#2188B6]">yarn</span>
										<span>add</span>
										<span className="text-blue-400">@learning-os/core</span>
									</>
								)}
							</code>
							<button
								className={
									"font-['GeistMono',monospace] text-[11px] px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-300"
								}
								onClick={() => copy(CMDS[pkg])}
							>
								{copied ? (
									<Check
										color="#00d492"
										size={13}
									/>
								) : (
									<Copy size={13} />
								)}
							</button>
						</div>
					</div>
				</div>
				{/* ── DIVIDER ── */}
				<hr className="border-zinc-200 dark:border-zinc-800 max-w-5xl mx-auto" />

				{/* ── FEATURES ── */}
				<section className="max-w-5xl mx-auto px-6 py-16 transition-all duration-700">
					<p className="font-['GeistMono',monospace] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 mb-2">
						// Features
					</p>
					<h2 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-10">
						Everything{' '}
						<em className="font-['Instrument_Serif'] font-normal not-italic text-zinc-400 dark:text-zinc-500">
							connected
						</em>
					</h2>

					<div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-zinc-200 dark:border-zinc-800 rounded-md overflow-hidden"
						style={{ gap: '1px', background: 'var(--tw-border-opacity, 1)' }}
					>
						{/* Trick: wrap each card in a bg div so the 1px gap shows as border */}
						{FEATURES.map(f => (
							<div
								key={f.title}
								className={`bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors p-6 group `}
							>
								<div
									className={`w-8 h-8 rounded-md flex items-center justify-center border border-zinc-[${ICON_COLORS[f.color]}] text-[15px] mb-4 ${ICON_COLORS[f.color]}`}
								>
									<f.icon size={18} />
								</div>
								<h3 className="text-[14px] font-medium text-zinc-900 dark:text-zinc-50 mb-1.5 tracking-[-0.01em]">
									{f.title}
								</h3>
								<p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
									{f.desc}
								</p>
								<span className="inline-block mt-3 font-['GeistMono',monospace] text-[10px] text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 rounded px-1.5 py-0.5 tracking-wide">
									{f.tag}
								</span>
							</div>
						))}
					</div>
				</section>

				<hr className="border-zinc-200 dark:border-zinc-800 max-w-5xl mx-auto" />

				{/* ── USAGE / EXAMPLES ── */}
				<section className="max-w-5xl mx-auto px-6 py-16 transition-all duration-700 delay-100">
					<p className="font-['GeistMono',monospace] text-[11px] uppercase tracking-[0.08em] text-zinc-400 dark:text-zinc-500 mb-2">
						// Examples
					</p>
					<h2 className="text-[clamp(22px,3vw,32px)] font-semibold tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 mb-10">
						How it{' '}
						<em className="font-['Instrument_Serif'] font-normal not-italic text-zinc-400 dark:text-zinc-500">
							looks in practice
						</em>
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{/* Card 1 — note */}
						<div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
							<div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
								<span className="w-2.5 h-2.5 rounded-full bg-red-400" />
								<span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
								<span className="w-2.5 h-2.5 rounded-full bg-green-400" />
								<span className="ml-2 font-['GeistMono',monospace] text-[11px] text-zinc-400">
									books/literature
								</span>
							</div>
							<div className="p-4 font-['GeistMono',monospace] text-[12px] leading-[1.9] text-zinc-500 dark:text-zinc-400">
								<div>
									<span className="text-zinc-400 dark:text-zinc-500">
										# Brothers Karamazov
									</span>
								</div>
								<div>
									<span className="text-violet-500">id:</span>
									<span className="text-emerald-500">LIT-0042</span>
								</div>
								<div>
									<span className="text-violet-500">tags:</span>{' '}
									<span className="text-emerald-500">
										[novel, russian, classic]
									</span>
								</div>
								<div>
									<span className="text-violet-500">genre:</span>{' '}
									<span className="text-emerald-500">fiction/realism</span>
								</div>
								<div>
									<span className="text-violet-500">timer:</span>{' '}
									<span className="text-blue-400">→ TMR-0042</span>
								</div>
								<div>
									<span className="text-violet-500">todo:</span>{' '}
									<span className="text-blue-400">→ TD-0042</span>
								</div>
								<div className="mt-1">
									<span className="text-zinc-400 dark:text-zinc-500">
										## Progress
									</span>
								</div>
								<div>
									<span className="text-orange-400">▓▓▓▓▓▓░░░░</span>{' '}
									<span className="text-emerald-500">62%</span>
								</div>
							</div>
						</div>
						{/* Card 2 — stats */}
						<div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
							<div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800">
								<span className="w-2.5 h-2.5 rounded-full bg-red-400" />
								<span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
								<span className="w-2.5 h-2.5 rounded-full bg-green-400" />
								<span className="ml-2 font-['GeistMono',monospace] text-[11px] text-zinc-400">
									stats/weekly
								</span>
							</div>
							<div className="p-4 font-['GeistMono',monospace] text-[12px] leading-[1.9] text-zinc-500 dark:text-zinc-400">
								<div>
									<span className="text-zinc-400 dark:text-zinc-500">
										# Week 12 Stats
									</span>
								</div>
								<div>&nbsp;</div>
								<div>
									<span className="text-blue-400">Literature </span>{' '}
									<span className="text-emerald-500">4h 20m</span>
								</div>
								<div>
									<span className="text-blue-400">Programming</span>{' '}
									<span className="text-emerald-500">6h 50m</span>
								</div>
								<div>
									<span className="text-blue-400">Mathematics</span>{' '}
									<span className="text-emerald-500">2h 15m</span>
								</div>
								<div>
									<span className="text-blue-400">Fitness </span>{' '}
									<span className="text-emerald-500">3h 00m</span>
								</div>
								<div>&nbsp;</div>
								<div>
									<span className="text-violet-500">total:</span>{' '}
									<span className="text-orange-400">16h 25m</span>
								</div>
								<div>
									<span className="text-violet-500">streak:</span>{' '}
									<span className="text-emerald-500">12 days 🔥</span>
								</div>
							</div>
						</div>
					</div>

					{/* File tree */}
					<div className="mt-5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 font-['GeistMono',monospace] text-[12px] leading-[2] text-zinc-500 dark:text-zinc-400">
						{[
							{ indent: 0, branch: '.', name: 'learning-os/', extra: '' },
							{ indent: 1, branch: '├─', name: 'books/', extra: '' },
							{
								indent: 2,
								branch: '├─',
								name: 'literature/',
								extra: (
									<span className="text-zinc-400 dark:text-zinc-600">
										{' '}
										— novels, horror, poetry
									</span>
								)
							},
							{
								indent: 3,
								branch: '└─',
								name: 'brother-karamazov',
								extra: <span className="text-blue-400"> #LIT-0042</span>
							},
							{
								indent: 2,
								branch: '└─',
								name: 'programming/',
								extra: (
									<span className="text-zinc-400 dark:text-zinc-600">
										{' '}
										— algorithms, systems, web
									</span>
								)
							},
							{ indent: 1, branch: '├─', name: 'timers/', extra: '' },
							{ indent: 1, branch: '├─', name: 'todos/', extra: '' },
							{
								indent: 1,
								branch: '├─',
								name: 'fitness/',
								extra: (
									<span className="text-zinc-400 dark:text-zinc-600">
										{' '}
										— imported from FitApp
									</span>
								)
							},
							{ indent: 1, branch: '└─', name: 'graph.canvas', extra: '' }
						].map((row, i) => (
							<div
								key={i}
								style={{ paddingLeft: `${row.indent * 16}px` }}
								className="flex items-baseline gap-1.5"
							>
								<span className="text-zinc-300 dark:text-zinc-700">
									{row.branch}
								</span>
								<span className="text-zinc-700 dark:text-zinc-200">
									{row.name}
								</span>
								{row.extra}
							</div>
						))}
					</div>
				</section>
			</main>

			{/* ── FOOTER ── */}
			<footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800 max-w-5xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
				<div className="flex items-center gap-2.5">
					<Image
						src={theme === 'dark' ? darkLogo : LightLogo}
						alt="logo"
						width={20}
						height={20}
						className="rounded border border-zinc-900 dark:border-zinc-200"
					/>
					<p className="flex items-center font-['GeistMono',monospace] text-[12px] text-zinc-400">
						Learning OS ·{' '}
						<p className="underline decoration-green-400 text-green-400">
							early access
						</p>{' '}
						·
						<span className="ml-2 p-2 rounded-3xl dark:bg-zinc-100 bg-zinc-900 dark:text-zinc-900 text-zinc-50">
							2026
						</span>
					</p>
				</div>
				<div className="flex gap-5">
					{['GitHub', 'Docs', 'Changelog'].map(l => (
						<Link
							key={l.length}
							href={
								l === 'Docs'
									? '/docs/en'
									: l === 'Changelog'
										? 'https://github.com/arionel07'
										: 'https://github.com/arionel07/Learning-OS-docs'
							}
							className="text-[12px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
						>
							{l}
						</Link>
					))}
				</div>
			</footer>
		</div>
	)
}
