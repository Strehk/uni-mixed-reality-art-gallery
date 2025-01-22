import { env } from '$env/dynamic/private';
import type { paths } from '$lib/types/artsyApi';

export default async function artsyFetch<T>(path: string, token: string): Promise<T> {
	const res = await fetch(`${env.ARTSY_API_URL}/api/${path}`, {
		headers: {
			'X-Xapp-Token': token,
			'Content-Type': 'application/json'
		}
	});
	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return new Promise((resolve, reject) => reject(error));
	}
}
