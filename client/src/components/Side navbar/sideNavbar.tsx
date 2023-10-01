import { useState } from 'react';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiSolidHome } from 'react-icons/bi';

const SideNavbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleMouseEnter = () => {
		setIsExpanded(true);
	};

	const handleMouseLeave = () => {
		setIsExpanded(false);
	};

	return (
		<Box
			w={isExpanded ? '13vw' : '5vw'}
			h={'100vh'}
			bg="cta"
			color="white"
			transition="width 0.3s"
			overflow="hidden"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
			<Flex
				as={'nav'}
				direction={'column'}
				gap={'1.5rem'}
				p={'1rem'}
				align={'center'}>
				<Box>
					<Link to="/home">
						<Flex
							gap={'.75rem'}
							align={'center'}>
							<Icon
								as={BiSolidHome}
								boxSize={isExpanded ? '2.45rem' : '1.75rem'}
								color={'#28231D'}
							/>
							{isExpanded ? (
								<Text
									fontSize={'1.5rem'}
									fontFamily={'Roboto'}
									fontWeight={'600'}>
									Home
								</Text>
							) : null}
						</Flex>
					</Link>
				</Box>
			</Flex>
		</Box>
	);
};

export default SideNavbar;
