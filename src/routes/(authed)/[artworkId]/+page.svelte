<script lang="ts">
	import type { PageData } from './$types';
	import { Canvas } from '@threlte/core';
	import { XRButton } from '@threlte/xr';
	import ArtScene from '$lib/components/ArtScene.svelte';
	import { browser, building, dev, version } from '$app/environment';

	let { data }: { data: PageData } = $props();

	let artwork = $derived(data.artwork) as any;

	type ImageVersion =
		| 'large'
		| 'larger'
		| 'medium'
		| 'medium_rectangle'
		| 'normalized'
		| 'small'
		| 'square'
		| 'tall';

	const getImageVersion = (availableVersions: ImageVersion[]) => {
		if (availableVersions.includes('larger')) return 'larger';
		if (availableVersions.includes('large')) return 'large';
		if (availableVersions.includes('medium')) return 'medium';
		if (availableVersions.includes('small')) return 'small';
		return 'normalized';
	};

	let vr = $state(true);

	let XRForce = $state<'enter' | 'exit' | undefined>();
</script>

<div class="flex w-full flex-col items-center justify-center gap-10 p-10">
	<div class="relative p-10">
		<img src={artwork._links?.thumbnail?.href} alt={artwork.title} class="h-80 object-cover" />
		<div class="border-primary absolute bottom-0 left-10 right-10 border-t-2 text-center">
			{artwork.dimensions?.cm.width} cm
		</div>
		<div
			class="border-primary absolute bottom-10 right-0 top-10 border-l-2 text-center [writing-mode:vertical-lr]"
		>
			{artwork.dimensions?.cm.height} cm
		</div>
	</div>
	<div class="flex flex-col items-center justify-center gap-2">
		<h1 class="text-4xl font-extrabold">{artwork.title}</h1>
		<p class="">{artwork.medium} ({artwork.date})</p>
	</div>
	<div class="tabs-boxed tabs">
		<button class="tab {vr && 'tab-active'}" onclick={() => (vr = true)}> VR </button>
		<button class="tab {!vr && 'tab-active'}" onclick={() => (vr = false)}> AR </button>
	</div>
</div>

<div class="h-full min-h-96 w-full">
	<Canvas>
		<ArtScene
			paintingTextureHref={artwork._links.image?.href.replace(
				'{image_version}',
				getImageVersion(artwork.image_versions)
			)}
			title={artwork.title}
			medium={`${artwork.medium}\n${artwork.date}\n${artwork.dimensions?.cm.width} x ${artwork.dimensions?.cm.height} cm`}
			{vr}
			width={artwork.dimensions?.cm.width / 100}
			height={artwork.dimensions?.cm.height / 100}
			exit={() => (XRForce = 'exit')}
		/>
	</Canvas>
	<XRButton mode={vr ? 'immersive-vr' : 'immersive-ar'} class="btn" force={XRForce} />
</div>

<pre>{JSON.stringify(artwork, null, 2)}</pre>
