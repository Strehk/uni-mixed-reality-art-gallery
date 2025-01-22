import artsyFetch from '$lib/artsyFetch.svelte';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	let { artsyApiToken } = await event.parent();

	const searchParam = event.url.searchParams.get('search');

	if (searchParam) {
		const searchUrl = searchParam ? `search?q=${searchParam}&type=artwork` : '';

		let search = await artsyFetch<any>(searchUrl, artsyApiToken);

		return {
			art: search._embedded.results.map((art: any) => ({
				id: art._links.self.href.split('/').pop(),
				title: art.title,
				description: art.description,
				thumbnailHref: art._links.thumbnail.href
			}))
		};
	}

	let art = await artsyFetch<any>('artworks', artsyApiToken);

	return {
		art: art._embedded.artworks.map((art: any) => ({
			id: art.id,
			title: art.display ?? `${art.title} (${art.date})`,
			description: art.medium,
			thumbnailHref: art._links.thumbnail.href
		}))
	};
};
