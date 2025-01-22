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

	const calcOptimalPictureHeight = () => {
		let personHeight = 1.8;
		let minBottomPadding = 1;

		let bottomPadding = Math.max(minBottomPadding, personHeight - height / 2);
		return bottomPadding + height / 2;
	};

	let wallHeight = $derived(calcOptimalPictureHeight() + height / 2 + 0.5);
	let wallWidth = $derived(width + 1);
</script>

<T.AmbientLight position={[-10, 10, 5]} />
<T.AmbientLight position={[10, 10, 5]} />
<XR>
{#await wallTexture then map}
	<T.Mesh position={[0, wallHeight / 2, -3]} rotation={[0, 0, 0]}>
		<T.BoxGeometry args={[wallWidth, wallHeight, 0.1]} />
		<T.MeshStandardMaterial {map} />
	</T.Mesh>
{/await}

{#await paintingTexture then map}
	<T.Mesh position={[0, calcOptimalPictureHeight(), -2.94]} rotation={[0, 0, 0]}>
		<T.BoxGeometry args={[width, height, 0.01]} />
		<T.MeshStandardMaterial {map} />
	</T.Mesh>
{/await}
</XR>
