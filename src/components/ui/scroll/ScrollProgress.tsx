'use client'
import { useEffect, useState } from 'react'

export function ScrollProgress() {
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement
			const total = scrollHeight - clientHeight
			const current = total > 0 ? (scrollTop / total) * 100 : 0
			setProgress(Math.min(100, Math.max(0, current)))
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none">
			{/* Track */}
			<div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50" />

			{/* Progress — градиент от нейтрального к акцентному */}
			<div
				className="absolute inset-y-0 left-0 transition-[width] duration-75 ease-out"
				style={{
					width: `${progress}%`,
					background: `linear-gradient(
            90deg,
            #a1a1aa 0%,
            #71717a 40%,
            #B3644B 100%
          )`
				}}
			/>

			{/* Светящаяся точка на конце */}
			<div
				className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full
          transition-[left] duration-75 ease-out"
				style={{
					left: `calc(${progress}% - 2px)`,
					background: '#B3644B',
					boxShadow: '0 0 6px 2px rgba(179, 100, 75, 0.6)',
					opacity: progress > 1 ? 1 : 0
				}}
			/>
		</div>
	)
}
