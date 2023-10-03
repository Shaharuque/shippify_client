import TrackingList from '../../components/Tracking/trackingList';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const TrackingPage = () => {
	return (
		<div className='mt-10'>
			<Tabs
				isFitted
				variant="soft-rounded">
				<TabList px={'80px'}>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>Basic Shipments (Tracking)</Tab>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>LTL Shipments(Tracking)</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<TrackingList />
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default TrackingPage;
