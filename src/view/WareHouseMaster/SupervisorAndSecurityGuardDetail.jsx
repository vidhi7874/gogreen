/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  GridItem,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  useGetSecurityGuardDayShiftFreeMutation,
  useGetSecurityGuardNightShiftFreeMutation,
  useGetSupervisorDayShiftFreeMutation,
  useGetSupervisorNightShiftFreeMutation,
} from "../../features/warehouse-proposal.slice";
import {
  useGetSecurityMutation,
  useGetSupervisorMutation,
  useGetSupervisorSecurityMutation,
  useGetgetSupervisorSecurityMutation,
} from "../../features/masters/warehouseMasterApi.slice.";
import { useLocation } from "react-router-dom";

const SupervisorAndSecurityGuardDetail = ({ warehouseDetailsData }) => {
  const location = useLocation();
  console.log("location", location);
  const commonStyle = {
    _placeholder: { color: "gray.300" },
    _hover: {
      borderColor: "primary.700",
      backgroundColor: "primary.200",
    },
    _focus: {
      borderColor: "primary.700",
      backgroundColor: "primary.200",
      boxShadow: "none",
    },
  };

  const templateColumns = {
    base: "repeat(1, 1fr)",
    md: "repeat(3, 2fr)",
    lg: "repeat(3, 1fr)",
  };

  const commonWidth = {
    mt: 2,
    w: {
      base: "100%",
      sm: "80%",
      md: "60%",
      lg: "55%",
    },
    comm_details_style: {
      w: "90%",
    },
  };

  const [selectBoxOptions, setSelectBoxOptions] = useState([]);

  // security and supervisor api in warehouse master start
  const [getSecurity] = useGetSecurityMutation();
  const [getSupervisor] = useGetSupervisorMutation();

  const [securityData, setSecurityData] = useState([]);
  const [supervisorData, setSupervisorData] = useState([]);

  let params = {
    warehouse: location?.state?.warehouseId,
  };

  const getSecurityData = async () => {
    try {
      const response = await getSecurity(params).unwrap();
      console.log("response:security", response);
      setSecurityData(response?.data);
      console.log("setSecurityData", setSecurityData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSupervisorData = async () => {
    try {
      const response = await getSupervisor(params).unwrap();
      console.log("response:supervisor", response);
      setSupervisorData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getSecurityData();
    getSupervisorData();
  }, []);
  // security and supervisor api in warehouse master End

  return (
    <>
      <Box bg={"White"} py={3}>
        <Box
          w={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          }}
        >
          {/* Supervisor for Day shift*/}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right">Supervisor for Day shift</Text>{" "}
            </GridItem>
            <GridItem colSpan={{ base: 1 }}>
              <FormControl style={{ w: commonWidth.w }}>
                <Input
                  type="text"
                  border="1px"
                  borderColor="gray.10"
                  backgroundColor={"white"}
                  height={"15px "}
                  borderRadius={"lg"}
                  value={
                    warehouseDetailsData?.supervisor_day_shift?.employee_name ||
                    ""
                  }
                  //value={inputValue}
                  //  onChange={onChange}
                  _placeholder={commonStyle._placeholder}
                  _hover={commonStyle._hover}
                  _focus={commonStyle._focus}
                  isDisabled={true}
                  p={{ base: "4" }}
                  fontWeight={{ base: "normal" }}
                  fontStyle={"normal"}
                  placeholder="Supervisor for Day shift"
                />
              </FormControl>
            </GridItem>
          </Grid>

          {/* Supervisor for night shift*/}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right">Supervisor for night shift</Text>{" "}
            </GridItem>
            <GridItem colSpan={{ base: 1 }}>
              <FormControl style={{ w: commonWidth.w }}>
                <Input
                  type="text"
                  border="1px"
                  borderColor="gray.10"
                  backgroundColor={"white"}
                  height={"15px "}
                  borderRadius={"lg"}
                  value={
                    warehouseDetailsData?.supervisor_night_shift
                      ?.employee_name || ""
                  }
                  //  onChange={onChange}
                  _placeholder={commonStyle._placeholder}
                  _hover={commonStyle._hover}
                  _focus={commonStyle._focus}
                  isDisabled={true}
                  p={{ base: "4" }}
                  fontWeight={{ base: "normal" }}
                  fontStyle={"normal"}
                  placeholder="Supervisor for night shift"
                />
              </FormControl>
            </GridItem>
          </Grid>
          {/* Security Guard for day shift */}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right">Security Guard for day shift </Text>{" "}
            </GridItem>
            <GridItem colSpan={{ base: 1 }}>
              <FormControl style={{ w: commonWidth.w }}>
                <Input
                  type="text"
                  border="1px"
                  borderColor="gray.10"
                  backgroundColor={"white"}
                  height={"15px "}
                  borderRadius={"lg"}
                  value={
                    warehouseDetailsData?.warehouse_sub_detail
                      ?.security_guard_day_shift?.security_guard_name || ""
                  }
                  //  onChange={onChange}
                  _placeholder={commonStyle._placeholder}
                  _hover={commonStyle._hover}
                  _focus={commonStyle._focus}
                  isDisabled={true}
                  p={{ base: "4" }}
                  fontWeight={{ base: "normal" }}
                  fontStyle={"normal"}
                  placeholder="Security Guard for day shift "
                />
              </FormControl>
            </GridItem>
          </Grid>

          {/* Security Guard for night shift */}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right">Security Guard for night shift </Text>{" "}
            </GridItem>
            <GridItem colSpan={{ base: 1 }}>
              <FormControl style={{ w: commonWidth.w }}>
                <Input
                  type="text"
                  border="1px"
                  borderColor="gray.10"
                  backgroundColor={"white"}
                  height={"15px "}
                  borderRadius={"lg"}
                  value={
                    warehouseDetailsData?.warehouse_sub_detail
                      ?.security_guard_night_shift?.security_guard_name || ""
                  }
                  //  onChange={onChange}
                  _placeholder={commonStyle._placeholder}
                  _hover={commonStyle._hover}
                  _focus={commonStyle._focus}
                  isDisabled={true}
                  p={{ base: "4" }}
                  fontWeight={{ base: "normal" }}
                  fontStyle={"normal"}
                  placeholder="Security Guard for night shift"
                />
              </FormControl>
            </GridItem>
          </Grid>

          {/* History of Security Guards :   */}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right" color={"#212121"}>
                History of Security Guards :{" "}
              </Text>{" "}
            </GridItem>
          </Grid>

          {/* History of Security Guards :   details table start */}
          <TableContainer mt="4" p={3}>
            <Table color="#000">
              <Thead bg="#dbfff5" border="1px" borderColor="#000">
                <Tr style={{ color: "#000" }}>
                  <Th color="#000">Sr no</Th>
                  <Th color="#000">Security Guard name</Th>
                  <Th color="#000">Start date</Th>
                  <Th color="#000">End date</Th>
                  <Th color="#000">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {securityData &&
                  securityData.map((item, id) => (
                    <Tr
                      textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000"
                    >
                      <Td>{id + 1}</Td>
                      <Td>{item?.security_guard_name}</Td>
                      {item?.transfer_history.map((data, i) => (
                        <>
                          {" "}
                          <Td>{data?.start_date}</Td>
                          <Td>{data?.end_date}</Td>
                          <Td>{data?.status}</Td>
                        </>
                      ))}
                    </Tr>
                  ))}

                {securityData.length === 0 && (
                  <Tr textAlign="center">
                    <Td colSpan="8" color="#000">
                      No record found
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          {/* History of Security Guards :  table end */}

          {/* History of Supervisor:    */}
          <Grid
            textAlign="right"
            alignItems="center"
            my="3"
            templateColumns={templateColumns}
            gap={5}
          >
            <GridItem colSpan={{ base: 1, lg: 0 }}>
              <Text textAlign="right" color={"#212121"}>
                History of Supervisor:{" "}
              </Text>{" "}
            </GridItem>
          </Grid>

          {/* History of Supervisor:    details table start */}
          <TableContainer mt="4" p={3}>
            <Table color="#000">
              <Thead bg="#dbfff5" border="1px" borderColor="#000">
                <Tr style={{ color: "#000" }}>
                  <Th color="#000">Sr no</Th>
                  <Th color="#000">Supervisor name</Th>
                  <Th color="#000">Start date</Th>
                  <Th color="#000">End date</Th>
                  <Th color="#000">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr   textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000">
                  <Td>
                    {
                      warehouseDetailsData?.warehouse_sub_detail
                        ?.supervisor_day_shift?.employee_name
                    }
                  </Td>
                </Tr>

                {/* {supervisorData &&
                  supervisorData.map((item, id) => (
                    <Tr
                      textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000"
                    >
                      <Td>{id + 1}</Td>
                      <Td>{item?.employee_name}</Td>
                      <Td>{item?.security_guard_name}</Td>
                      <Td>{item?.security_guard_name}</Td>
                      <Td>{item?.security_guard_name}</Td>
                    </Tr>
                  ))}

                {supervisorData.length === 0 && (
                  <Tr textAlign="center">
                    <Td colSpan="8" color="#000">
                      No record found
                    </Td>
                  </Tr>
                )} */}
              </Tbody>
            </Table>
          </TableContainer>
          {/* History of Supervisor:   table end */}
        </Box>
      </Box>
    </>
  );
};

export default SupervisorAndSecurityGuardDetail;
// {securityData && securityData.length > 0 ? (
//   securityData?.map((item, i) => (
//     <Tr
//       textAlign="center"
//       bg="white"
//       border="1px"
//       borderColor="#000"
//     >
//       <Td>{i + 1}</Td>
//       <Td>{item?.security_guard_name}</Td>

//       <Td>{item?.transfer_history}</Td>
//       <Td>Jun 22, 2022</Td>
//       <Td color={"primary.700"}>Transfer Recieved</Td>
//     </Tr>
//   ))
// ) : (
//   <Tr textAlign="center">
//     <Td colSpan="5" color="#000">
//       No record found
//     </Td>
//   </Tr>
// )}
