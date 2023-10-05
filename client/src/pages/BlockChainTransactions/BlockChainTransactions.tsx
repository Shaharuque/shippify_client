import TrackingList from '../../components/Tracking/trackingList';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BasicBlockchain from './BasicBlockchain';
import LtlBlockchain from './LtlBlockchain';
import { useState } from 'react';

const BlockChainTransactions = () => {
    const [tab,setTab]=useState('basic')
    console.log(tab)
	return (
		<div className="mt-20 px-8">
			<Tabs
				isFitted
				variant="soft-rounded"
				align="center">
				<TabList
					mb={'1rem'}
					w={'60%'}
					border={'1px solid white'}
					borderRadius={'1.5rem'}>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>Blockchain Transaction(Basic Shipment)</Tab>
					<Tab _selected={{ color: 'white', bg: 'cta' }}>Blockchain Transaction(LTL)</Tab>
				</TabList>
				<TabPanels>
					<TabPanel onClick={()=>setTab('basic')} display={"flex"} justifyContent={"center"}>
						<BasicBlockchain />
					</TabPanel>
					<TabPanel onClick={()=>setTab('ltl')} display={"flex"} justifyContent={"center"}>
						<LtlBlockchain/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default BlockChainTransactions;
