<script lang="ts">
	import { T } from '@threlte/core';
	import { Controller, Hand, useXR, XR } from '@threlte/xr';
	import { useTexture } from '@threlte/extras';
	import Wall from './Wall.svelte';
	import Artwork from './Artwork.svelte';
	import { calcOptimalPictureHeight } from '$lib/calculations';
	import { pointerControls } from '@threlte/xr';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
	}

	let { paintingTextureHref, width, height }: Props = $props();

	let wallHeight = $derived(calcOptimalPictureHeight(height) + height + 0.5);
	let wallWidth = $derived(width + 1);

	const { isHandTracking } = useXR();

	pointerControls('left');
	pointerControls('right');
</script>

<T.AmbientLight position={[-10, 10, 5]} />
<T.AmbientLight position={[10, 10, 5]} />
<XR>
	<Wall width={wallWidth} height={wallHeight} />

	<Artwork {width} {height} {paintingTextureHref} />

	{#if isHandTracking}
		<Hand left />
		<Hand right />
	{:else}
		<Controller left />
		<Controller right />
	{/if}
</XR>
