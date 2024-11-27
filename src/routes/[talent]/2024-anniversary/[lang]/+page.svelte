<script lang="ts">
	import type { PageData } from './$types';
	import Piece from '$lib/Piece.svelte';
	import { hashStringToBigInt, pcg64 } from '$lib/pcg';

	let { data }: { data: PageData } = $props();
	const numericSeed = hashStringToBigInt(data.seed);
	const rng = pcg64(numericSeed);
	const messageCount = data.messages.length;
	const firstStickerPosition = rng.getRandomInt(0, messageCount - 1);
	const authorExtractor = /\/(?:ollie|anya|reine)_(.+?)?(\.\w+)?\.png/;
</script>

<div class="page" style="
	background-color: {data.bgColor};
">
	{#each data.messages as piece, index}
		{#if index == firstStickerPosition && data.stickers.length > 0}
			<div class="sticker">
				<!-- svelte-ignore a11y_missing_attribute -->
				<img src={data.stickers[0]} />
				<span data-name={authorExtractor.exec(data.stickers[0])![1]} class="author">{authorExtractor.exec(data.stickers[0])![1]}</span>
			</div>
		{/if}
		<Piece {piece} {index} />
	{/each}
</div>

<style>
	.page {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-content: flex-start;
		min-height: 100vh;
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
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 500;
		color: white;
		-webkit-text-stroke: 4px white;
		transform: rotate(-5deg);
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
