import type { LayoutServerLoad } from './$types';
import { ARTSY_API_URL, ARTSY_API_CLIENT_ID, ARTSY_API_CLIENT_SECRET } from '$env/static/private';
import artsyXapp from '@artsy/xapp';

export const load: LayoutServerLoad = async ({ params }) => {
	artsyXapp.init(
		{
			url: ARTSY_API_URL, // defaults to process.env.ARTSY_URL
			id: ARTSY_API_CLIENT_ID,
			secret: ARTSY_API_CLIENT_SECRET
		},
		function () {}
	);

	return {
		artsyApiToken: artsyXapp.token
	};
};
