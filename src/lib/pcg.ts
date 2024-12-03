export function hashStringToBigInt(seed: string) {
	let hash = BigInt(0);
	for (let i = 0; i < seed.length; i++) {
		hash = BigInt.asUintN(64, hash * BigInt(31) + BigInt(seed.charCodeAt(i)));
	}
	return hash;
}

export function pcg64(seed: bigint) {
	const a = BigInt('6364136223846793005');
	const c = BigInt('1442695040888963407');
	let state = seed;

	function rng() {
		state = a * state + c;
		const shiftedState = state >> BigInt(32);
		return Number(shiftedState & BigInt('0xFFFFFFFF'));
	}

	function getRandomInt(min: number, max: number) {
		return Math.floor((rng() / (0xffffffff + 1)) * (max - min + 1)) + min;
	}

	function getRandomFloat(min: number, max: number) {
		return (rng() / 0xffffffff) * (max - min) + min;
	}

	function shuffleArray<T>(arr: T[]): T[] {
		const arrCopy = [...arr];
		const toRet: T[] = [];
		while (arrCopy.length > 0) {
			const index = getRandomInt(0, arrCopy.length - 1);
			toRet.push(arrCopy[index]);
			arrCopy.splice(index, 1);
		}
		return toRet;
	}

	return { rng, getRandomInt, getRandomFloat, shuffleArray };
}
