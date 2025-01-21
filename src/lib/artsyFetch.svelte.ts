import { ARTSY_API_URL } from '$env/static/private';

export default async function artsyFetch<T>(
	path: string,
	token: string
): Promise<T> {
	const res = await fetch(`${ARTSY_API_URL}/api/${path}`, {
		headers: {
			'X-Xapp-Token': token,
			'Content-Type': 'application/json'
		},
	});
	const data = await res.json();
	return data;
}
