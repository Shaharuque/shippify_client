export function formatDate(dateString: string) {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short' as const,
		year: 'numeric' as const,
		month: 'long' as const,
		day: 'numeric' as const,
	};
	const date = new Date(dateString);
	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

	const day = date.getDate();
	const year = date.getFullYear();

	let suffix = '';
	if (day >= 11 && day <= 13) {
		suffix = 'th';
	} else {
		switch (day % 10) {
			case 1:
				suffix = 'st';
				break;
			case 2:
				suffix = 'nd';
				break;
			case 3:
				suffix = 'rd';
				break;
			default:
				suffix = 'th';
				break;
		}
	}

	const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);

	return `${formattedDate.slice(0, -16)} ${month} ${day}${suffix}, ${year}`;
}
