import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { TPackageDetailsForm } from "../Basic shipment/multiStepperForBasic/packageDetailsForm";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICreditScore } from "../../interface/BNPL/payment";

const CreditScoreCard = () => {
  const [tableData, setTableData] = useState<ICreditScore>({
    _id: "",
    user_id: "123",
    score: 500,
    total_payments: 0,
    default_payments: 0,
    total_due: 0,
    allowed_balance: 0,
    used_balance: 0,
    total_full_loan_repayments: 0,
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchTableData = async () => {
      try {
        const response = await axios
          .post(
            `http://localhost:3000/credit-score/`,
            {
              user_id: "123",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": token,
              },
            }
          )
          .then((data) => {
            setTableData(data?.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTableData();
  }, []);
  return (
    <Tabs isFitted variant="soft-rounded">
      <TabList mb="1em" border={"1px solid white"} borderRadius={"1rem"}>
        <Tab _selected={{ color: "white", bg: "cta" }}>Credit Score</Tab>
        <Tab _selected={{ color: "white", bg: "cta" }}>Scoring Criteria</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <div className=" font-sans">
            <div className="bg-white mt-4 rounded p-3">
              <div className="flex gap-2">
                <h1>Credit Score:</h1>
                <h1 className="font-bold text-teal-700">
                  {tableData.score.toString()}
                </h1>
              </div>
              <div className="flex gap-2">
                <h1>Total Payments:</h1>
                <h1 className="font-bold">
                  {tableData.total_payments.toString()}
                </h1>
              </div>
              <div className="flex gap-2">
                <h1>Total Defaults</h1>
                <h1 className="font-bold">
                  {tableData.default_payments.toString()}
                </h1>
              </div>
              <div className="flex gap-2">
                <h1>Total Due : </h1>
                <h1 className="font-bold">{tableData.total_due.toString()}</h1>
              </div>
              <div className="flex gap-2">
                <h1>Allowed Balance:</h1>
                <h1 className="font-bold">
                  {tableData.allowed_balance.toString()}
                </h1>
              </div>
              <div className="border border-gray-200 rounded mt-3 p-2 bg-gray-400 text-white">
                <div className="flex gap-2">
                  <h1>Used Balance</h1>
                  <h1>{tableData.used_balance.toString()}</h1>
                </div>
                <div className="flex gap-2 ">
                  <h1>Total Full Loan Repayments</h1>
                  <h1>{tableData.total_full_loan_repayments.toString()}</h1>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="bg-white rounded border-gray-200 p-3">
            <Box flex={0.5}>
              <Heading size="sm" textTransform="uppercase">
                How to increase your credit Score
              </Heading>

              <Box>
                <Text pt="2" fontSize="sm" fontWeight="600">
                  Payment History
                </Text>
                <Text fontSize="sm">Credit History</Text>
                <Text fontSize="sm">No of Defaults</Text>
              </Box>
            </Box>
            {/* 
            <div className="mt-4">
              <Heading size="sm" textTransform="uppercase">
                Estimated Delivery Date
              </Heading>
              <Text fontSize="sm" fontWeight={"700"}>
                {moment(
                  shipmentData?.rateDetail?.estimated_delivery_date
                ).format("MMMM D, YYYY")}
              </Text>
            </div> */}

            {/* <div className="mt-4">
              <Heading size="sm" textTransform="uppercase">
                Tracking Number
              </Heading>
              <Text fontSize="xs" fontWeight={"700"} color={"gray"}>
                {shipmentData?.labelDetail?.tracking_number}
              </Text>
            </div> */}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default CreditScoreCard;
