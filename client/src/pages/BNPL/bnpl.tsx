import BNPLList from "../../components/BNPL/bnplList";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const BNPL = () => {
  return (
    <div className="mt-10 px-4">
      <Tabs isFitted variant="soft-rounded" align="center">
        <TabList
          mb={"1rem"}
          w={"80rem"}
          border={"1px solid white"}
          borderRadius={"1.25rem"}
        >
          <Tab _selected={{ color: "white", bg: "cta" }}>
            Upcoming Payments (Next 30days)
          </Tab>
          <Tab _selected={{ color: "white", bg: "cta" }}>
            Upcoming Payments (All)
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BNPLList timeBracket="next-30" />
          </TabPanel>
          <TabPanel>
            <BNPLList timeBracket="all" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default BNPL;
