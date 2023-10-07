export default function addCommaToMonetaryValue(value: number | string): string {
	const numericValue = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(numericValue)) {
		throw new Error('Invalid input. Please provide a valid number or a string that can be converted to a number.');
	}

	if (numericValue >= 1000) {
		const formattedValue = Math.floor(numericValue).toLocaleString();
		return formattedValue;
	} else {
		return numericValue.toLocaleString();
	}
}
