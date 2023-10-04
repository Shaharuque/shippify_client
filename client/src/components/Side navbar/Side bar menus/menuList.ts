import { IconType } from 'react-icons';
import { BiSolidHome } from 'react-icons/bi';
import { MdOutlinePayment } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';

export type TMenuList = {
	link: string;
	icon: IconType;
	text: string;
};

export const menuList: TMenuList[] = [
	{ link: '/home', icon: BiSolidHome, text: 'Home' },
	{ link: '/dashboard', icon: RxDashboard, text: 'Dashboard' },
	{ link: '/payment', icon: MdOutlinePayment, text: 'Payment' },
];
