import type { LayoutServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import artsyXapp from '@artsy/xapp';

export const load: LayoutServerLoad = async ({ params }) => {
	artsyXapp.init(
		{
			url: env.ARTSY_API_URL, // defaults to process.env.ARTSY_URL
			id: env.ARTSY_API_CLIENT_ID,
			secret: env.ARTSY_API_CLIENT_SECRET
		},
		function () {}
	);

	return {
		artsyApiToken: artsyXapp.token
	};
};
