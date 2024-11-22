import type { PageLoad } from './$types';

// false during open submission phase
// set to true after removing edit permissions from sheet
// to optimize out the web requests
export const ssr = false;

const talentLangMap: Record<
	string,
	{
		dataSource: Record<string, string>;
		bgColor: string;
	}
> = {
	ollie: {
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKpFpQgTdUptUeeL2k-dOK5jmmN72uLA543WloBkkhgsXBIGyly8aUKC0PJXZJEXjL39LOtVy7ksBv/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKpFpQgTdUptUeeL2k-dOK5jmmN72uLA543WloBkkhgsXBIGyly8aUKC0PJXZJEXjL39LOtVy7ksBv/pub?gid=2036774295&single=true&output=tsv'
		},
		bgColor: '#7f1d1d',
	},
	anya: {
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlzbGq5R5EgSM93G84_0NYkWIpTRhGN4ZwFLzjwqa6LBRk4X0mx7GTFAfd5R8cxc3OClPWC99dqzdk/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSlzbGq5R5EgSM93G84_0NYkWIpTRhGN4ZwFLzjwqa6LBRk4X0mx7GTFAfd5R8cxc3OClPWC99dqzdk/pub?gid=1966963793&single=true&output=tsv'
		},
		bgColor: '#78350f',
	},
	reine: {
		dataSource: {
			en: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKwyjpaD_KzJCYsEAlTM8MV54Rbpi8BCqY5ZJ2nEu-n735IArb-SOoAV-K03okERaHmusVbzYvaW6k/pub?gid=0&single=true&output=tsv',
			id: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKwyjpaD_KzJCYsEAlTM8MV54Rbpi8BCqY5ZJ2nEu-n735IArb-SOoAV-K03okERaHmusVbzYvaW6k/pub?gid=2036774295&single=true&output=tsv'
		},
		bgColor: '#1e3a8a',
	}
};

export const load: PageLoad = async ({ fetch, params }) => {
	const { bgColor, dataSource } = talentLangMap[params.talent];
	const res = await fetch(dataSource[params.lang]);
	const raw_tsv = await res.text();
	const rows = raw_tsv
		.split('\n')
		.map((row) => {
			const [author, message] = row.trim().split('\t');
			return { author, message };
		})
		.slice(1);
	return { rows, bgColor };
};
