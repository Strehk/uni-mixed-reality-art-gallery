<!-- <script lang="ts">
    import { T } from '@threlte/core'
    import { XR } from '@threlte/xr'
  </script>
  <XR>
    <T.Text position={[0, 1.6, -1]} text="I have entered another realm!" />
  </XR>
  <T.AmbientLight />
  <T.DirectionalLight />
  <T.PerspectiveCamera
    makeDefault
    position={[0, 1.8, 1]}
    oncreate={(ref) => ref.lookAt(0, 1.8, 0)}
  />
  
  <T.Mesh position.y={-50}>
    <T.CylinderGeometry args={[2, 2, 100]} />
    <T.MeshStandardMaterial color="white" />
  </T.Mesh> -->

<script>
	import { T } from '@threlte/core';
	import { XR } from '@threlte/xr';
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.Mesh>
	<T.BoxGeometry />
	<T.MeshBasicMaterial />
</T.Mesh>
