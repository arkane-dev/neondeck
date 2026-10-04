// WCAG 2.2 contrast audit of every color pair NEONDECK components actually render.
//   1.4.3  AA text: 4.5:1 normal, 3:1 large (≥24px or ≥18.66px bold)
//   1.4.11 AA non-text: 3:1 for component boundaries, focus rings, meaningful graphics
// Exits 1 on any failure. Run: npm run contrast
import { color as C, paperMode as P } from '../src/lib/tokens.ts';

const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (a: number[]) => '#' + a.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
/** `t` of a composited over opaque b (for color-mix tints). */
const mix = (a: string, b: string, t: number) => hex(rgb(a).map((v, i) => v * t + rgb(b)[i] * (1 - t)));
const lum = (h: string) => {
	const [r, g, b] = rgb(h)
		.map((v) => v / 255)
		.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
	const [x, y] = [lum(a), lum(b)];
	return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

type Check = { group: string; name: string; fg: string; bg: string; need: number };
const checks: Check[] = [];
const add = (group: string, name: string, fg: string, bg: string, need: number) =>
	checks.push({ group, name, fg, bg, need });

const surfaces = { void: C.void, bg: C.bg, 'surface-1': C.surface1, 'surface-2': C.surface2, 'surface-3': C.surface3 };
for (const [s, bg] of Object.entries(surfaces)) {
	add('1.4.3 text', `text on ${s}`, C.text, bg, 4.5);
	add('1.4.3 text', `text-dim on ${s}`, C.textDim, bg, 4.5);
	add('1.4.3 text', `text-mute on ${s}`, C.textMute, bg, 4.5);
}

const neon = { magenta: C.magenta, pink: C.pink, cyan: C.cyan, blue: C.blue, violet: C.violet, yellow: C.yellow, red: C.red, jade: C.jade, gold: C.gold };
for (const [n, c] of Object.entries(neon)) {
	add('1.4.3 neon text', `${n} on bg`, c, C.bg, 4.5);
	add('1.4.3 neon text', `${n} on surface-2`, c, C.surface2, 4.5);
	add('1.4.3 neon fill', `text-on-neon on ${n} fill`, C.textOnNeon, c, 4.5);
	add('1.4.3 tag', `Tag ${n} (10% tint on surface-1)`, c, mix(c, C.surface1, 0.1), 4.5);
	add('1.4.11 non-text', `Meter lit ${n} vs unlit line`, c, C.line, 3);
}
add('1.4.3 tag', 'Tag muted (10% tint on surface-1)', C.textMute, mix(C.textMute, C.surface1, 0.1), 4.5);
add('1.4.3 hover', 'text on accent-tint row hover', C.text, mix(C.magenta, C.surface1, 0.14), 4.5);
add('1.4.3 hover', 'magenta on outline-button hover', C.magenta, mix(C.magenta, C.bg, 0.14), 4.5);

add('1.4.11 non-text', 'panel/input edge (line-strong) vs bg', C.lineStrong, C.bg, 3);
add('1.4.11 non-text', 'panel/input edge (line-strong) vs surface-1', C.lineStrong, C.surface1, 3);
add('1.4.11 non-text', 'input edge vs field (void)', C.lineStrong, C.void, 3);
add('1.4.11 non-text', 'focus ring (cyan) vs bg', C.cyan, C.bg, 3);
add('1.4.11 non-text', 'focus ring (cyan) vs surface-3', C.cyan, C.surface3, 3);

// China layer
for (const [n, c] of Object.entries(neon)) {
	// NeonSign: glyph = 35% tone + white, on 7% tone over void; caption = tone on void
	add('china', `NeonSign ${n} glyph`, mix(c, '#ffffff', 0.35), mix(c, C.void, 0.07), 4.5);
	add('china', `NeonSign ${n} caption`, c, C.void, 4.5);
}
// MoonScroll: the inscription carries a solid --nd-void outline (≥1.2% of moon ≈ 3px at the smallest size),
// so WCAG measures glyph vs outline (Understanding 1.4.3: text halos/outlines count as the background).
// Moon tones are limited to the darker neons, so the fill also stays readable against bright dots (≥2.4:1).
const moonTones = { magenta: C.magenta, violet: C.violet, red: C.red, blue: C.blue };
for (const [n, c] of Object.entries(moonTones)) {
	const glyph = mix(c, '#ffffff', 0.12);
	add('china', `MoonScroll ${n}: inscription vs its outline (large)`, glyph, C.void, 3);
	add('china', `MoonScroll ${n}: fill vs brightest dot (legibility floor)`, glyph, c, 2.4);
}
add('china', 'MoonScroll pinyin (accent-2) on void strip', C.cyan, C.void, 4.5);
add('china', 'Seal: paper glyphs on cinnabar', C.paper, C.cinnabar, 4.5);
add('china', 'Seal relief: cinnabar on paper', C.cinnabar, C.paper, 4.5);
add('china', 'Seal block vs bg (non-text edge)', C.cinnabar, C.bg, 3);
const fogT = mix(C.fogTeal, C.bg, 0.22), fogR = mix(C.fogRose, C.bg, 0.28);
add('china', 'text-mute on teal fog (22%)', C.textMute, fogT, 4.5);
add('china', 'text-mute on rose fog (28%)', C.textMute, fogR, 4.5);
add('china', 'magenta on rose fog (28%)', C.magenta, fogR, 4.5);

add('paper', 'ink on paper', P.text, C.paper, 4.5);
add('paper', 'text-dim on paper', P.textDim, C.paper, 4.5);
add('paper', 'text-mute on paper', P.textMute, C.paper, 4.5);
add('paper', 'button: paper on ink fill', P.textOnAccent, P.accent, 4.5);
add('paper', 'input edge (line-strong) vs paper', P.lineStrong, C.paper, 3);
add('paper', 'sun on paper — LARGE text/graphics only', C.sun, C.paper, 3);

let fails = 0;
let group = '';
for (const c of checks) {
	if (c.group !== group) console.log(`\n[${(group = c.group)}]`);
	const r = ratio(c.fg, c.bg);
	const ok = r >= c.need;
	if (!ok) fails++;
	const aaa = c.need === 4.5 && r >= 7 ? ' AAA' : '    ';
	console.log(`${ok ? 'PASS' : 'FAIL'}${aaa} ${r.toFixed(2).padStart(5)}:1  (≥${c.need})  ${c.name}`);
}
console.log(`\n${checks.length - fails}/${checks.length} pass` + (fails ? ` — ${fails} FAIL` : ''));
process.exit(fails ? 1 : 0);
