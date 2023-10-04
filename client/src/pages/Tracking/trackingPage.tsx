import TrackingList from '../../components/Tracking/trackingList';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const TrackingPage = () => {
	return (
		<div className="mt-10 px-4">
			<Tabs
				isFitted
				variant="soft-rounded"
				align="center">
				<TabList
					mb={'1rem'}
					w={'80rem'}
					border={'1px solid white'}
					borderRadius={'1.25rem'}>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>Basic Shipments (Tracking)</Tab>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>LTL Shipments(Tracking)</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<TrackingList />
					</TabPanel>
					<TabPanel>
						<p>LTL Shipments Table</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default TrackingPage;
