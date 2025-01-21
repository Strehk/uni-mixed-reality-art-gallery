<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageData, PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let btnLoading = false;
</script>

<div class="flex w-full flex-col items-center justify-center gap-10 p-10">
	<h1 class="text-6xl font-extrabold uppercase">Gallery</h1>
	<form
		class="join w-full max-w-lg"
		onsubmit={(e) => {
			btnLoading = true;
			e.preventDefault();
			goto(`gallery?search=${(document.getElementById('search') as HTMLInputElement).value}`);
			btnLoading = false;
		}}
	>
		<input
			id="search"
			type="text"
			placeholder="Search"
			class="input input-lg join-item input-bordered input-primary w-full"
		/>
		<button class="btn btn-primary join-item btn-lg" type="submit">
			{#if btnLoading}
				<div class="loading loading-spinner"></div>
			{:else}
				Search
			{/if}
		</button>
	</form>
	<div class="grid grid-cols-3 gap-6">
		{#each data.art as art}
			<a class="card border-white" href={`gallery/${art.id}`}>
				<figure>
					<img
						src={art.thumbnailHref}
						alt={art.title}
						class="h-64 w-full rounded-lg object-cover"
					/>
				</figure>
				<div class="card-body">
					<h2 class="text-xl font-bold">{art.title}</h2>
					<p class="text-sm">{art.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>


<pre class="w-full">
    {JSON.stringify(data, null, 2)}
</pre>
