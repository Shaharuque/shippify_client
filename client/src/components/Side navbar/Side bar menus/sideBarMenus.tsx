import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { TMenuList, menuList } from './menuList';

const SideBarMenus = ({ isExpanded }: { isExpanded: boolean }) => {
	const boxStyles = {
		boxShadow: '0 10px 10px rgba(0, 0, 0, 0.1)',
		borderRadius: '0.5rem',
		padding: '.5rem',
		backgroundColor: '',
		transition: 'transform 0.3s ease',
	};

	return (
		<Flex
			as={'nav'}
			direction={'column'}
			gap={'1.5rem'}
			p={'1rem'}
			align={'center'}>
			{menuList?.map((menu: TMenuList, index: number) => (
				<Box
					key={index}
					style={boxStyles}
					w={isExpanded ? '11rem' : '2.75rem'}
					onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
					onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
					<Link to={menu.link}>
						<Flex
							gap={'.75rem'}
							align={'center'}>
							<Icon
								as={menu.icon}
								boxSize={isExpanded ? '2rem' : '1.75rem'}
								color={'cta'}
							/>
							{isExpanded ? (
								<Text
									fontSize={'1.25rem'}
									fontFamily={'Inter'}
									fontWeight={'600'}
									color={'#fff'}>
									{menu.text}
								</Text>
							) : null}
						</Flex>
					</Link>
				</Box>
			))}
		</Flex>
	);
};

export default SideBarMenus;
