import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import ShippingSummary from '../../Cards/shippingSummary';
import BackButton from '../../Buttons/backButton';
import PaymentModal from '../../Modals/paymentModal';

const PaymentForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<ShippingSummary />
			<PaymentModal
				isOpen={isOpen}
				onClose={onClose}
			/>
			<Flex
				mt={'4rem'}
				gap={'1rem'}
				justify={'flex-end'}
				align={'center'}>
				<BackButton
					onClick={() => prevStep()}
					width="8rem"
				/>
				<Button onClick={onOpen}>Buy now pay later</Button>
				<Button>Pay now</Button>
			</Flex>
		</Box>
	);
};

export default PaymentForm;
