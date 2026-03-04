import { ICalloutConfigProps, TCalloutType } from '@/types/docs.type'

// ─────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────

export const CALLOUT_CONFIG: Record<TCalloutType, ICalloutConfigProps> = {
	info: {
		icon: 'ℹ',
		label: 'Info',
		border: 'border-blue-200 dark:border-blue-800',
		container: 'bg-blue-50 dark:bg-blue-950/30',
		iconBg: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
		title: 'text-blue-900 dark:text-blue-200',
		body: 'text-blue-800 dark:text-blue-300'
	},
	warning: {
		icon: '⚠',
		label: 'Warning',
		border: 'border-amber-200 dark:border-amber-800',
		container: 'bg-amber-50 dark:bg-amber-950/30',
		iconBg:
			'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
		title: 'text-amber-900 dark:text-amber-200',
		body: 'text-amber-800 dark:text-amber-300'
	},
	danger: {
		icon: '✕',
		label: 'Danger',
		border: 'border-red-200 dark:border-red-800',
		container: 'bg-red-50 dark:bg-red-950/30',
		iconBg: 'bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400',
		title: 'text-red-900 dark:text-red-200',
		body: 'text-red-800 dark:text-red-300'
	},
	success: {
		icon: '✓',
		label: 'Success',
		border: 'border-emerald-200 dark:border-emerald-800',
		container: 'bg-emerald-50 dark:bg-emerald-950/30',
		iconBg:
			'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
		title: 'text-emerald-900 dark:text-emerald-200',
		body: 'text-emerald-800 dark:text-emerald-300'
	},
	tip: {
		icon: '★',
		label: 'Tip',
		border: 'border-purple-200 dark:border-purple-800',
		container: 'bg-purple-50 dark:bg-purple-950/30',
		iconBg:
			'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400',
		title: 'text-purple-900 dark:text-purple-200',
		body: 'text-purple-800 dark:text-purple-300'
	}
}
