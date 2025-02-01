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
		vr: boolean;
		exit: () => void;
	}

	let { paintingTextureHref, width, height, exit, vr }: Props = $props();

	const { isPresenting } = useXR();

	let wallHeight = $derived(calcOptimalPictureHeight(height) + height / 2 + 0.5);
	let wallWidth = $derived(width + 1);
	const roomWidth = $derived(Math.max(wallWidth + 3, 10));
	const roomDepth = 8;
	const roomBackOffset = 5;
	const roomHeight = $derived(wallHeight + 3);
</script>

<T.AmbientLight position={[-10, 10, 5]} />
<T.AmbientLight position={[10, 10, 5]} />
<T.SpotLight
	position={[0, calcOptimalPictureHeight(height) + height + 0.5, -2.7]}
	intensity={100}
	penumbra={0.3}
/>

<!-- Art Display -->
<Wall width={wallWidth} height={wallHeight} />
<Artwork {width} {height} {paintingTextureHref} />

<!-- VR: Gallery Walls -->
{#if vr}
	<!-- Left Wall -->
	<Wall
		width={roomWidth + roomBackOffset}
		height={roomHeight}
		position={[-roomWidth / 2, roomHeight / 2, (-roomDepth + roomBackOffset) / 2]}
		rotation={[0, Math.PI / 2, 0]}
	/>

	<!-- Right Wall -->
	<Wall
		width={roomWidth + roomBackOffset}
		height={roomHeight}
		position={[roomWidth / 2, roomHeight / 2, (-roomDepth + roomBackOffset) / 2]}
		rotation={[0, -Math.PI / 2, 0]}
	/>

	<!-- Back Wall -->
	<Wall
		width={roomWidth}
		height={roomHeight}
		position={[0, roomHeight / 2, -roomDepth]}
		rotation={[0, 0, 0]}
	/>

	<!-- Front Wall -->
	<Wall
		width={roomWidth}
		height={roomHeight}
		position={[0, roomHeight / 2, roomBackOffset]}
		rotation={[0, Math.PI, 0]}
	/>

	<!-- Floor -->
	<T.Mesh position={[0, 0, (-roomDepth + roomBackOffset) / 2]}>
		<T.BoxGeometry args={[roomWidth, 0.1, roomDepth + roomBackOffset]} />
		<T.MeshStandardMaterial color="#444444" />
	</T.Mesh>

	<!-- Ceiling -->
	<T.Mesh position={[0, roomHeight, (-roomDepth + roomBackOffset) / 2]}>
		<T.BoxGeometry args={[roomWidth, 0.1, roomDepth + roomBackOffset]} />
		<T.MeshStandardMaterial color="#ffffff" />
	</T.Mesh>
{/if}

<XR>
	{#snippet fallback()}
		<T.PerspectiveCamera
			makeDefault
			position={[0, 1.8, 2]}
			oncreate={(ref) => ref.lookAt(0, 1.5, -3)}
		/>
	{/snippet}
	<Controller left onsqueeze={(_e) => exit()}>
		{#snippet targetRay()}
			<T.Text fontSize={0.05} text="Squeeze to Exit" position.x={0.1} />
		{/snippet}
		{#snippet pointerCursor()}
			{#if isPresenting}
				<T.Mesh rotation.x={Math.PI / 2} position.z={-1 / 2}>
					<T.CylinderGeometry args={[0.02, 0.02, 1]} />
					<T.MeshPhongMaterial color="red" />
				</T.Mesh>
			{/if}
		{/snippet}
	</Controller>
	<Controller right onsqueeze={(_e) => exit()} />
</XR>
