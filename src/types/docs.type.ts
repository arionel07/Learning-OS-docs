// * Frontmatter metadata for a Markdown document.
// * This data is located at the top of the .md file.
export interface IDocFrontmatter {
	title: string
	description?: string
	order?: number
}

/** Supported languages ​​*/
export type TLanguage = 'en' | 'ru'

// * Represents a single Markdown document
// * after reading and parsing from the file system.
export interface IDoc {
	slug: string[] // editor/links.md
	frontmatter: IDocFrontmatter // ["editor", "links"]
	content: string // markdown content
	lang: TLanguage //document language
}

// * Side menu item.
// * Can be either a page or a group.
export interface ISidebarItem {
	title: string //Display text
	slug: string[] // Link to page
	children?: ISidebarItem[] // Nested elements (if it's a group)
}

//Supported interface themes.
export type TTheme = 'light' | 'dark'
