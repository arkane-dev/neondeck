<!-- NEONDECK showcase. This page IS the visual spec: if a new app doesn't look like this, it's off-brand. -->
<script lang="ts">
	import {
		AppShell, Panel, Button, SectionHeader, Readout, Meter, Tag, Input,
		HazardStripe, GlitchText, Barcode, Ruler, HanziMark, color
	} from '../lib/index.js';

	let handle = $state('');
	const swatches: [string, string, string][] = [
		['void', color.void, 'page edge'],
		['bg', color.bg, 'app background'],
		['surface-1', color.surface1, 'panels'],
		['surface-2', color.surface2, 'raised'],
		['surface-3', color.surface3, 'menus'],
		['line-strong', color.lineStrong, 'borders'],
		['text', color.text, 'copy'],
		['text-dim', color.textDim, 'labels']
	];
	const neon: [string, string, string][] = [
		['magenta', color.magenta, 'accent · brand · primary'],
		['cyan', color.cyan, 'accent-2 · success · links'],
		['yellow', color.yellow, 'warning · data highlight'],
		['red', color.red, 'danger · alerts'],
		['blue', color.blue, 'info'],
		['violet', color.violet, 'ambient · charts'],
		['pink', color.pink, 'secondary neon']
	];
	const street: [string, string][] = [
		['street-mustard', color.streetMustard],
		['street-coral', color.streetCoral],
		['street-teal', color.streetTeal],
		['paper', color.paper],
		['sun', color.sun]
	];
	const principles = [
		['Dark by law', 'Blue-black base. Light comes only from neon. No light mode.'],
		['Cut, never round', 'Chamfered corners on every frame. Radius is always 0.'],
		['Grid is visible', 'Hairlines, rulers, numbered sections. Show the structure.'],
		['One glow per zone', 'Neon is a light source. If everything glows, nothing does.'],
		['Data is mono', 'Numbers, IDs, timestamps: JetBrains Mono, tabular.']
	];
</script>

<AppShell
	brand="NEONDECK_"
	railCaption="design system // v0.1"
	nav={[
		{ label: 'Palette', href: '#palette', active: true },
		{ label: 'Principles', href: '#principles' },
		{ label: 'Components', href: '#components' },
		{ label: 'Editorial', href: '#editorial' }
	]}
