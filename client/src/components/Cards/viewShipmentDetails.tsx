import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const ViewShipmentDetails = () => {
	return (
		<Tabs
			isFitted
			variant="soft-rounded">
			<TabList mb="1em">
				<Tab _selected={{ color: 'white', bg: 'cta' }}>One</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Two</Tab>
				<Tab _selected={{ color: 'white', bg: 'cta' }}>Three</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>
					<p>one!</p>
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
