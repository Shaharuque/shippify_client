import { ModalFooter, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type THazardousMaterialModallProps = {
	onClose: () => void;
	isOpen: boolean;
	onSave: (data: TLiableContact) => void;
};

export type TLiableContact = {
	name: string;
	phone: string;
};
export const defaultLiableContactValues = {
	name: '',
	phone: '',
};
const HazardousMaterialModal = ({ onClose, isOpen, onSave }: THazardousMaterialModallProps) => {
	const { handleSubmit, register } = useForm({ defaultValues: defaultLiableContactValues });

	const onSubmit = (data: TLiableContact) => {
		onSave(data);
		onClose();
	};

	return (
		<>
			<Modal
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Liable Contact Information</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl isRequired>
								<FormLabel>Name</FormLabel>
								<Input {...register('name')} />
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Phone</FormLabel>
								<Input {...register('phone')} />
							</FormControl>
							<Button
								type="submit"
								mt={'1rem'}
								bg={'teal'}
								color={'primary'}>
								Save
							</Button>
						</form>
					</ModalBody>
					<ModalFooter gap={'1rem'}>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default HazardousMaterialModal;
