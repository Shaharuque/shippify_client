import { Box, Button, Checkbox, Flex, Heading, Icon, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import SliderComponent from '../../Slider/slider';
import { HiCurrencyDollar } from 'react-icons/hi';
import { useState } from 'react';

const InsuranceDetailsForm = () => {
	const [sliderValue, setSliderValue] = useState(0);
	const handleSliderChange = (value: number) => {
		setSliderValue(value);
	};

	return (
		<Flex
			direction={'column'}
			w={'30rem'}
			gap={'1rem'}
			p={'1vw'}>
			<Text
				mb={'1rem'}
				fontWeight={'600'}
				fontSize={'1.2rem'}
				textAlign={'center'}>
				Insurance amount
			</Text>
			<Box w={'100%'}>
				<SliderComponent
					value={sliderValue}
					onChangeEnd={handleSliderChange}
				/>
			</Box>
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
					{sliderValue * 0.1}
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
				mt={'1rem'}
				justify={'center'}>
				<Button>Already insured</Button>
				<Button>Purchase insurance</Button>
			</Flex>
		</Flex>
	);
};

export default InsuranceDetailsForm;
