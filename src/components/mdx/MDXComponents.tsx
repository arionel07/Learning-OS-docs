import type { MDXComponents as MDXComponentsType } from 'mdx/types'
import { Callout } from './Callout'
import { Tab, Tabs } from './Tabs'

export const MDXComponents: MDXComponentsType = {
	// ─────────────────────────────────────────────
	// CUSTOM COMPONENTS
	// ─────────────────────────────────────────────

	Callout,
	Tabs,
	Tab,

	// ─────────────────────────────────────────────
	// HTML OVERRIDES
	// ─────────────────────────────────────────────

	h1: ({ children }) => (
		<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-4">
			{children}
		</h1>
	),

	h2: ({ children }) => (
		<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mt-8 mb-3 pb-1 border-b border-zinc-100 dark:border-zinc-800">
			{children}
		</h2>
	),

	h3: ({ children }) => (
		<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mt-6 mb-2">
			{children}
		</h3>
	),

	p: ({ children }) => (
		<p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300 mb-4">
			{children}
		</p>
	),

	a: ({ children, href }) => (
		<a
			href={href}
			className="text-sm font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-600 hover:decoration-zinc-900 dark:hover:decoration-zinc-300 transition-colors"
		>
			{children}
		</a>
	),

	ul: ({ children }) => (
		<ul className="my-4 ml-4 space-y-1.5 list-disc marker:text-zinc-400">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="my-4 ml-4 space-y-1.5 list-disc marker:text-zinc-400">
			{children}
		</ol>
	),

	li: ({ children }) => (
		<li className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
			{children}
		</li>
	),

	code: ({ children }) => (
		<code className="px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"></code>
	),

	pre: ({ children }) => (
		<pre className="my-4 p-4 rounded-lg overflow-x-auto text-xs bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 text-zinc-100"></pre>
	),

	blockquote: ({ children }) => (
		<blockquote className="my-4 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 italic"></blockquote>
	),

	hr: ({ children }) => (
		<hr className="my-6 border-zinc-100 dark:border-zinc-800" />
	),

	table: ({ children }) => (
		<div className="my-4 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
			<table className="w-full text-sm"></table>
		</div>
	),

	th: ({ children }) => (
		<th className="px-4 py-2.5 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
			{children}
		</th>
	),

	td: ({ children }) => (
		<td className="px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
			{children}
		</td>
	)
}
