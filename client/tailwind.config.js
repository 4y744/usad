/** @type {import('tailwindcss').Config} */
module.exports = {
	experimental: {
		optimizeUniversalDefaults: true
	},
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
		'inter': ['Inter', 'system-ui'],
		'fira': ['Fira Code', 'system-ui'],
		'jbm': ['JetBrains Mono', 'system-ui'],
		'monospace': ['monospace', 'system-ui']
		},
		extend: {
		transitionProperty: {
			'max-height': 'max-height',
			'height': 'height',
			'width': 'width',
			'background': 'background',
			'padding': 'padding',
			'border': 'border',
			'rounded': 'border-radius'
		},
		backgroundImage: {
			'home-headline': "url('/src/assets/svgs/home-headline.svg')",
		},
		fontSize: {
			'2xs': '0.625rem'
		},
		}
	},
	safelist: [
		"bg-green-700",
		"bg-green-600",
		"bg-red-700",
		"bg-red-600",
		"bg-sky-700",
		"bg-sky-600",
		"outline-green-600",
		"outline-red-600",
		"outline-sky-600",
		"border-green-600",
		"border-red-600",
		"border-sky-600"
	],
	plugins: [],
	experimental: {
		optimizeUniversalDefaults: true
	}
}

