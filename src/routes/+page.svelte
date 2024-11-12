<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="page">
	{#each data.rows as piece, index}
		<div
			class="paper"
			style="
            transform: rotate({((index * 11) % 7) - 3}deg);
            font-weight: {(((index * 13) % 17) / 17) * 300 + 400};
        "
		>
			<span class="message">{piece.message}</span>
			<span class="author">{piece.author}</span>
		</div>
	{/each}
</div>

<style>
	:root {
		background: #78350f;
		color: #09090b;
	}
	.page {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
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
</style>
