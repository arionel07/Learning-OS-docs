'use client'
import { useEffect, useRef, useState } from 'react'

export function ScrollProgress() {
	const [progress, setProgress] = useState(0)
	const containerRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		const handleScroll = () => {
			const container = containerRef.current
			if (!container) return
			const { scrollTop, scrollHeight, clientHeight } = container
			const total = scrollHeight - clientHeight
			setProgress(total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0)
		}

		const interval = setInterval(() => {
			const container = document.querySelector('.docs-scroll') as HTMLElement
			if (!container) return
			containerRef.current = container
			container.addEventListener('scroll', handleScroll, { passive: true })
			clearInterval(interval)
		}, 50)

		return () => {
			clearInterval(interval)
			containerRef.current?.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<div className="fixed top-0 left-0 right-0 z-[200] h-[2px] pointer-events-none">
			<div
				className="h-full transition-[width] duration-75 ease-out"
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
			<div
				className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-[left] duration-75 ease-out"
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
