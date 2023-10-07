export type TPredefinedBox = {
	description: string;
	dimensions: {
		width: number;
		height: number;
		length: number;
		unit: string;
	};
	name: string;
	package_code: string;
	package_id: string;
};

export type TPredefinedBoxesProps = {
	inputChanged: boolean;
	editModeOn: boolean;
	selectedCode: string | null;
	weightValue: number | null;

	onPredefinedBoxCodeSelect: (code: string | null) => void;
	onPredefinedWeightChange: (weight: number | null) => void;
	onPredefinedUnitChange: (unit: string) => void;
	onPredefinedSubmit: () => void;
	removePackage: () => void;
};
