import type { MinimizeOptions } from './fetchMarkdown'

export type PresetConfig = {
	/** The pretty title of the preset */
	title: string
	/** Optional description of the preset */
	description?: string
	/** The owner of the GitHub repository */
	owner: string
	/** The name of the GitHub repository */
	repo: string
	/** List of glob patterns for including files */
	glob: string[]
	/** List of glob patterns for excluding files */
	ignore?: string[]
	/** Optional prompt to provide additional context or instructions to language models */
	prompt?: string
	/** Minimization options for the content */
	minimize?: MinimizeOptions
	/** Whether this preset is distilled by an LLM */
	distilled?: boolean
	/** For distilled presets, the filename base to use */
	distilledFilenameBase?: string
}

const SVELTE_5_PROMPT =
	'Always use Svelte 5 runes and Svelte 5 syntax. Runes do not need to be imported, they are globals. $state() runes are always declared using `let`, never with `const`. When passing a function to $derived, you must always use $derived.by(() => ...). Error boundaries can only catch errors during component rendering and at the top level of an $effect inside the error boundary. Error boundaries do not catch errors in onclick or other event handlers.'

export const presets: Record<string, PresetConfig> = {
	'shadcn-svelte': {
		title: 'Shadcn Svelte',
		description: 'Complete documentation for Shadcn Svelte. shadcn/ui, but for Svelte.',
		owner: 'huntabyte',
		repo: 'shadcn-svelte',
		glob: ['docs/**/*.md', 'docs/**/*.mdx'],
		ignore: [],
		prompt: SVELTE_5_PROMPT,
		minimize: {
			removeLegacy: true,
			removePlaygroundLinks: true,
			removeNoteBlocks: true,
			removeDetailsBlocks: true,
			removeHtmlComments: true,
			normalizeWhitespace: true
		}
	}
}

export function transformAndSortPresets(
	presetsObject: Record<string, PresetConfig>
): (PresetConfig & { key: string })[] {
	return Object.entries(presetsObject)
		.map(([key, value]) => ({
			key: key.toLowerCase(),
			...value
		}))
		.sort()
}
