export const formatLabels = (originalLabels: string[]) => {
	const labelMap: { [key: string]: string } = {
		reached_at_service_point: 'Reached at Service Point',
		received: 'Received',
		dropped_at_service_pointlabel_purchased: 'Dropped at Service Point',
		unknown: 'Unknown',
		label_purchased: 'Label Purchased',
		pending: 'Pending',
		in_transit: 'In Transit',
		returned: 'Returned',
	};

	return originalLabels.map((label: string) => labelMap[label]);
};

export const labelDictionary: { [key: string]: string } = {
	reached_at_service_point: 'Reached at Service Point',
	received: 'Received',
	dropped_at_service_pointlabel_purchased: 'Dropped at Service Point',
	unknown: 'Unknown',
	label_purchased: 'Label Purchased',
	pending: 'Pending',
	in_transit: 'In Transit',
	returned: 'Returned',
};
