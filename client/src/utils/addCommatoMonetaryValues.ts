export default function formatMonetaryValue(value: number) {
	if (value >= 1000) {
		const formattedValue = Math.floor(value).toLocaleString();
		return formattedValue;
	} else {
		return value.toLocaleString();
	}
}
