import { Box, Button, Center, Checkbox, Flex, Heading, Icon, Input, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { HiCurrencyDollar } from 'react-icons/hi';
import BackButton from '../../Buttons/backButton';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

const InsuranceDetailsForm = ({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) => {
	const [insurance, setInsurance] = useState(0);
	const [productValue, setProductValue] = useState(0);
	const [agreedToTerms, setAgreedToTerms] = useState(false);
	const previousProductValue = useAppSelector((state: RootState) => state.shipments);

	const handleProductValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Math.floor(Number(event.target.value));
		setProductValue(value);
		setInsurance(value);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAgreedToTerms(event.target.checked);
	};

	const isButtonDisabled = productValue <= 0 || !agreedToTerms;

	useEffect(() => {
		if (previousProductValue?.customs) {
			const customItems = previousProductValue?.customs?.customs_items;
			const totalValue = customItems.reduce((accumulator, item) => accumulator + item.quantity * item.value?.amount, 0);

			setProductValue(totalValue);
			setInsurance(totalValue);
		}
	}, [previousProductValue]);

	return (
		<Flex
			direction={'column'}
			w={'30rem'}
			gap={'1rem'}
			p={'1vw'}>
			<Heading
				fontSize={'1.5rem'}
				textAlign={'center'}>
				Get your products insured
			</Heading>

			<Text
				fontWeight={'600'}
				fontSize={'1.2rem'}
				textAlign={'center'}
				whiteSpace={'nowrap'}
				mt={'1rem'}>
				Product value
			</Text>

			<Input
				type="number"
				value={productValue}
				onChange={handleProductValueChange}
				textAlign="center"
				w={'10rem'}
				alignSelf={'center'}
				border={'1px solid'}
				_focusVisible={{ boxShadow: '0 0 0 1px #002855', borderColor: '#002855', zIndex: 1 }}
			/>

			<Text
				mt={'2rem'}
				fontWeight={'600'}
				fontSize={'1.2rem'}
				textAlign={'center'}>
				Insurance fee
			</Text>
			<Flex
				align={'center'}
				justify={'center'}
				gap={'.5rem'}>
				<Icon
					as={HiCurrencyDollar}
					boxSize={'3rem'}
				/>
				<Text
					fontWeight={'700'}
					fontSize={'2.5rem'}>
					{0.1 * insurance}
				</Text>
			</Flex>

			<Checkbox
				colorScheme="green"
				size={'lg'}
				alignItems={'center'}
				fontWeight={'500'}>
				I agree to the
				<Text
					as="span"
					color="blue.500"
					ml={'.2rem'}>
					Terms and Conditions
				</Text>
			</Checkbox>

			<Box
				h={'30vh'}
				w={'100%'}
				overflowY={'scroll'}
				p={'1vw'}
				border={'1px solid #fff'}
				borderRadius={'.5rem'}
				css={{
					'&::-webkit-scrollbar': {
						width: '0',
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						borderRadius: '0.25em',
					},
				}}
				_hover={{ borderColor: '#002855', boxShadow: '0px 0px 3px  #002855 ' }}>
				<UnorderedList>
					<Heading fontSize={'1.35rem'}>Terms and Conditions</Heading>
					<ListItem m={'.5rem 0'}>
						<Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
					</ListItem>
				</UnorderedList>
			</Box>
			<Flex
				gap={'1rem'}
				mt={'2.5rem'}
				justify={'center'}>
				<BackButton
					onClick={() => prevStep()}
					width="5rem"></BackButton>
				<Button>Already insured</Button>
				<Button
					bg={'cta'}
					color={'primary'}
					isDisabled={isButtonDisabled}
					_disabled={{ bg: '#7ea4ad' }}
					onClick={() => console.log('YES', isButtonDisabled)}>
					Purchase insurance
				</Button>
			</Flex>
		</Flex>
	);
};

export default InsuranceDetailsForm;
