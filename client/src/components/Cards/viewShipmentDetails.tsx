import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import AddressPanel from './Address panel';

const ViewShipmentDetails = () => {
	return (
		<Tabs
			isFitted
			variant="soft-rounded">
			<TabList
				mb="1em"
				border={'1px solid white'}
				borderRadius={'1rem'}>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Addresses</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Delivery details</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Payment details</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<AddressPanel />
				</TabPanel>
				<TabPanel>
					<p>two!</p>
				</TabPanel>
				<TabPanel>
					<p>three!</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default ViewShipmentDetails;
