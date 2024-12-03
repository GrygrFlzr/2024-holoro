import type { PageLoad } from './$types';

// false during open submission phase
// set to true after removing edit permissions from sheet
// to optimize out the web requests
export const ssr = false;

const talentLangMap: Record<
	string,
	{
		seed: string;
		dataSource: Record<string, string>;
		bgColor: string;
		stickerSource: string;
	}
> = {
	ollie: {
		seed: 'Kureiji Ollie',
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKpFpQgTdUptUeeL2k-dOK5jmmN72uLA543WloBkkhgsXBIGyly8aUKC0PJXZJEXjL39LOtVy7ksBv/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKpFpQgTdUptUeeL2k-dOK5jmmN72uLA543WloBkkhgsXBIGyly8aUKC0PJXZJEXjL39LOtVy7ksBv/pub?gid=2036774295&single=true&output=tsv'
		},
		bgColor: '#7f1d1d',
		stickerSource: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLhQd8Krh386aObRmS5u-UQ8VFLv57X6JyssD5Ax47zQth5Rr17x-xF69U0lVXdVwCC5DRTZfgKEGH/pub?gid=0&single=true&output=tsv',
	},
	anya: {
		seed: 'Anya Melfissa',
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlzbGq5R5EgSM93G84_0NYkWIpTRhGN4ZwFLzjwqa6LBRk4X0mx7GTFAfd5R8cxc3OClPWC99dqzdk/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlzbGq5R5EgSM93G84_0NYkWIpTRhGN4ZwFLzjwqa6LBRk4X0mx7GTFAfd5R8cxc3OClPWC99dqzdk/pub?gid=1966963793&single=true&output=tsv'
		},
		bgColor: '#78350f',
		stickerSource: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLhQd8Krh386aObRmS5u-UQ8VFLv57X6JyssD5Ax47zQth5Rr17x-xF69U0lVXdVwCC5DRTZfgKEGH/pub?gid=684044140&single=true&output=tsv',
	},
	reine: {
		seed: 'Pavolia Reine',
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKwyjpaD_KzJCYsEAlTM8MV54Rbpi8BCqY5ZJ2nEu-n735IArb-SOoAV-K03okERaHmusVbzYvaW6k/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKwyjpaD_KzJCYsEAlTM8MV54Rbpi8BCqY5ZJ2nEu-n735IArb-SOoAV-K03okERaHmusVbzYvaW6k/pub?gid=2036774295&single=true&output=tsv'
		},
		bgColor: '#1e3a8a',
		stickerSource: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLhQd8Krh386aObRmS5u-UQ8VFLv57X6JyssD5Ax47zQth5Rr17x-xF69U0lVXdVwCC5DRTZfgKEGH/pub?gid=1497982840&single=true&output=tsv',
	}
};

export const load: PageLoad = async ({ fetch, params }) => {
	const {
		bgColor,
		stickerSource,
		seed,
		dataSource
	} = talentLangMap[params.talent];
	const res = await fetch(dataSource[params.lang]);
	const msg_tsv = await res.text();
	const messages = msg_tsv
		.split('\n')
		.map((row) => {
			const [author, message] = row.trim().split('\t');
			return { author, message };
		})
		.slice(1);
	const sticker_tsv = await (await fetch(stickerSource)).text();
	const stickers = sticker_tsv
		.split('\n')
		.map((row) => {
			const [author, url] = row.trim().split('\t');
			return { author, url };
		})
		.slice(1);
	return {
		messages,
		stickers,
		seed,
		bgColor,
	};
};
