import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { TbLogout2 } from 'react-icons/tb';

const boxStyles = {
	boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
	borderRadius: '0.5rem',
	padding: '.5rem',
	backgroundColor: '',
	transition: 'transform 0.3s ease',
};

const LogoutButton = ({ isExpanded }: { isExpanded: boolean }) => {
	return (
		<Box
			style={boxStyles}
			w={isExpanded ? '11rem' : '2.75rem'}
			onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
			onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
			<Flex
				gap={'.75rem'}
				align={'center'}>
				<Icon
					as={TbLogout2}
					boxSize={isExpanded ? '2rem' : '1.75rem'}
					color={'cta'}
				/>
				{isExpanded ? (
					<Text
						fontSize={'1.25rem'}
						fontFamily={'Inter'}
						fontWeight={'600'}
						color={'#fff'}>
						Logout
					</Text>
				) : null}
			</Flex>
		</Box>
	);
};

export default LogoutButton;
