<script lang="ts">
	import { hashStringToBigInt, pcg64 } from '$lib/pcg';
	let {
		piece,
		index
	}: {
		piece: {
			author: string | undefined;
			message: string | undefined;
		};
		index: number;
	} = $props();

	const seed : bigint = piece.author ? hashStringToBigInt(piece.author) : BigInt(index);
	const pcg = pcg64(seed);

	let rotateDeg = pcg.getRandomFloat(-3, 3);
	let fontWeight = pcg.getRandomInt(400, 700);
	let hueDeg = pcg.getRandomInt(0, 360);
</script>

<div
	class="paper"
	style="
    transform: rotate({rotateDeg}deg);
    font-weight: {fontWeight};
	background-image: linear-gradient(
		to bottom,
		lch(85.993% 20.394 {hueDeg}) calc(1em - 1px),
		lch(72.985% 32.272 {hueDeg}) calc(1em - 1px),
		lch(72.985% 32.272 {hueDeg}) 1em,
		lch(85.993% 20.394 {hueDeg}) 1em
	);
"
>
	<span class="message">
		{#if piece.message}
			{piece.message}
		{:else}
			<span class="muted">(to be filled by author)</span>
		{/if}
	</span>
	<span class="author">{piece.author}</span>
</div>

<style>
	.muted {
		opacity: 0.5;
		font-weight: 400 !important;
	}
	.paper {
		position: relative;
		padding: 2rem 1rem;
		margin: 1rem;
		font-size: 2rem;
		box-shadow: -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.3);
		background-position: 0% 1em;
		background-size: 100% 1em;
		background-repeat: repeat-y;
		font-family: 'Caveat', cursive;
		font-optical-sizing: auto;
		font-style: normal;
	}

	.author {
		position: absolute;
		bottom: 0.25rem;
		right: 1rem;
		font-size: 1rem;
	}
	.message {
		text-wrap: nowrap;
		font-size: 2rem;
	}
</style>
