// Writes src/lib/tokens.json from tokens.ts so non-JS consumers (Go/Wails, Python) can read the palette.
import { writeFileSync } from 'node:fs';
import { color, semantic, series, font, wailsBackground } from '../src/lib/tokens.ts';

const out = { color, semantic, series, font, wailsBackground };
writeFileSync(new URL('../src/lib/tokens.json', import.meta.url), JSON.stringify(out, null, '\t') + '\n');
console.log('wrote src/lib/tokens.json');
