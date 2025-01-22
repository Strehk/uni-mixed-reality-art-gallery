<script>
	import { T } from '@threlte/core';
	import { XR } from '@threlte/xr';
	import { MeshStandardMaterial, PerspectiveCamera, RepeatWrapping } from 'three';
	import { useTexture } from '@threlte/extras';
	import { TextureLoader } from 'three';
	import { useLoader } from '@threlte/core';

	const wallTexture = useTexture('/textures/plaster/plaster.jpg');
</script>

<T.AmbientLight position={[0, 10, 10]} />
<XR>
	{#await wallTexture then map}
		<T.Mesh position={[0, 0, -3]} rotation={[0, 0, 0]}>
			<T.BoxGeometry args={[3, 3, 0.1]} />
			<T.MeshStandardMaterial {map} />
		</T.Mesh>
	{/await}
</XR>
