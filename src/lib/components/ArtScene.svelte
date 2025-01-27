<script lang="ts">
	import { T } from '@threlte/core';
	import { Controller, Hand, useXR, XR, type XRControllerEvent } from '@threlte/xr';
	import Wall from './Wall.svelte';
	import Artwork from './Artwork.svelte';
	import { calcOptimalPictureHeight } from '$lib/calculations';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
	}

	let { paintingTextureHref, width, height }: Props = $props();

	const { isPresenting } = useXR();

	let wallHeight = $derived(calcOptimalPictureHeight(height) + height / 2 + 0.5);
	let wallWidth = $derived(width + 1);

	const handleExit = (event: XRControllerEvent) => {
		$isPresenting = false;
	};
</script>

<T.AmbientLight position={[-10, 10, 5]} />
<T.AmbientLight position={[10, 10, 5]} />
<T.SpotLight
	position={[0, calcOptimalPictureHeight(height) + height + 0.5, -2.7]}
	intensity={100}
	penumbra={0.3}
/>

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
	<Controller left onsqueeze={handleExit()} />
	<Controller right onsqueeze={handleExit()} />
</XR>
