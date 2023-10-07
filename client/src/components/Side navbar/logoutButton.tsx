import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { TbLogout2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const boxStyles = {
	boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
	borderRadius: '0.5rem',
	padding: '.5rem',
	backgroundColor: '',
	transition: 'transform 0.3s ease',
};


const LogoutButton = ({ isExpanded }: { isExpanded: boolean }) => {
	const navigate=useNavigate()
	const handleLogout=()=>{
		localStorage.removeItem('token')
		navigate('/login')
	}

	return (
		<Box
			onClick={handleLogout}
			style={boxStyles}
			w={isExpanded ? '10vw' : '2vw'}
			onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
			onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
			backgroundColor={"#437F8C"}>
			<Flex
				gap={'.5rem'}
				align={'center'}>
				<Icon
					as={TbLogout2}
					boxSize={'1vw'}
					color={'white'}
				/>
				{isExpanded ? (
					<Text
						fontSize={'14px'}
						fontFamily={'Inter'}
						fontWeight={'600'}
						color={'white'}>
						Logout
					</Text>
				) : null}
			</Flex>
		</Box>
	);
};

export default LogoutButton;
