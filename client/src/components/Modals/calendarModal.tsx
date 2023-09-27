import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import '../LTL shipment/Multi stepper for LTL/reactCalender.styles.css';

type TCalendarModallProps = {
	onClose: () => void;
	isOpen: boolean;
	onDateSelect: (date: any) => void;
	value: any;
};

const CalendarModal = ({ onClose, isOpen, onDateSelect, value }: TCalendarModallProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}>
			<ModalOverlay />
			<ModalContent alignItems={'center'}>
				<ModalHeader></ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Calendar
						onChange={onDateSelect}
						value={value}
					/>
				</ModalBody>
				<ModalFooter>
					<Button
						bg={'red.400'}
						mr={3}
						onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CalendarModal;
