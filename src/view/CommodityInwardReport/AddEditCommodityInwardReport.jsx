import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  useAddWareHouseClientMutation,
  useUpdateWareHouseClientMutation,
} from "../../features/master-api-slice";
import { useFetchLocationDrillDownFreeMutation } from "../../features/warehouse-proposal.slice";
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
import { schema } from "./field";
import { BsEye } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import CustomFileInput from "../../components/Elements/CustomFileInput";

const AddEditCommodityInwardReport = () => {
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],
    areas: [],
  });

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
  const [updateInsuranceId, setUpdateInsuranceId] = useState(null);

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
  const inputStyle = {
    height: "40px",
    backgroundColor: "white",
    borderRadius: "lg",
    _placeholder: {
      color: "gray.300",
    },
    _hover: {
      borderColor: "primary.700",
      backgroundColor: "primary.200",
    },
    _focus: {
      borderColor: "primary.700",
      backgroundColor: "primary.200",
      boxShadow: "none",
    },
    p: { base: "4" },
    fontWeight: { base: "normal" },
    fontStyle: "normal",
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

  // Location Drill Down Function Start

  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownFreeMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await fetchLocationDrillDown().unwrap();
      console.log("getRegionMasterList:", response);
      setSelectBoxOptions((prev) => ({
        ...prev,
        regions: response?.region?.map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const regionOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("region", val?.value, {
      shouldValidate: true,
    });
    setValue("state", null, {
      shouldValidate: false,
    });

    setValue("substate", null, {
      shouldValidate: false,
    });

    setValue("district", null, {
      shouldValidate: false,
    });

    setValue("area", null, {
      shouldValidate: false,
    });

    const query = {
      region: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        states: response?.state
          ?.filter((item) => item.state_name !== "All - State")
          .map(({ state_name, id }) => ({
            label: state_name,
            value: id,
          })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const stateOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("state", val?.value, {
      shouldValidate: true,
    });

    setValue("substate", null, {
      shouldValidate: false,
    });

    setValue("district", null, {
      shouldValidate: false,
    });

    setValue("area", null, {
      shouldValidate: false,
    });

    const query = {
      region: getValues("region"),
      state: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        substate: response?.substate
          ?.filter((item) => item.substate_name !== "All - Zone")
          .map(({ substate_name, id }) => ({
            label: substate_name,
            value: id,
          })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const zoneOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("substate", val?.value, {
      shouldValidate: true,
    });

    setValue("district", null, {
      shouldValidate: false,
    });

    setValue("area", null, {
      shouldValidate: false,
    });

    const query = {
      region: getValues("region"),
      state: getValues("state"),
      substate: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        districts: response?.district
          ?.filter((item) => item.district_name !== "All - District")
          .map(({ district_name, id }) => ({
            label: district_name,
            value: id,
          })),
      })); 
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const districtOnChange = async (val) => {
    console.log("value --> ", val);
    setValue("district", val?.value, {
      shouldValidate: true,
    });

    setValue("area", null, {
      shouldValidate: false,
    });

    const query = {
      region: getValues("region"),
      state: getValues("state"),
      substate: getValues("substate"),
      district: val?.value,
    };

    try {
      const response = await fetchLocationDrillDown(query).unwrap();
      console.log("fetchLocationDrillDown response :", response);

      setSelectBoxOptions((prev) => ({
        ...prev,
        areas: response?.area
          ?.filter((item) => item.area_name !== "All - District")
          .map(({ area_name, id }) => ({
            label: area_name,
            value: id,
          })),
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const areaOnChange = (val) => {
    setValue("area", val?.value, {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    getRegionMasterList();
  }, []);

  // Location Drill Down Function End

  // Add warehouseClient Api Start

  const [addWareHouseClient, { isLoading: addWareHouseClientApiIsLoading }] =
    useAddWareHouseClientMutation();

  const addData = async (data) => {
    try {
      const response = await addWareHouseClient(data).unwrap();
      console.log("add Commodity Master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/commodity-inward-report");
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
        console.log("update Commodity Inward Report res", response);
        toasterAlert(response);
        navigate("/commodity-inward-report");
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
      regionOnChange({ value: details?.region?.id });
      stateOnChange({ value: details?.state?.id });
      zoneOnChange({ value: details?.substate?.id });
      districtOnChange({ value: details?.district?.id });
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
      // {
      //   title: "Commodity Inward Report",
      //   link: "/commodity-inward-report",
      // },
      {
        title: "Commodity Inward Report",
        link: "/commodity-inward-report",
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
                      placeholder="open field"
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Service contract  No*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Service contract No</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Service contract  No")}
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
                      placeholder="open field"
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
                      placeholder="open field"
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Chamber name*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Chamber name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Chamber name")}
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Region */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Region</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="region"
                      label=""
                      selectDisable={true}
                      // selectDisable={getValues("bank") ? true : false}
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.regions || []}
                      selectedValue={
                        selectBoxOptions?.regions?.filter(
                          (item) => item.value === getValues("region")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        regionOnChange(val);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  State */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">State</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="state"
                      selectDisable={true}
                      label=""
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.states || []}
                      selectedValue={
                        selectBoxOptions?.states?.filter(
                          (item) => item.value === getValues("state")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        stateOnChange(val);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Sub-state */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Sub-state</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="substate"
                      label=""
                      selectDisable={true}
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.substate || []}
                      selectedValue={
                        selectBoxOptions?.substate?.filter(
                          (item) => item.value === getValues("substate")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        zoneOnChange(val);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* District*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">District</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="district"
                      label=""
                      selectDisable={true}
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.districts || []}
                      selectedValue={
                        selectBoxOptions?.districts?.filter(
                          (item) => item.value === getValues("district")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        districtOnChange(val);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Area*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Area</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="area"
                      label=""
                      selectDisable={true}
                      isLoading={fetchLocationDrillDownApiIsLoading}
                      options={selectBoxOptions?.areas || []}
                      selectedValue={
                        selectBoxOptions?.areas?.filter(
                          (item) => item.value === getValues("area")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        areaOnChange(val);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Warehouse Address*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Warehouse Address</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Pan card number")}
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Commodity type*/}
              {/* <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Commodity type</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Commodity type")}
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid> */}
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
                      placeholder="open field"
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Agent name */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Agent/Supplier name </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Agent name ")}
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Table Start */}
              <TableContainer mt="4">
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">Select</Th>
                      <Th color="#000">Gate pass no No</Th>
                      <Th color="#000">Truck no</Th>
                      <Th color="#000">Weighbridge slip no</Th>
                      <Th color="#000">No of bags</Th>
                      <Th color="#000">Gross weight</Th>
                      <Th color="#000">Tare weight</Th>
                      <Th color="#000">Net weight</Th>
                      <Th color="#000">Avg bag weight(kg)</Th>
                      <Th color="#000">Moisture</Th>
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
                      <Td>
                        <Checkbox
                          colorScheme="CheckBoxPrimary"
                          borderColor={"primary.700"}
                        ></Checkbox>
                      </Td>
                      <Td>GP201</Td>
                      <Td>GJ 04 MH 1022</Td>
                      <Td>1456656557</Td>
                      <Td>10</Td>
                      <Td>50</Td>
                      <Td>20</Td>
                      <Td>45</Td>
                      <Td>4.5</Td>
                      <Td>20</Td>

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
              {/* Total Net Weight(MT) */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Total Net Weight(MT)</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Total Net Weight(MT) ")}
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
                      placeholder="Addition of Net weight of selected Gatepass"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/* Total No. of Bags*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Total No. of Bags</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Total No. of Bags")}
                      type="number"
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
                      placeholder="Addtion of no of bags of selected gatepass"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/*Market Rate / MT*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Market Rate / MT</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Market Rate / MT")}
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
                      placeholder="Auto filled(from price pulling"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/* Value of Total Commodity*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Value of Total Commodity</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Value of Total Commodity")}
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
                      placeholder="Auto calculated (market rate * total net weight)"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/*Value of Commodity  in words*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Value of Commodity in words</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Value of Commodity  in words")}
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
                      placeholder="open field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Insurance details* Form Start */}
              <Box mt={commonStyle.mt}>
                <Grid
                  textAlign="right"
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                  }}
                  alignItems="start"
                  gap={4}
                  bgColor={"#DBFFF5"}
                  padding="20px"
                  borderRadius="10px"
                >
                  {/* sr no  */}
                  <GridItem colSpan={{ base: 1, sm: 2, lg: 3 }}>
                    <Text fontWeight="bold" textAlign="left">
                      Insurance details
                      <span
                        style={{
                          color: "red",
                          marginLeft: "4px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                  </GridItem>
                  {/* Issued by */}
                  <GridItem colSpan={1}>
                    <Text fontWeight="bold" textAlign="left">
                      Issued by
                    </Text>
                    <Input
                      placeholder="Autofilled (GGWPL/Client/Owner/Bank)"
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      // value={stackDetail?.lot_no || ""}
                      // onChange={(e) => {
                      //   setStackDetail((old) => ({
                      //     ...old,
                      //     lot_no: e.target.value,
                      //   }));
                      // }}
                    />
                  </GridItem>
                  {/* Policy type */}
                  <GridItem colSpan={1}>
                    <Text fontWeight="bold" textAlign="left">
                      Policy type
                    </Text>
                    <ReactSelect
                      // value={
                      //   selectBoxOptions?.stack?.filter(
                      //     (item) => item.value === stackDetail?.select_stack_no
                      //   )[0] || {}
                      // }
                      // isLoading={getStackMasterApiIsLoading}
                      // onChange={(val) => {
                      //   setStackDetail((old) => ({
                      //     ...old,
                      //     select_stack_no: val.value,
                      //   }));
                      // }}
                      // options={selectBoxOptions?.stack || []}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          // borderColor: stackError.select_stack_no
                          //   ? "red"
                          //   : "gray.10",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </GridItem>
                  {/* Policy no. */}
                  <GridItem colSpan={1}>
                    <Text fontWeight="bold" textAlign="left">
                      Policy no.
                    </Text>
                    <ReactSelect
                      // value={
                      //   selectBoxOptions?.stack?.filter(
                      //     (item) => item.value === stackDetail?.select_stack_no
                      //   )[0] || {}
                      // }
                      // isLoading={getStackMasterApiIsLoading}
                      // onChange={(val) => {
                      //   setStackDetail((old) => ({
                      //     ...old,
                      //     select_stack_no: val.value,
                      //   }));
                      // }}
                      // options={selectBoxOptions?.stack || []}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          // borderColor: stackError.select_stack_no
                          //   ? "red"
                          //   : "gray.10",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </GridItem>
                  {/* Valid up to */}
                  <GridItem colSpan={1}>
                    <Text fontWeight="bold" textAlign="left">
                      Valid up to
                    </Text>
                    <Input
                      placeholder="open field"
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      // value={stackDetail?.lot_no || ""}
                      // onChange={(e) => {
                      //   setStackDetail((old) => ({
                      //     ...old,
                      //     lot_no: e.target.value,
                      //   }));
                      // }}
                    />
                  </GridItem>

                  {/* Amount (rs.) */}
                  <GridItem colSpan={1}>
                    <Text fontWeight="bold" textAlign="left">
                      Amount (rs.)
                    </Text>
                    <Input
                      placeholder="Enter Amount"
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      // value={stackDetail?.lot_no || ""}
                      // onChange={(e) => {
                      //   setStackDetail((old) => ({
                      //     ...old,
                      //     lot_no: e.target.value,
                      //   }));
                      // }}
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 1, sm: 1, lg: 1 }} alignSelf="end">
                    <Button
                      type="button"
                      backgroundColor={"primary.700"}
                      _hover={{ backgroundColor: "primary.700" }}
                      color={"white"}
                      borderRadius={"full"}
                      px={"10"}
                    >
                      {updateInsuranceId === null ? "Add" : "Edit"}
                    </Button>
                  </GridItem>
                </Grid>
              </Box>
              {/*Insurance details* Form end */}
              {/*Insurance details* Table Start */}
              <TableContainer mt="4">
                <Table color="#000">
                  <Thead bg="#dbfff5" border="1px" borderColor="#000">
                    <Tr style={{ color: "#000" }}>
                      <Th color="#000">Sr no</Th>
                      <Th color="#000">Issued by</Th>
                      <Th color="#000">Policy Type </Th>
                      <Th color="#000">Policy no</Th>
                      <Th color="#000">Valid up to</Th>
                      <Th color="#000">Amount (rs.)</Th>
                      <Th color="#000">Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr
                      // key={`chamber_${i}`}
                      textAlign="center"
                      bg="white"
                      border="1px"
                      borderColor="#000"
                    >
                      <Td>1</Td>
                      <Td>GGWPL</Td>
                      <Td>Fire </Td>
                      <Td>1232455665 </Td>
                      <Td>23-05-2024 </Td>
                      <Td>12,235,52.00</Td>

                      <Td>
                        <Box display="flex" alignItems="center" gap="3">
                          <Flex gap="20px" justifyContent="center">
                            <Box color={"primary.700"}>
                              <BiEditAlt
                                // color="#A6CE39"
                                fontSize="26px"
                                cursor="pointer"
                                // onClick={() => chamberDetailsOnEdit(item, i)}
                              />
                            </Box>
                            <Box color="red">
                              <AiOutlineDelete
                                cursor="pointer"
                                fontSize="26px"
                                // onClick={() => {
                                //   deleteChamberDetails(i);
                                // }}
                              />
                            </Box>
                          </Flex>
                        </Box>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/*Insurance details* Table end */}
              {/* Client representative name*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Client representative name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Client representative name")}
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
                      placeholder="Free field"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/*Mobile No of client representative */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Mobile No of client representative{" "}
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Mobile No of client representative")}
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
                      placeholder="Enter Mobile"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Signature of client representative*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Signature of client representative{" "}
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Enter signature")}
                      type="text"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      //  isDisabled={true}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Signature of client representative"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Upload Id Proof of Client Representative */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Upload Id Proof of Client Representative{" "}
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <CustomFileInput
                      name={"agreement_path"}
                      placeholder="Agreement upload"
                      label=""
                      type=""
                      // onChange={(e) => {
                      //   setBankDetail((old) => ({
                      //     ...old,
                      //     agreement: e,
                      //   }));
                      //   setBankError((old) => ({
                      //     ...old,
                      //     agreement: "",
                      //   }));
                      // }}
                      // value={bankDetail.agreement}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*Upload Authority letter */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Upload Authority letter</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <CustomFileInput
                      name={"agreement_path"}
                      placeholder="Agreement upload"
                      label=""
                      type=""
                      // onChange={(e) => {
                      //   setBankDetail((old) => ({
                      //     ...old,
                      //     agreement: e,
                      //   }));
                      //   setBankError((old) => ({
                      //     ...old,
                      //     agreement: "",
                      //   }));
                      // }}
                      // value={bankDetail.agreement}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Spillage bag count */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Spillage bag count</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Supervisor name")}
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
                      placeholder="Enter signature"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
              {/* Supervisor name*/}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Supervisor name</Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <Input
                      {...register("Supervisor name")}
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
                      placeholder="open fields"
                    />
                  </FormControl>
                </GridItem>
              </Grid>{" "}
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
                      placeholder="Enter remarks"
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

export default AddEditCommodityInwardReport;
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
