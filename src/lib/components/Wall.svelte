<script lang="ts">
    import { useTexture } from '@threlte/extras';
    import { T } from '@threlte/core';

    interface Props {
        width: number;
        height: number;
        position?: [number, number, number];
        rotation?: [number, number, number];
    }

    let { width, height, position = [0, height / 2, -3], rotation = [0, 0, 0] }: Props = $props();

    const wallTexture = useTexture('/textures/plaster/plaster.jpg');
</script>

{#await wallTexture then map}
    <T.Mesh {position} {rotation}>
        <T.BoxGeometry args={[width, height, 0.1]} />
        <T.MeshStandardMaterial {map} />
    </T.Mesh>
{/await}
