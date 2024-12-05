<script lang="ts">
	import type { PageData } from './$types';
	import Piece from '$lib/Piece.svelte';
	import { hashStringToBigInt, pcg64 } from '$lib/pcg';

	let { data }: { data: PageData } = $props();
	const numericSeed = hashStringToBigInt(data.seed);
	const rng = pcg64(numericSeed);
	const stickers = rng.shuffleArray(data.stickers);
	// svelte-ignore non_reactive_update
	let stickerIndex = 0;

	function isSentenceStart(str: string | undefined) {
		let msg = (str || '').trimStart();
		return msg.startsWith('!') || msg.startsWith('.');
	}
	function isSentenceEnd(str: string | undefined) {
		let msg = (str || '').trimEnd();
		return msg.endsWith('!') || msg.endsWith('.');
	}
</script>

<div class="page" style="background-color: {data.bgColor};">
	{#each data.messages as piece, index}
		{#if isSentenceStart(piece.message) && stickerIndex < stickers.length}
			<div class="sticker" style="transform: rotate({rng.getRandomFloat(-3, 3)}deg)">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src={stickers[stickerIndex].url} />
				<span data-name={stickers[stickerIndex].author} class="author">
					{stickers[stickerIndex++].author}
				</span>
			</div>
		{/if}
		<Piece {piece} {index} />
		{#if isSentenceEnd(piece.message) && stickerIndex < stickers.length}
			<div class="sticker" style="transform: rotate({rng.getRandomFloat(-3, 3)}deg)">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src={stickers[stickerIndex].url} />
				<span data-name={stickers[stickerIndex].author} class="author">
					{stickers[stickerIndex++].author}
				</span>
			</div>
		{/if}
	{/each}
	{#each stickers.slice(stickerIndex, stickers.length) as sticker}
		<div class="sticker" style="transform: rotate({rng.getRandomFloat(-3, 3)}deg)">
			<!-- svelte-ignore a11y_missing_attribute -->
			<img src={stickers[stickerIndex].url} />
			<span data-name={stickers[stickerIndex].author} class="author">
				{stickers[stickerIndex++].author}
			</span>
		</div>
	{/each}
</div>

<style>
	.page {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: flex-start;
		min-height: 100vh;
		padding: 2rem 0;
	}
	.sticker {
		position: relative;
	}
	.sticker img {
		max-width: 150px;
	}
	.sticker .author {
		position: absolute;
		bottom: 0;
		right: 0;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
		font-weight: 500;
		color: white;
		-webkit-text-stroke: 4px white;
	}
	.sticker .author:after {
		content: attr(data-name);
		position: absolute;
		bottom: 0;
		right: 0;
		color: black;
		-webkit-text-stroke: initial;
		pointer-events: none;
	}
</style>
