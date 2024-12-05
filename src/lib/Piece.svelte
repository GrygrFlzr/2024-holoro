<script lang="ts">
	import { hashStringToBigInt, pcg64 } from '$lib/pcg';
	let {
		piece,
		index,
		decorated = false
	}: {
		piece: {
			author: string | undefined;
			message: string | undefined;
		};
		index: number;
		decorated?: boolean;
	} = $props();

	const seed: bigint = piece.author ? hashStringToBigInt(piece.author) : BigInt(index);
	const pcg = pcg64(seed);

	let rotateDeg = pcg.getRandomFloat(-3, 3);
	let fontWeight = pcg.getRandomInt(400, 700);
	let hueDeg = pcg.getRandomInt(0, 360);
</script>

<div
	class="paper {decorated ? `decor${pcg.getRandomInt(1, 5)}` : ''}"
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
	color: lch(30.731% 74.271 {hueDeg});
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
	.paper:after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		height: 80px;
		width: 80px;
		transform: translate(30px, -40px);
		background-size: cover;
	}
	.paper.decor1:after {
		background-image: url('/decoration/merakyat01.png');
	}
	.paper.decor2:after {
		background-image: url('/decoration/merakyat02.png');
	}
	.paper.decor3:after {
		background-image: url('/decoration/merakyat03.png');
	}
	.paper.decor4:after {
		background-image: url('/decoration/merakyat04.png');
	}
	.paper.decor5:after {
		background-image: url('/decoration/merakyat05.png');
		left: 0;
		right: initial;
		transform: translate(-30px, -40px);
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
