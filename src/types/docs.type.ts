// ─────────────────────────────────────────────
// FRONTMATTER
// ─────────────────────────────────────────────

import { ReactNode } from 'react'

/** Frontmatter metadata parsed from the top of a .md file */
export interface IDocFrontmatter {
	title: string
	description?: string
	/** Controls display order in sidebar (lower = higher) */
	order?: number
	/** Hide this page from sidebar (e.g. draft) */
	draft?: boolean
	/** Wiki-link aliases: [[my alias]] → this page */
	aliases?: string[]
	/** Tags for future filtering/search */
	tags?: string[]
}

// ─────────────────────────────────────────────
// LANGUAGE & THEME
// ─────────────────────────────────────────────

/** Supported UI languages */
export type TLanguage = 'en' | 'ru'

/** Supported color themes */
export type TTheme = 'light' | 'dark'

// ─────────────────────────────────────────────
// DOCUMENT
// ─────────────────────────────────────────────

/** A single Markdown document parsed from the file system */
export interface IDoc {
	slug: string[] // editor/links.md
	frontmatter: IDocFrontmatter // ["editor", "links"]
	content: string // markdown content
	lang: TLanguage //document language
	isIndex?: boolean
	isMdx?: boolean
}

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────

// * Side menu item.
// * Can be either a page or a group.
export interface ISidebarItem {
	title: string //Display text (from frontmatter.title or folder name)
	slug: string[] // Slug path segments used to build href
	isFolder?: boolean // Whether this node is a folder (no direct page)
	children?: ISidebarItem[] // Nested children (folders or pages)
	order?: number //From frontmatter — used for sorting
	draft?: boolean //Hidden drafts are excluded from sidebar
}

// ─────────────────────────────────────────────
// WIKI-LINKS
// ─────────────────────────────────────────────

/** A parsed wiki-link: [[page]] or [[page|alias]] */
export interface IWikiLink {
	target: string //Raw target as written: "editor/links" or "links"
	label: string // Display label
	resolvedSlug: string[] | null //Resolved slug array after lookup (null if page not found)
}

// ─────────────────────────────────────────────
// DOCS INDEX (for wiki-link resolution)
// ─────────────────────────────────────────────

/**
 * Flat lookup map built from all docs.
 * Key: last slug segment or alias → IDoc
 * Used to resolve [[wiki-links]] quickly.
 */
export type TDocsIndex = Map<string, IDoc>

// ─────────────────────────────────────────────
// MDX
// ─────────────────────────────────────────────
/** Compiled MDX result from next-mdx-remote */
export interface IMDXResult {
	/** Compiled React element ready to render */
	content: React.ReactElement
	/** Parsed frontmatter from MDX file */
	frontmatter: Record<string, unknown>
}

/** Props passed to every MDX custom component */
export interface IMDXComponentProps {
	children?: ReactNode
	className?: string
}

/** Callout types matching visual styles */
export type TCalloutType = 'info' | 'warning' | 'danger' | 'success' | 'tip'

// Callout config props
export interface ICalloutConfigProps {
	icon: string
	label: string
	container: string
	iconBg: string
	title: string
	body: string
	border: string
}

/** Props for <Callout> MDX component */
export interface ICalloutProps {
	type?: TCalloutType
	title?: string
	children: ReactNode
}

/** Single tab item */
export interface ITabItem {
	label: string
	children: ReactNode
}

/** Props for <Tabs> MDX component */
export interface ITabsProps {
	/** Tab labels e.g. ["npm", "yarn", "bun"] */
	items: string[]
	children: ReactNode
}

/** Props for <CodeBlock> MDX component */
export interface ICodeBlockProps {
	/** Language for syntax highlighting e.g. "typescript" */
	language?: string
	/** Optional filename shown in header */
	filename?: string
	children: string
}

// ─────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────
/** A single search result returned by searchDocs() */
export interface ISearchResult {
	slug: string[]
	title: string
	description?: string
	/** Matched excerpt from content */
	excerpt: string
	lang: string
}
