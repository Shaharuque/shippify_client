import LtlTrackingList from '../../components/Tracking/LtlTracking/LtlTrackingList';
import TrackingList from '../../components/Tracking/trackingList';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const TrackingPage = () => {
	return (
		<div className="mt-20 px-8">
			<Tabs
				isFitted
				variant="soft-rounded"
				align="center">
				<TabList
					mb={'1rem'}
					w={'80rem'}
					border={'1px solid white'}
					borderRadius={'1.5rem'}>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>Basic Shipments (Tracking)</Tab>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>LTL Shipments(Tracking)</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<TrackingList />
					</TabPanel>
					<TabPanel>
						<LtlTrackingList/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default TrackingPage;
