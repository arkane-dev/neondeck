/**
 * NEONDECK tokens as JS values, for places CSS variables can't reach:
 * canvas/WebGL, chart libraries, Wails window background (Go side reads tokens.json).
 * Keep in sync with styles/tokens.css.
 */
export const color = {
	void: '#03040c',
	bg: '#070818',
	surface1: '#0c0f26',
	surface2: '#12163a',
	surface3: '#1b1f4a',
	line: '#262a5c',
	lineStrong: '#5659a4',
	text: '#ecebff',
	textDim: '#a49fd9',
	textMute: '#8885b9',
	textOnNeon: '#070818',
	magenta: '#ff2bd6',
	pink: '#ff5fb4',
	cyan: '#22f2f7',
	blue: '#6077ff',
	violet: '#a66bff',
	yellow: '#f5ec58',
	red: '#ff3b52',
	streetMustard: '#efb22a',
	streetCoral: '#ef6352',
	streetTeal: '#0b5566',
	streetKhaki: '#a0966d',
	paper: '#ece4cf',
	paperDim: '#d5caa1',
	ink: '#121214',
	sun: '#e8202f'
} as const;

export const semantic = {
	accent: color.magenta,
	accent2: color.cyan,
	success: color.cyan,
	info: color.blue,
	warning: color.yellow,
	danger: color.red,
	focus: color.cyan
} as const;

/** Overrides inside .nd-paper (editorial poster blocks). */
export const paperMode = {
	text: color.ink,
	textDim: '#3a3632',
	textMute: '#696255',
	line: '#b9ae8c',
	lineStrong: '#8b8269',
	accent: color.ink,
	textOnAccent: color.paper
} as const;

/** Categorical chart series, in order. */
export const series = [
	color.magenta,
	color.cyan,
	color.yellow,
	color.violet,
	color.blue,
	color.streetCoral,
	color.streetMustard,
	color.pink
] as const;

export const font = {
	display: "'Chakra Petch', 'Rajdhani', system-ui, sans-serif",
	ui: "'Rajdhani', 'Chakra Petch', system-ui, sans-serif",
	mono: "'JetBrains Mono', ui-monospace, Menlo, monospace",
	cjk: "'Noto Sans JP', sans-serif"
} as const;

/** Wails: options.App{ BackgroundColour: &options.RGBA{R: 7, G: 8, B: 24, A: 255} } */
export const wailsBackground = { r: 7, g: 8, b: 24, a: 255 } as const;
