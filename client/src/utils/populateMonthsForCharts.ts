export const populateMonthsForCharts = (data: any) => {
	const monthCounts: { [key: string]: number } = {};

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	for (const month of months) {
		monthCounts[month] = 0;
	}

	for (const item of data) {
		const { count, month,totalPackages } = item;
		monthCounts[month] += count || totalPackages;
	}

	const result = Object.keys(monthCounts).map((month) => ({
		count: monthCounts[month],
		year: 2023,
		month: month,
	}));

	return result;
};
