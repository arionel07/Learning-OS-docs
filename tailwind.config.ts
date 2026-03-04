module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}' // ← added content
	],
	theme: {
		extend: {
			keyframes: {
				shimmer: {
					'0%': { transform: 'translateX(-200%)' },
					'100%': { transform: 'translateX(400%)' }
				}
			},
			animation: {
				shimmer: 'shimmer 1.8s ease-in-out infinite'
			},
			typography: {
				// Prose customization for @tailwindcss/typography
				DEFAULT: {
					css: {
						maxWidth: 'none',
						code: {
							backgroundColor: 'rgb(244 244 245)',
							borderRadius: '0.25rem',
							padding: '0.125rem 0.375rem',
							fontWeight: '400'
						},
						'code::before': { content: '""' },
						'code::after': { content: '""' }
					}
				},
				invert: {
					css: {
						code: {
							backgroundColor: 'rgb(39 39 42)'
						}
					}
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography') // ← connecting
	],
	darkMode: 'class'
}
