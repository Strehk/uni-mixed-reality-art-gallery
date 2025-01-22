import artsyFetch from '$lib/artsyFetch.svelte';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	let { artsyApiToken } = await event.parent();

	const artworkId = event.params.artworkId;

	let artwork = (await artsyFetch(`artworks/${artworkId}`, artsyApiToken)) as any;

	if (['other_error'].includes(artwork.type)) {
		error(500, artwork.message);
	}

	return {
		artwork
	};
};
