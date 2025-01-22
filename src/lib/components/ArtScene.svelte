<script lang="ts">
	import { T } from '@threlte/core';
	import { Controller, Hand, useXR, XR } from '@threlte/xr';
	import { useTexture } from '@threlte/extras';
	import Wall from './Wall.svelte';
	import Artwork from './Artwork.svelte';
	import { calcOptimalPictureHeight } from '$lib/calculations';
	import { pointerControls } from '@threlte/xr';
	import { lightTargetPosition } from 'three/tsl';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
	}

	let { paintingTextureHref, width, height }: Props = $props();

	let wallHeight = $derived(calcOptimalPictureHeight(height) + height / 2 + 0.5);
	let wallWidth = $derived(width + 1);

	const { isHandTracking } = useXR();

	pointerControls('left');
	pointerControls('right');
</script>

<T.AmbientLight position={[-10, 10, 5]} />
<T.AmbientLight position={[10, 10, 5]} />

<T.SpotLight position={[0, 3.5, -2.7]} intensity={100} />
<Wall width={wallWidth} height={wallHeight} />
<Artwork {width} {height} {paintingTextureHref} />

<XR>
	{#snippet fallback()}
		<T.PerspectiveCamera
			makeDefault
			position={[0, 1.8, 2]}
			oncreate={(ref) => ref.lookAt(0, 1.5, -3)}
		/>
	{/snippet}
</XR>

{#if isHandTracking}
	<Hand left />
	<Hand right />
{:else}
	<Controller left />
	<Controller right />
{/if}
