<script lang="ts">
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

	let rotateDeg = ((index * 11) % 7) - 3;
	let fontWeight = (((index * 13) % 17) / 17) * 300 + 400;
</script>

<div
	class="paper"
	style="
    transform: rotate({rotateDeg}deg);
    font-weight: {fontWeight};
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
		opacity: .5;
		font-weight: 400 !important;
	}
	.paper {
		position: relative;
		padding: 2rem 1rem;
		margin: 1rem;
		font-size: 2rem;
		background-color: #fffbeb;
		box-shadow: -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.3);
		background-image: linear-gradient(
			to bottom,
			#fff calc(1em - 1px),
			#ccc calc(1em - 1px),
			#ccc 1em,
			#fff 1em
		);
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
