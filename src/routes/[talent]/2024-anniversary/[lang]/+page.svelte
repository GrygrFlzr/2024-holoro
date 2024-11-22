<script lang="ts">
	import type { PageData } from './$types';
	import Piece from '$lib/Piece.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="page" style="
	background-color: {data.bgColor};
">
	{#each data.rows as piece, index}
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
</style>
