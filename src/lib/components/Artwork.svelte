<script lang="ts">
	import { useTexture } from '@threlte/extras';
	import { T } from '@threlte/core';
	import { calcOptimalPictureHeight } from '$lib/calculations';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
	}

	let { width, height, paintingTextureHref }: Props = $props();

	let paintingTexture = $derived(useTexture(paintingTextureHref));
</script>

{#await paintingTexture then map}
	<T.Mesh position={[0, calcOptimalPictureHeight(height), -2.94]} rotation={[0, 0, 0]}>
		<T.BoxGeometry args={[width, height, 0.01]} />
		<T.MeshStandardMaterial {map} />
	</T.Mesh>
{/await}
