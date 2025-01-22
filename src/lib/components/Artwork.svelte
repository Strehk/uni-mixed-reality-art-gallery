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

	let yPosition = $state(calcOptimalPictureHeight(height));
	let yDragOffset = $state(0);
	let dragging = $state(false);
</script>

{#await paintingTexture then map}
	<T.Mesh
		position={[0, yPosition, -2.94]}
		rotation={[0, 0, 0]}
		onclick={() => (dragging = !dragging)}
		onpointermove={(e) => {
			if (dragging) {
				yPosition = e.clientY / window.innerHeight - 0.5 + yDragOffset;
			}
		}}
	>
		<T.BoxGeometry args={[width, height, 0.01]} />
		<T.MeshStandardMaterial {map} />
	</T.Mesh>
{/await}
