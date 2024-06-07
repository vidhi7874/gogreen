import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useAddWareHouseClientMutation,
  useUpdateWareHouseClientMutation,
} from "../../features/master-api-slice";

import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

import { BsEye } from "react-icons/bs";
import { schema } from "./fields";

const AddEditQualityControlReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { setValue, register, getValues } = methods;

  const [
    updateWareHouseClient,
    { isLoading: updateWareHouseClientApiIsLoading },
  ] = useUpdateWareHouseClientMutation();

  const details = location.state?.details;

  // Css code Start
  const reactSelectStyle = {
    menu: (base) => ({
      ...base,
      // backgroundColor: "#A6CE39",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#A6CE39" : "white",
      color: state.isFocused ? "green" : "black",
      textAlign: "left",
      "&:hover": {
        //  backgroundColor: "#C2DE8C",
        color: "black",
      },
    }),
  };

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
    md: "repeat(2, 1fr)",
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
  // css Code End

  // Form Submit Function Start
  const onSubmit = (data) => {
    console.log("data==>", data);
    if (details?.id) {
      updateData({ ...data, id: details.id });
    } else {
      addData(data);
    }
  };
  // Form Submit Function End

  // Form Clear Function Start

  const clearForm = () => {
    const defaultValues = methods.getValues();
    Object.keys(defaultValues).forEach((key) => {
      setValue(key, "", {
        shouldValidate: true,
      });
    });
    // setIsClear(true); // Update isClear state to true
  };

  // Form Clear Function End

  // Add warehouseClient Api Start

  const [addWareHouseClient, { isLoading: addWareHouseClientApiIsLoading }] =
    useAddWareHouseClientMutation();

  const addData = async (data) => {
    try {
      const response = await addWareHouseClient(data).unwrap();
      console.log("add warehouse client type master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-client-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // Add warehouseClient Api End

  // Update Area Api Start

  const updateData = async (data) => {
    try {
      const response = await updateWareHouseClient(data).unwrap();
      if (response.status === 200) {
        console.log("update warehouse client type master res", response);
        toasterAlert(response);
        navigate("/warehouse-master/warehouse-client-master");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  // Update Area Api End

  // Edit Form Fill Logic Start
  useEffect(() => {
    if (details?.id) {
      let obj = {
        // hiring_proposal_id: details.hiring_proposal_id.id,
        warehouse_owner_name: details?.warehouse_owner_name,
        warehouse_owner_contact_no: details?.warehouse_owner_contact_no,
        owner_type: details?.owner_type,
        warehouse_owner_address: details?.warehouse_owner_address,
        alternate_mobile_no: details?.alternate_mobile_no,
        account_holder_name: details?.account_holder_name,
        account_number: details?.account_number,
        ifsc_code: details?.ifsc_code,
        warehouse_name: details?.warehouse.warehouse_name,
        email_id: details?.email_id,
        region: details?.region?.id,
        state: details?.state?.id,
        substate: details?.substate?.id,
        district: details?.district?.id,
        area: details?.area?.id,
      };
      console.log("details", details);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }
    const breadcrumbArray = [
      {
        title: "Manage Warehouse",
        link: "/warehouse-master/warehouse-client-master",
      },
      {
        title: "Warehouse Client Master",
        link: "/warehouse-master/warehouse-client-master",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];
    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);
  // Edit Form Fill Logic End

  useEffect(() => {
    return () => {
      dispatch(setBreadCrumb([]));
    };
  }, []);

  return (
    <>
      <Box bg="white" borderRadius={10} p="10">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box maxHeight="calc( 100vh - 285px )" overflowY="auto">
              {/*CIR No*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">CIR No</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("CIR No")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="CIR No"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* CIR Date*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">CIR Date</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("CIR Date")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="CIR Date"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Depositor / client Name */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Depositor / client Name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Depositor / client Name ")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Depositor / client Name"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Warehouse Name*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Warehouse Name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Warehouse Name")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Warehouse Name"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Chamber No*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Chamber No</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Chamber No")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Chamber No"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Commodity name*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Commodity name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Commodity name")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Commodity name"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Commodity Variety*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Commodity Variety</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Commodity Variety")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Commodity Variety"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Lab Location */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Lab Location </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Lab Location ")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      // isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Lab Location "
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Model of Packing */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Model of Packing </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Model of Packing ")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      // isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Model of Packing"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Date of Sampling*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Date of Sampling</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Date of Sampling")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Date of Sampling"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Date of Reciept */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Date of Reciept</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Date of Reciept ")}
                      type="date"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      // isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Date of Reciept"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Date of Completion/Issue */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Date of Completion/Issue</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Date of Completion/Issue")}
                      type="date"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      // isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Date of Completion/Issue"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Gatepass details */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right" color={"#212121"} fontWeight={"bold"}>
                    Gatepass Details
                  </Text>{" "}
                </GridItem>
              </Grid>
              {/* Table Start */}
              <TableContainer mt="4">
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">Sr no</Th>
                      <Th color="#000">Gate pass no No</Th>
                      <Th color="#000">Truck no</Th>
                      <Th color="#000">Weighbridge slip no</Th>
                      <Th color="#000">No of bags</Th>
                      <Th color="#000">Gross weight</Th>
                      <Th color="#000">Tare weight</Th>
                      <Th color="#000">Net weight</Th>

                      <Th color="#000">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {warehouseOwnersDetails &&
                      warehouseOwnersDetails.map((item, i) => ( */}
                    <Tr
                      // key={`warehouse_owner_details${i}`}
                      textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000"
                    >
                      <Td>1</Td>
                      <Td>GP201</Td>
                      <Td>GJ 04 MH 1022</Td>
                      <Td>1456656557</Td>
                      <Td>10</Td>
                      <Td>50</Td>
                      <Td>20</Td>
                      <Td>45</Td>

                      <Td>
                        <Box display="flex" alignItems="center" gap="3">
                          <Flex gap="20px" justifyContent="center">
                            <Box color={"primary.700"}>
                              <BsEye
                                // color="#A6CE39"
                                fontSize="26px"
                                cursor="pointer"
                                // onClick={() => warehouseOwnerOnEdit(item, i)}
                              />
                            </Box>
                          </Flex>
                        </Box>
                      </Td>
                    </Tr>

                    <Tr textAlign="center">
                      <Td colSpan="5" color="#000">
                        No record found
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/* Table End */}
              {/* Test Result Analysis */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right" color={"#212121"} fontWeight={"bold"}>
                    Test Result Analysis
                  </Text>{" "}
                </GridItem>
              </Grid>
              {/* Table Start */}
              <TableContainer mt="4">
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">Parameter</Th>
                      <Th color="#000">Gate pass - 1</Th>
                      <Th color="#000">Gate pass - 2</Th>
                      <Th color="#000">Gate pass - 3</Th>
                      <Th color="#000">Final test result</Th>
                      <Th color="#000">Specification</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* {warehouseOwnersDetails &&
                      warehouseOwnersDetails.map((item, i) => ( */}
                    <Tr
                      // key={`warehouse_owner_details${i}`}
                      textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000"
                    >
                      <Td color={"#212121"}>Moisture</Td>
                      <Td>20%</Td>
                      <Td>91%</Td>
                      <Td>15%</Td>
                      <Td>
                        {" "}
                        <Input
                          {...register("Enter final result")}
                          type="text"
                          border="1px"
                          borderColor="gray.10"
                          backgroundColor={"white"}
                          height={"15px "}
                          borderRadius={"lg"}
                          //   isDisabled={true}
                          //value={inputValue}
                          //  onChange={onChange}
                          _placeholder={commonStyle._placeholder}
                          _hover={commonStyle._hover}
                          _focus={commonStyle._focus}
                          //  isDisabled={true}
                          p={{ base: "4" }}
                          fontWeight={{ base: "normal" }}
                          fontStyle={"normal"}
                          placeholder="Enter final result"
                        />
                      </Td>
                      <Td>90 Max</Td>
                    </Tr>

                    <Tr textAlign="center">
                      <Td colSpan="5" color="#000">
                        No record found
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/* Table End */}
              {/*Remarks*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Remarks</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Remarks")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      //   isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Remarks"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              <Box
                display="flex"
                gap={2}
                justifyContent="flex-end"
                mt="10"
                px="0"
              >
                {/* <Button
                          type="button"
                          backgroundColor={"white"}
                          borderWidth={"1px"}
                          borderColor={"#F82F2F"}
                          _hover={{ backgroundColor: "" }}
                          color={"#F82F2F"}
                          borderRadius={"full"}
                          my={"4"}
                          px={"10"}
                          onClick={() => clearForm}
                        >
                          Clear
                        </Button> */}

                <Button
                  type="submit"
                  //w="full"
                  backgroundColor={"primary.700"}
                  _hover={{ backgroundColor: "primary.700" }}
                  color={"white"}
                  borderRadius={"full"}
                  isLoading={
                    addWareHouseClientApiIsLoading ||
                    updateWareHouseClientApiIsLoading
                  }
                  my={"4"}
                  px={"10"}
                >
                  Submit
                  {/* {details?.id ? "Update" : "Add"} */}
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddEditQualityControlReport;
const toasterAlert = (obj) => {
  let msg = obj?.message;
  let status = obj?.status;
  if (status === 400) {
    const errorData = obj.data;
    let errorMessage = "";

    Object.keys(errorData).forEach((key) => {
      const messages = errorData[key];
      messages.forEach((message) => {
        errorMessage += `${key} : ${message} \n`;
      });
    });
    showToastByStatusCode(status, errorMessage);
    return false;
  }
  showToastByStatusCode(status, msg);
};
