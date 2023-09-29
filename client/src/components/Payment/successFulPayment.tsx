import { Box, Flex, Image, Text, Center } from '@chakra-ui/react';
import confirmedPayment from '../../assets/confirm-payment.jpg';
import BackButton from '../Buttons/backButton';
import RegularButton from '../Buttons/regularButton';
const SuccessFulPayment = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	return (
		<Box>
			<Flex
				direction={'column'}
				gap={'1rem'}>
				<Center>
					<Box>
						<Image
							src={confirmedPayment}
							boxSize={'15rem'}
							borderRadius={'1rem'}
						/>
					</Box>
				</Center>
				<Text
					textAlign={'center'}
					fontWeight={'600'}
					fontSize={'1.25rem'}
					fontFamily={'Roboto'}>
					Your payment is done successfully!
				</Text>
				<Flex
					mt={3}
					gap={'1rem'}>
					<BackButton
						onClick={() => prevStep()}
						width="6rem"
					/>

					<RegularButton
						onClick={() => console.log('Go to lable creation!')}
						text="Create label"
						width="12rem"
					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default SuccessFulPayment;
