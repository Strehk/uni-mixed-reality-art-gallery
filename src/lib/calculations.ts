export const calcOptimalPictureHeight = (height: number) => {
	let personHeight = 1.8;
	let minBottomPadding = 1;

	let bottomPadding = Math.max(minBottomPadding, personHeight - height);
	return bottomPadding + height / 2;
};
