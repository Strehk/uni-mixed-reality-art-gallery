<script lang="ts">
	import { T } from '@threlte/core';
	import { XR } from '@threlte/xr';
	import { useTexture } from '@threlte/extras';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
	}

	let { paintingTextureHref, width, height }: Props = $props();

	let paintingTexture = $derived(useTexture(paintingTextureHref));

	const wallTexture = useTexture('/textures/plaster/plaster.jpg');
</script>

<T.AmbientLight position={[0, 10, 10]} />
<XR>
	{#await wallTexture then map}
		<T.Mesh position={[0, 2.5, -3]} rotation={[0, 0, 0]}>
			<T.BoxGeometry args={[5, 5, 0.1]} />
			<T.MeshStandardMaterial {map} />
		</T.Mesh>
	{/await}

	{#await paintingTexture then map}
		<T.Mesh position={[0, height / 3 + 1.8 , -2.94]} rotation={[0, 0, 0]}>
			<T.BoxGeometry args={[width, height, 0.01]} />
			<T.MeshStandardMaterial {map} />
		</T.Mesh>
	{/await}
</XR>
