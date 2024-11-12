import type { PageLoad } from './$types';

const DATA_PATH =
	'https://docs.google.com/spreadsheets/d/e/2PACX-1vRgMTDScHGDA6pgBVHBKQpgPb2P5XykXyUyBL4v3eNc06k9o0plKUWErOS4DjIMc8HWwHGjWMFWc1XP/pub?gid=0&single=true&output=tsv';
export const ssr = false;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch(DATA_PATH);
	const raw_tsv = await res.text();
	const rows = raw_tsv
		.split('\n')
		.map((row) => {
			const [author, message] = row.trim().split('\t');
			return { author, message };
		})
		.slice(1);
	console.log(rows);
	return { rows };
};
