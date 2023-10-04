import { Flex, Icon, Box, Text } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
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
					w={isExpanded ? '10vw' : '2vw'}
					onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
					onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
					<NavLink to={menu.link}>
						<Flex
							gap={'.5rem'}
							align={'center'}
							justify={isExpanded ? 'flex-start' : 'center'}>
							<Icon
								as={menu.icon}
								boxSize={'1vw'}
								color={'cta'}
							/>
							{isExpanded ? (
								<Text
									fontSize={'14px'}
									fontFamily={'Inter'}
									fontWeight={'600'}
									color={'black'}>
									{menu.text}
								</Text>
							) : null}
						</Flex>
					</NavLink>
				</Box>
			))}
		</Flex>
	);
};

export default SideBarMenus;
