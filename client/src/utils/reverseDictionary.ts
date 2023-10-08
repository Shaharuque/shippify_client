export function reverseLabelDictionary(dictionary: { [key: string]: string }): { [key: string]: string } {
	const reversedDictionary: { [key: string]: string } = {};

	for (const key in dictionary) {
		if (dictionary.hasOwnProperty(key)) {
			const value = dictionary[key];
			reversedDictionary[value] = key;
		}
	}

	return reversedDictionary;
}
