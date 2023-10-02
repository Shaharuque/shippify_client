export type TPackageTypeCardLTLProps = {
	text: string;
	image: string;
	code: string | null;
	onSelect: (code: string | null) => void;
	isSelected: boolean;
};
