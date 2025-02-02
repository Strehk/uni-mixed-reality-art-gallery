<script lang="ts">
	import { T } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { Controller, Hand, useXR, XR, type XRControllerEvent } from '@threlte/xr';
	import Wall from './Wall.svelte';
	import Artwork from './Artwork.svelte';
	import { calcOptimalPictureHeight } from '$lib/calculations';
	import { Object3D } from 'three';

	interface Props {
		paintingTextureHref: string;
		width: number;
		height: number;
		vr: boolean;
		exit: () => void;
		title?: string;
		medium?: string;
	}

	let { paintingTextureHref, width, height, exit, vr, title, medium }: Props = $props();

	const { isPresenting } = useXR();

	let wallHeight = $derived(calcOptimalPictureHeight(height) + height / 2 + 0.5);
	let wallWidth = $derived(width + 1);
	let wallDistance = 3;
	const roomWidth = $derived(Math.max(wallWidth + 2, 7));
	const roomDepth = $derived(wallDistance + 0.3);
	const roomBackOffset = 5;
	const roomHeight = $derived(wallHeight + 3);

	let spotlightTarget = $state<Object3D>();
</script>

<T.AmbientLight position={[-2, 10, 0]} castShadow />
<T.AmbientLight position={[2, 10, 0]} castShadow />
<T.SpotLight
	position={[0, calcOptimalPictureHeight(height) + height + 1, -1.5]}
	intensity={40}
	penumbra={0.5}
	castShadow
	target={spotlightTarget}
/>
<T.Object3D bind:ref={spotlightTarget} position={[0, calcOptimalPictureHeight(height) / 2, -3]} />

<!-- Art Display -->
<Wall
	width={wallWidth}
	height={wallHeight}
	position={[0, wallHeight / 2, -3]}
	rotation={[0, 0, 0]}
/>
<Artwork {width} {height} {paintingTextureHref} />
{#if title}
	<Text
		text={title}
		fontSize={0.04}
		color="#000000"
		position={[-width / 2, calcOptimalPictureHeight(height) - height / 2 - 0.05, -2.94]}
		anchorX="left"
		anchorY="top"
	/>
{/if}
{#if medium}
	<Text
		text={medium}
		fontSize={0.02}
		color="#000000"
		position={[-width / 2, calcOptimalPictureHeight(height) - height / 2 - 0.12, -2.94]}
		anchorX="left"
		anchorY="top"
	/>
{/if}

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
	<T.Mesh position={[0, 0, (-roomDepth + roomBackOffset) / 2]} receiveShadow>
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
			oncreate={(ref) => ref.lookAt(0, calcOptimalPictureHeight(height), -3)}
		/>
	{/snippet}
	<Controller left onsqueeze={(_e) => exit()}>
		{#snippet targetRay()}
			<Text fontSize={0.02} text={'Squeeze\nto\nExit'} position.x={0.1} />
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
