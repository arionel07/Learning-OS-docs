// ─────────────────────────────────────────────
// COMPONENT

import { ICalloutProps } from '@/types/docs.type'
import { CALLOUT_CONFIG } from './config/mdx.config'

// ─────────────────────────────────────────────
export function Callout({ type = 'info', title, children }: ICalloutProps) {
	const config = CALLOUT_CONFIG[type]
	return (
		<div
			className={`my-4 flex gap-3 rounded-lg border p-4 ${config.border} ${config.container}`}
		>
			{/* Icon */}
			<div
				className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${config.iconBg}`}
			>
				{config.icon}
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0">
				<p className={`text-sm font-semibold mb-0.5 ${config.title}`}>
					{title ?? config.label}
				</p>
				<div className={`text-sm leading-6 ${config.body}`}>{children}</div>
			</div>
		</div>
	)
}