>
	{#snippet actions()}
		<Button size="sm" arrow href="#components">Start a project</Button>
	{/snippet}
	{#snippet status()}
		<span><Tag tone="success" dot pulse>online</Tag></span>
		<span>node: szx-01</span>
		<span>latency 12ms</span>
		<span style="margin-left:auto">build 0.1.0 // root@neondeck:~#</span>
	{/snippet}

	<!-- HERO: Cyber Brutalism split. Text left, HUD visual right. -->
	<section class="hero nd-grid-bg">
		<div class="hero-text">
			<p class="nd-meta">&gt; RENDERING... 87%</p>
			<h1 class="hero-title"><GlitchText text="NEON" /><br /><span class="nd-neon">DECK</span></h1>
			<p class="tagline nd-neon-2">THE CITY NEVER SLEEPS.<br />NEITHER DOES THE INTERFACE.</p>
			<p class="lede">One design language for every app and site we ship. Raw, systematic, lit by neon. Built on Svelte, packaged for Wails.</p>
			<div class="row">
				<Button size="lg" arrow sub="read the spec">Explore system</Button>
				<Button size="lg" variant="ghost">View manifesto ⌗</Button>
			</div>
		</div>
		<div class="hero-visual nd-brackets">
			<div class="sun" aria-hidden="true"></div>
			<HanziMark text="霓虹都市" label="Neon City" face="tech" size="clamp(3rem, 7vw, 6rem)" />
			<span class="scn nd-meta">/01</span>
			<div class="coords nd-mono">
				<span>X_36.1749</span><span>Y_-86.7676</span><span>Z_46.6827</span>
			</div>
			<span class="scn2 nd-meta">//SCN_01</span>
		</div>
	</section>

	<div class="content">
		<!-- /01 PALETTE -->
		<section id="palette">
			<SectionHeader index="01" title="Palette" meta="sampled from images/colors" />
			<p class="nd-label">Base — night sky to wet asphalt</p>
			<div class="swatches">
				{#each swatches as [name, hex, use] (name)}
					<div class="sw"><span class="chip" style:background={hex}></span><b>{name}</b><span class="nd-meta">{hex} · {use}</span></div>
				{/each}
			</div>
			<p class="nd-label">Neon — light sources</p>
			<div class="swatches">
				{#each neon as [name, hex, use] (name)}
					<div class="sw"><span class="chip glow" style:background={hex} style:--g={hex}></span><b>{name}</b><span class="nd-meta">{hex} · {use}</span></div>
				{/each}
			</div>
			<p class="nd-label">Street + paper — illustration, editorial, extra series</p>
			<div class="swatches">
				{#each street as [name, hex] (name)}
					<div class="sw"><span class="chip" style:background={hex}></span><b>{name}</b><span class="nd-meta">{hex}</span></div>
				{/each}
			</div>
		</section>

		<!-- /02 PRINCIPLES -->
		<section id="principles">
			<SectionHeader index="02" title="Core principles" />
			<div class="principles">
				{#each principles as [t, d], i (t)}
					<div class="pr">
						<span class="nd-index">0{i + 1}</span>
						<h4>{t}</h4>
						<p>{d}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- /03 COMPONENTS: dashboard composition -->
		<section id="components">
			<SectionHeader index="03" title="Components" meta="svelte 5 · runes" />
			<div class="dash">
				<Panel title="System status" index="04" meta="REV_22" class="span-2">
					<div class="readouts">
						<Readout label="CPU_usage" value="73" unit="%" delta="+4.2%" neon />
						<Readout label="Memory" value="8.6" unit="GB" delta="-0.3" />
						<Readout label="Uptime" value="7d 14h" />
					</div>
					<div class="meters">
						<Meter label="Scanning" value={64} meta="624 / 1440 FILES" />
						<Meter label="Uplink" value={92} accent="cyan" />
						<Meter label="Ice integrity" value={23} accent="red" />
					</div>
				</Panel>

				<Panel title="Deck" index="05" accent="cyan" active>
					<div class="menu">
						<Button block sub="bio interface motherboard">Hack</Button>
						<Button block variant="outline" sub="advanced common tools">Shortcuts</Button>
						<Button block variant="outline" sub="global information database">Search</Button>
						<Button block variant="ghost" sub="encrypted chat container">Messages</Button>
						<Button block variant="danger" sub="irreversible">Purge cache</Button>
					</div>
				</Panel>

				<Panel title="Subscribe to signal" index="06" glow>
					<p>Drops, experiments and patches from the lab.</p>
					<Input label="Handle" placeholder="enter email" bind:value={handle} hint="no spam. no tracking." />
					<div class="row" style="margin-top: var(--nd-space-4)">
						<Button arrow>Subscribe</Button>
						<Button variant="outline" disabled>Disabled</Button>
					</div>
				</Panel>

				<Panel title="Feed" index="07" meta="LIVE" class="span-2">
					<div class="tags">
						<Tag tone="success" dot>operational</Tag>
						<Tag tone="accent">priority</Tag>
						<Tag tone="warning">degraded</Tag>
						<Tag tone="danger" dot pulse>breach</Tag>
						<Tag tone="info">info</Tag>
						<Tag tone="muted">archived</Tag>
						<Tag solid>new</Tag>
					</div>
					<table class="nd-table">
						<thead><tr><th>Node</th><th>Region</th><th class="num">Ping</th><th>State</th></tr></thead>
						<tbody>
							<tr><td>longmen-01</td><td>SZX</td><td class="num">12ms</td><td><Tag tone="success">up</Tag></td></tr>
							<tr><td>xinghe-07</td><td>SHA</td><td class="num">88ms</td><td><Tag tone="warning">slow</Tag></td></tr>
							<tr><td>jinwu-3</td><td>HKG</td><td class="num">—</td><td><Tag tone="danger">down</Tag></td></tr>
						</tbody>
					</table>
				</Panel>

				<Panel title="ID" index="08" cut="sm">
					<Barcode value="ND-552-322-3876" />
					<div style="margin-top: var(--nd-space-4)"><Ruler labels={['N', 'E', 'S', 'W']} /></div>
					<p class="nd-meta" style="margin-top: var(--nd-space-4)">ROOT@NEONDECK : ~ #<span class="nd-cursor"></span></p>
				</Panel>
			</div>
		</section>

		<!-- /04 EDITORIAL: poster plate -->
		<section id="editorial">
			<SectionHeader index="04" title="Editorial" meta="paper surface · posters" />
			<div class="poster nd-paper">
				<div class="poster-side">
					<HanziMark text="诱惑" label="Enticing" tone="sun" size="clamp(3rem, 6vw, 5rem)" />
				</div>
				<div class="poster-main">
					<div class="poster-sun" aria-hidden="true"></div>
					<p class="nd-label">Seductive ─── 009</p>
					<h2 class="poster-title">Enticing</h2>
					<p>Paper blocks borrow from Chinese street-poster collage: cream stock, black ink, one red sun, big hanzi. Use them for about pages, launches and long reads. Never for app chrome.</p>
					<Button variant="primary" arrow>Read story</Button>
				</div>
			</div>
		</section>
	</div>

	<HazardStripe text="> access granted" />
</AppShell>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		min-height: 70vh;
		border-bottom: 1px solid var(--nd-line);
	}
	.hero-text { padding: var(--nd-space-16) var(--nd-gutter); border-right: 1px solid var(--nd-line); background: linear-gradient(90deg, var(--nd-bg) 60%, transparent); }
	.hero-title { font-size: var(--nd-text-hero); line-height: 0.92; margin-bottom: var(--nd-space-6); }
	.tagline { font-family: var(--nd-font-mono); font-size: var(--nd-text-md); line-height: 1.4; }
	.lede { color: var(--nd-text-dim); max-width: 46ch; }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-4); align-items: center; }
	.hero-visual { --nd-bracket-color: var(--nd-accent); position: relative; display: grid; place-items: center; margin: var(--nd-space-8); overflow: hidden; }
	.sun {
		position: absolute;
		width: min(60%, 22rem);
		aspect-ratio: 1;
		border-radius: 50%; /* the ONE allowed circle: the poster sun */
		/* magenta core at 0.8 opacity keeps white hanzi over it ≥4:1 (a pink core drops it to ~3.1) */
		background: radial-gradient(circle at 40% 35%, var(--nd-magenta) 30%, #8a0f78);
		box-shadow: 0 0 80px color-mix(in srgb, var(--nd-magenta) 45%, transparent);
		opacity: 0.8;
	}
	.hero-visual :global(.nd-hanzi) { position: relative; color: var(--nd-text); text-shadow: 0 0 24px var(--nd-bg); }
	.scn { position: absolute; top: var(--nd-space-4); left: var(--nd-space-4); color: var(--nd-accent); }
	.scn2 { position: absolute; bottom: var(--nd-space-4); right: var(--nd-space-4); }
	.coords {
		position: absolute;
		right: var(--nd-space-6);
		top: 40%;
		display: grid;
		padding: var(--nd-space-2) var(--nd-space-3);
		border: 1px solid var(--nd-accent-2);
		background: color-mix(in srgb, var(--nd-accent-2) 12%, var(--nd-bg)); /* opaque: it overlaps the sun */
		color: var(--nd-accent-2);
		font-size: var(--nd-text-xs);
	}

	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-16) var(--nd-gutter); display: grid; gap: var(--nd-space-24); }

	.swatches { display: grid; grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); gap: var(--nd-space-4); margin-bottom: var(--nd-space-8); }
	.sw { display: grid; gap: 2px; font-size: var(--nd-text-sm); }
	.sw b { font-family: var(--nd-font-ui); text-transform: uppercase; letter-spacing: 0.08em; }
	.chip { height: 3.5rem; border: 1px solid var(--nd-line); clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%); }
	.chip.glow { box-shadow: inset 0 0 18px #ffffff40; }

	.principles { display: grid; grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr)); gap: 0; border-block: 1px solid var(--nd-line); }
	.pr { padding: var(--nd-space-6) var(--nd-space-5); border-right: 1px solid var(--nd-line); }
	.pr:last-child { border-right: 0; }
	.pr h4 { margin: var(--nd-space-2) 0; color: var(--nd-accent-2); font-family: var(--nd-font-ui); letter-spacing: 0.1em; }
	.pr p { color: var(--nd-text-dim); font-size: var(--nd-text-sm); margin: 0; }

	.dash { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--nd-space-5); }
	.dash :global(.span-2) { grid-column: span 2; }
	.readouts { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--nd-space-6); margin-bottom: var(--nd-space-6); }
	.meters { display: grid; gap: var(--nd-space-4); }
	.menu { display: grid; gap: var(--nd-space-2); }
	.tags { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); margin-bottom: var(--nd-space-4); }

	.poster { display: grid; grid-template-columns: auto 1fr; min-height: 26rem; overflow: hidden; }
	.poster-side { display: grid; place-items: center; padding: var(--nd-space-6); background: var(--nd-ink); }
	.poster-main { position: relative; padding: var(--nd-space-12) var(--nd-space-10); }
	.poster-main > :not(.poster-sun) { position: relative; }
	.poster-main > p { max-width: 42ch; }
	.poster-sun { position: absolute; right: -4rem; top: -3rem; width: 20rem; aspect-ratio: 1; border-radius: 50%; background: var(--nd-sun); opacity: 0.92; }
	.poster-title { font-size: var(--nd-text-hero); font-family: var(--nd-font-display); color: var(--nd-ink); margin: var(--nd-space-2) 0 var(--nd-space-4); }

	@media (max-width: 960px) {
		.hero { grid-template-columns: 1fr; }
		.hero-visual { min-height: 18rem; }
		.dash { grid-template-columns: 1fr; }
		.dash :global(.span-2) { grid-column: auto; }
		/* keep copy off the sun: ink on sun-red is only 4.2:1 */
		.poster { grid-template-columns: 1fr; }
		.poster-side { padding: var(--nd-space-4); }
		.poster-side :global(.nd-hanzi) { writing-mode: horizontal-tb; }
		.poster-main { padding: var(--nd-space-16) var(--nd-space-5) var(--nd-space-8); }
		.poster-sun { width: 9rem; right: -2.5rem; top: -2.5rem; }
		.poster-title { font-size: var(--nd-text-4xl); }
	}
</style>
