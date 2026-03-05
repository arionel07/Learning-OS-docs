// used for 404 page
export const LINES = [
	{ delay: 0, text: '$ next build', type: 'cmd' },
	{ delay: 300, text: 'info  - Creating an optimized build', type: 'info' },
	{
		delay: 600,
		text: 'error - Page not found: this route does not exist',
		type: 'error'
	},
	{ delay: 900, text: '', type: 'empty' },
	{ delay: 1100, text: '  > src/app/docs/[...slug]/page.tsx', type: 'trace' },
	{ delay: 1300, text: '    Could not resolve slug → 404', type: 'trace' },
	{ delay: 1600, text: '', type: 'empty' },
	{ delay: 1800, text: 'Try navigating back to a known page.', type: 'hint' }
]
