import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select, Text, Box } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

type PaymentModalProps = {
	onClose: () => void;
	isOpen: boolean;
};

const PaymentModal = ({ onClose, isOpen }: PaymentModalProps) => {
	const [installments, setInstallments] = useState(2);
	const [totalShippingCost, setTotalShippingCost] = useState(1000);

	const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();

		const value = Number(event.target.value);
		setInstallments(value);
	};

	useEffect(() => {
		setTotalShippingCost(1000);
	}, []);

	return (
		<>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>No. of installments</Text>
						<Select
							onChange={handleDropdownChange}
							defaultValue={2}>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</Select>
						<Box mt={'.5vw'}>
							Payable (per month): <Text as="span">{Math.ceil(totalShippingCost / installments)} USD</Text>
						</Box>
					</ModalBody>
					<ModalFooter gap={'1rem'}>
						<Button> Pay {Math.ceil(totalShippingCost / installments)} USD</Button>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default PaymentModal;
