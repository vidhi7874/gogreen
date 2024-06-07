import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import React, { useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import WarehouseDetail from "./WarehouseDetail";
import WarehouseSubDetail from "./WarehouseSubDetail";
import CommodityDetails from "./CommodityDetails";
import FacilitiesAtWarehouse from "./FacilitiesAtWarehouse";
import SecurityArrangements from "./SecurityRelatedDetails";
import OtherDetails from "./OtherDetails";
import InspectionRelatedDetails from "./InspectionRelatedDetails";
import SecurityRelatedDetails from "./SecurityRelatedDetails";

const WarehouseReInspection = () => {
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);

  const handleSelectChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  const handleSelectChange2 = (selectedOption) => {
    setSelectedOption2(selectedOption);
  };

  const handleSelectChange3 = (selectedOption) => {
    setSelectedOption3(selectedOption);
  };

  const firstoptions = [
    { value: "HDFC Bank", label: "HDFC Bank" },
    { value: "IDBI Bank", label: "IDBI Bank" },
    { value: "GoGreen", label: "GoGreen" },
  ];
  const secondoptions = [
    { value: "BOB Bank", label: "BOB Bank" },
    { value: "SBI Bank", label: "SBI Bank" },
    { value: "GoGreen", label: "GoGreen" },
  ];
  const thirdoptions = [
    { value: "PNB Bank", label: "PNB Bank" },
    { value: "IDBI Bank", label: "IDBI Bank" },
    { value: "GoGreen", label: "GoGreen" },
  ];

  const reactSelectStyle = {
    menu: (base) => ({
      ...base,
      // backgroundColor: "#A6CE39",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#A6CE39" : "white",
      color: state.isFocused ? "green" : "black",
      "&:hover": {
        //  backgroundColor: "#C2DE8C",
        color: "black",
      },
    }),
  };

  return (
    <>
      <Box bg="white" borderRadius={10}>
        <Box p={4}>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {/* <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" /> */}
            {/* This is for the first dropdown code */}
            <GridItem>
              <Text textAlign="left">Select bank name* </Text>{" "}
              <ReactSelect
                value={selectedOption1}
                onChange={handleSelectChange1}
                options={firstoptions}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    // borderColor: clientError.clientType ? "red" : "#c3c3c3",

                    padding: "1px",
                    textAlign: "left",
                  }),
                  ...reactSelectStyle,
                }}
              />
            </GridItem>
            <GridItem>
              <Text textAlign="left">Select branch name* </Text>{" "}
              <ReactSelect
                value={selectedOption2}
                onChange={handleSelectChange2}
                options={secondoptions}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    // borderColor: clientError.clientType ? "red" : "#c3c3c3",

                    padding: "1px",
                    textAlign: "left",
                  }),
                  ...reactSelectStyle,
                }}
              />
            </GridItem>
            <GridItem>
              <Text textAlign="left">Select Inspection type* </Text>{" "}
              <ReactSelect
                value={selectedOption3}
                onChange={handleSelectChange3}
                options={thirdoptions}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    // borderColor: clientError.clientType ? "red" : "#c3c3c3",

                    padding: "1px",
                    textAlign: "left",
                  }),
                  ...reactSelectStyle,
                }}
              />
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Box borderRadius={10} my={4}>
        <Accordion allowMultiple>
          {/* Warehouse Details Accordian Code Start  */}
          <AccordionItem p={2} bg="white">
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Warehouse Details
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <WarehouseDetail />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Warehouse sub Details accordian code start */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Warehouse Sub Details
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <WarehouseSubDetail />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/*Commodity Details Accordian Code Start    */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Commodity Details.
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <CommodityDetails />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Facilities at warehouse Accordian Code Start */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Facilities at warehouse
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <FacilitiesAtWarehouse />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Security Arrangements Accordian Code Start  */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Security Related Details
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <SecurityRelatedDetails />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Other details Accordian Code Start */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Other details
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <OtherDetails />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          {/* Inspection related details. Accordian Code Start */}
          <AccordionItem p={2} bg="white" my={2}>
            {({ isExpanded }) => (
              <>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Inspection related details.
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <InspectionRelatedDetails />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
        <Flex gap="10px" justifyContent="end" alignItems="center">
          <Button
            bg="#A6CE39"
            _hover={{}}
            color="white"
            marginTop={"30px"}
            padding="0px 30px"
            borderRadius={"50px"}
            type="button"
            //   onClick={() => {
            //     saveAsDraftFunction();
            //   }}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default WarehouseReInspection;
