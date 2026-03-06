import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const title = searchParams.get('title') ?? 'Learning OS Docs'
	const description = searchParams.get('description') ?? ''
	const lang = searchParams.get('lang') ?? 'en'

	return new ImageResponse(
		<div
			style={{
				width: '1200px',
				height: '630px',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
				padding: '64px',
				backgroundColor: '#0a0a0a',
				fontFamily: 'sans-serif'
			}}
		>
			{/* Grid pattern */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
					backgroundSize: '48px 48px'
				}}
			/>

			{/* Glow */}
			<div
				style={{
					position: 'absolute',
					top: '-100px',
					right: '-100px',
					width: '600px',
					height: '600px',
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)'
				}}
			/>

			{/* Site name */}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					marginBottom: '24px'
				}}
			>
				<span style={{ color: '#52525b', fontSize: '14px' }}>Learnin OS</span>
				<span style={{ color: '#3f3f46', fontSize: '14px' }}>/</span>
				<span
					style={{
						color: '#52525b',
						fontSize: '14px',
						textTransform: 'uppercase'
					}}
				>
					{lang}
				</span>
			</div>

			{/* Title */}
			<div
				style={{
					fontSize: '56px',
					fontWeight: 700,
					color: '#fafafa',
					lineHeight: 1.1,
					marginBottom: '16px',
					maxWidth: '900px'
				}}
			>
				{title}
			</div>

			{/* Description */}
			{description && (
				<div
					style={{
						fontSize: '20px',
						color: '#71717a',
						maxWidth: '800px',
						lineHeight: 1.5
					}}
				>
					{description}
				</div>
			)}

			{/* Bottom bar */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: '3px',
					background: 'linear-gradient(90deg, #a1a1aa, #B3644B)'
				}}
			/>
		</div>,
		{ width: 1200, height: 630 }
	)
}
