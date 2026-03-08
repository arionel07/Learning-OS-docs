import {
	AlarmClock,
	ChartColumnIncreasing,
	FileDown,
	Library,
	ShipWheel,
	Tag
} from 'lucide-react'

// ── features data ────────────────────────────────────────────────────────────

export const FEATURES = [
	{
		color: '#0e3c0e' as const,
		icon: Library,
		title: 'Structured Library',
		desc: 'Choose a template — Books, Math, Programming, Biology. Each auto-generates the folder architecture you need.',
		tag: 'architecture'
	},
	{
		color: 'blue' as const,
		icon: ShipWheel,
		title: 'Knowledge Graph',
		desc: 'Visual canvas connecting all your notes, todos, and resources. Inspired by Obsidian, built for learning paths.',
		tag: 'canvas'
	},
	{
		color: 'purple' as const,
		icon: AlarmClock,
		title: 'Timer + Todo',
		desc: 'Link timers and tasks directly to a book or subject. Track time spent and generate per-resource statistics.',
		tag: 'statistics'
	},
	{
		color: 'orange' as const,
		icon: FileDown,
		title: 'Smart Import',
		desc: 'Import PDFs, fitness data from your companion app, or any external resource. Auto-organized into the right folder.',
		tag: 'import'
	},
	{
		color: 'blue' as const,
		icon: Tag,
		title: 'Tags & IDs',
		desc: 'Every note gets a unique ID and custom tags. Cross-link any resource — connect Dostoevsky notes to literature stats.',
		tag: 'linking'
	},
	{
		color: 'green' as const,
		icon: ChartColumnIncreasing,
		title: 'Learning Analytics',
		desc: 'Time on task, progress curves, topic distribution. Understand exactly how you spend your learning time.',
		tag: 'analytics'
	}
]

export const ICON_COLORS = {
	green: 'bg-emerald-500/10 text-emerald-400 dark:text-emerald-400',
	blue: 'bg-blue-500/10   text-blue-400   dark:text-blue-400',
	purple: 'bg-violet-500/10 text-violet-400 dark:text-violet-400',
	orange: 'bg-orange-500/10 text-orange-400 dark:text-orange-400',
	'#0e3c0e': 'bg-emerald-900/40 text-emerald-300 dark:text-emerald-300'
}
