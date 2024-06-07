import {
  Box,
  Button,
  Flex,
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
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddAreaMasterMutation,
  useGetChamberFreeMutation,
  useGetCommodityFreeMasterMutation,
  useGetCommodityVarityFreeMasterMutation,
  useGetWareHouseFreeMutation,
  useUpdateAreaMasterMutation,
} from "../../features/master-api-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./fields";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { useFetchLocationDrillDownFreeMutation } from "../../features/warehouse-proposal.slice";
import ReactSelect from "react-select";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import CustomDatepicker from "../../components/Elements/CustomDatepicker";

function AddEditDeliveryOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let details = location.state?.details;

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const firstoptions = [
    { value: "HDFC Bank", label: "HDFC Bank" },
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
      textAlign: "left",
      "&:hover": {
        //  backgroundColor: "#C2DE8C",
        color: "black",
      },
    }),
  };

  // const inputStyle = {
  //   height: "40px",
  //   backgroundColor: "white",
  //   borderRadius: "lg",
  //   _placeholder: {
  //     color: "gray.300",
  //   },
  //   _hover: {
  //     borderColor: "primary.700",
  //     backgroundColor: "primary.200",
  //   },
  //   _focus: {
  //     borderColor: "primary.700",
  //     backgroundColor: "primary.200",
  //     boxShadow: "none",
  //   },
  //   p: { base: "4" },
  //   fontWeight: { base: "normal" },
  //   fontStyle: "normal",
  // };

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

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],
    warehouse: [],
    chamber: [],
    commodity: [],
    communityVariety: [],
  });
  const [updateStackId, setUpdateStackId] = useState(null);

  // Form Submit Function Start

  const onSubmit = (data) => {
    if (details?.id) {
      updateData({ ...data, id: details.id });
    } else {
      addData(data);
    }
  };

  // Form Submit Function End

  // Add Area Api Start

  const [addAreaMaster, { isLoading: addAreaMasterApiIsLoading }] =
    useAddAreaMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addAreaMaster(data).unwrap();
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/delivery-order");
      }
    } catch (error) {
      let errorMessage =
        error?.data?.data || error?.data?.message || "Area Adding is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  // Update Area Api Start

  const [updateAreaMaster, { isLoading: updateAreaMasterApiIsLoading }] =
    useUpdateAreaMasterMutation();

  const updateData = async (data) => {
    try {
      const response = await updateAreaMaster(data).unwrap();
      if (response.status === 200) {
        toasterAlert(response);
        navigate("/manage-location/area-master");
      }
    } catch (error) {
      let errorMessage =
        error?.data?.data || error?.data?.message || "Area Updating is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  // Update Area Api Start

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownFreeMutation();

  const getRegionMasterList = async () => {
    try {
      const response = await fetchLocationDrillDown().unwrap();
      console.log("getRegionMasterList:", response);

      const arr = response?.region
        ?.filter((item) => item.region_name !== "ALL - Region")
        .map(({ region_name, id }) => ({
          label: region_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        regions:
          details?.region?.is_active === false
            ? [
                ...arr,
                {
                  label: details?.region?.region_name,
                  value: details?.region?.id,
                },
              ]
            : arr,
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

      const arr = response?.state
        ?.filter((item) => item.state_name !== "All - State")
        .map(({ state_name, id }) => ({
          label: state_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        states:
          details?.state?.is_active === false
            ? [
                ...arr,
                {
                  label: details?.state?.state_name,
                  value: details?.state?.id,
                },
              ]
            : arr,
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

      const arr = response?.substate
        ?.filter((item) => item.substate_name !== "All - Zone")
        .map(({ substate_name, id }) => ({
          label: substate_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        substate:
          details?.substate?.is_active === false
            ? [
                ...arr,
                {
                  label: details?.substate?.substate_name,
                  value: details?.substate?.id,
                },
              ]
            : arr,
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

      const arr = response?.district
        ?.filter((item) => item.district_name !== "All - District")
        .map(({ district_name, id }) => ({
          label: district_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        districts:
          details?.district?.is_active === false
            ? [
                ...arr,
                {
                  label: details?.district?.district_name,
                  value: details?.district?.id,
                },
              ]
            : arr,
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

      const arr = response?.area
        ?.filter((item) => item.area_name !== "All - District")
        .map(({ area_name, id }) => ({
          label: area_name,
          value: id,
        }));

      setSelectBoxOptions((prev) => ({
        ...prev,
        areas:
          details?.area?.is_active === false
            ? [
                ...arr,
                {
                  label: details?.area?.area_name,
                  value: details?.area?.id,
                },
              ]
            : arr,
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
  // Region State  Zone District Area  onChange drill down api end //

  // Warehouse Master start

  const [getWarehouseMaster, { isLoading: getWarehouseMasterApiIsLoading }] =
    useGetWareHouseFreeMutation();

  const getWarehouseMasterList = async () => {
    try {
      const response = await getWarehouseMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          warehouse: response?.data?.map(({ warehouse_name, id }) => ({
            label: warehouse_name,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Warehouse Master End

  //Chamber Master Start
  const [getChamberMaster, { isLoading: getChamberApiIsLoading }] =
    useGetChamberFreeMutation();

  const getChamberMasterList = async () => {
    try {
      const response = await getChamberMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          chamber: response?.data?.map(({ chamber_number, id }) => ({
            label: chamber_number,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //chamber master End

  //commodity master Start
  const [getCommodityMaster, { isLoading: getCommodityMasterApiIsLoading }] =
    useGetCommodityFreeMasterMutation();

  const getCommodityMasterList = async () => {
    try {
      const response = await getCommodityMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          community: response?.data?.map(({ commodity_name, id }) => ({
            label: commodity_name,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Commodity master end

  //commodity variety master Start
  const [getCommodityVarity, { isLoading: getCommodityVarityApiIsLoading }] =
    useGetCommodityVarityFreeMasterMutation();

  const getCommodityVarityList = async () => {
    try {
      const response = await getCommodityVarity().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          communityVariety: response?.data?.map(
            ({ commodity_variety, id }) => ({
              label: commodity_variety,
              value: id,
            })
          ),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //commodity variety master end

  const [selectedOption1, setSelectedOption1] = useState(null);

  const handleSelectChange1 = (selectedOption) => {
    setSelectedOption1(selectedOption);
  };

  // Edit Form Fill Logic Start
  useEffect(() => {
    getRegionMasterList();
    getWarehouseMasterList();
    getChamberMasterList();
    getCommodityMasterList();
    getCommodityVarityList();

    if (details?.id) {
      regionOnChange({ value: details?.region?.id });
      stateOnChange({ value: details?.state?.id });
      zoneOnChange({ value: details?.substate?.id });
      districtOnChange({ value: details?.district?.id });
      let obj = {
        region: details?.region?.id,
        state: details?.state?.id,
        substate: details.substate?.id,
        district: details.district?.id,
        area: details.area?.id,
        warehouse_name: details?.warehouse_name?.id,
        is_active: details.is_active,
      };
      console.log("details", details);
      console.log("obj", obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    const breadcrumbArray = [
      {
        title: "Delivery Order",
        link: "/delivery-order",
      },
      {
        title: "Delivery Order Details",
        link: "/delivery-order",
      },
      {
        title: details?.id ? "Edit" : "Add",
      },
    ];

    dispatch(setBreadCrumb(breadcrumbArray));
  }, [details]);

  useEffect(() => {
    return () => {
      dispatch(setBreadCrumb([]));
    };
  }, []);
  // Edit Form Fill Logic End

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 285px )" overflowY="auto">
            <Box>
              <Box ox>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Delivery Order No <span style={{ color: "red" }}>*</span>
                    </Text>
                    <Input
                      type="number"
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      borderRadius={"lg"}
                      //value={inputValue}
                      //  onChange={onChange}
                      _placeholder={commonStyle._placeholder}
                      _hover={commonStyle._hover}
                      _focus={commonStyle._focus}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Autofilled"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">Name of Client </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
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
                  </FormControl>
                </GridItem>
              </Grid>

              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                    mt="10px"
                  >
                    <Text textAlign="right">
                      Region <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="region"
                      label=""
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
                  </Grid>
                </MotionSlideUp>
              </Box>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                    mt="10px"
                  >
                    <Text textAlign="right">
                      State <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="state"
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
                  </Grid>
                </MotionSlideUp>
              </Box>
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                    mt="10px"
                  >
                    <Text textAlign="right">
                      Sub State <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="substate"
                      label=""
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
                  </Grid>
                </MotionSlideUp>
              </Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">
                    District <span style={{ color: "red" }}>*</span>
                  </Text>
                  <ReactCustomSelect
                    name="district"
                    label=""
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
                </Grid>
              </MotionSlideUp>

              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                >
                  <Text textAlign="right">
                    Area <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                  <ReactCustomSelect
                    name="area"
                    label=""
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
                </Grid>
              </MotionSlideUp>
            </Box>
            {/* warehouse name  */}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Grid
                gap={4}
                templateColumns={"repeat(3, 1fr)"}
                alignItems="center"
                mt="10px"
              >
                <Text textAlign="right">
                  Warehouse name <span style={{ color: "red" }}>*</span>
                </Text>

                <ReactSelect
                  options={selectBoxOptions?.warehouse || []}
                  // onChange={(e) => {
                  //   setWarehouseDetails((old) => ({
                  //     ...old,
                  //     warehouse: e.value,
                  //
                  //   }));
                  // }}
                  // isDisabled={InputDisableFunction()}
                  // value={
                  //   selectBoxOptions?.warehouse?.filter(
                  //     (item) => item.value === getValues("warehouse_id")
                  //   )[0] || {}
                  // }
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
                  isLoading={getWarehouseMasterApiIsLoading}
                />
              </Grid>
            </MotionSlideUp>
            {/* chamber Number */}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Grid
                gap={4}
                templateColumns={"repeat(3, 1fr)"}
                alignItems="center"
                mt="10px"
              >
                <Text textAlign="right">
                  Select Chamber No <span style={{ color: "red" }}>*</span>
                </Text>

                <ReactSelect
                  options={selectBoxOptions?.chamber || []}
                  // onChange={(e) => {
                  //   setWarehouseDetails((old) => ({
                  //     ...old,
                  //     warehouse: e.value,
                  //
                  //   }));
                  // }}
                  // isDisabled={InputDisableFunction()}
                  // value={
                  //   selectBoxOptions?.warehouse?.filter(
                  //     (item) => item.value === getValues("warehouse_id")
                  //   )[0] || {}
                  // }
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
                  isLoading={getChamberApiIsLoading}
                />
              </Grid>
            </MotionSlideUp>
            {/* commodity name */}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Grid
                gap={4}
                templateColumns={"repeat(3, 1fr)"}
                alignItems="center"
                mt="10px"
              >
                <Text textAlign="right">
                  Commodity Name <span style={{ color: "red" }}>*</span>
                </Text>

                <ReactSelect
                  options={selectBoxOptions?.community || []}
                  // onChange={(e) => {
                  //   setWarehouseDetails((old) => ({
                  //     ...old,
                  //     warehouse: e.value,
                  //
                  //   }));
                  // }}
                  // isDisabled={InputDisableFunction()}
                  // value={
                  //   selectBoxOptions?.warehouse?.filter(
                  //     (item) => item.value === getValues("warehouse_id")
                  //   )[0] || {}
                  // }
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
                  isLoading={getCommodityMasterApiIsLoading}
                />
              </Grid>
            </MotionSlideUp>
            {/* commodity verity */}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Grid
                gap={4}
                templateColumns={"repeat(3, 1fr)"}
                alignItems="center"
                mt="10px"
              >
                <Text textAlign="right">
                  Commodity Variety <span style={{ color: "red" }}>*</span>
                </Text>

                <ReactSelect
                  options={selectBoxOptions?.communityVariety || []}
                  // onChange={(e) => {
                  //   setWarehouseDetails((old) => ({
                  //     ...old,
                  //     warehouse: e.value,
                  //
                  //   }));
                  // }}
                  // isDisabled={InputDisableFunction()}
                  // value={
                  //   selectBoxOptions?.warehouse?.filter(
                  //     (item) => item.value === getValues("warehouse_id")
                  //   )[0] || {}
                  // }
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
                  isLoading={getCommodityVarityApiIsLoading}
                />
              </Grid>
            </MotionSlideUp>

            {/* WHR details */}
            <Box
              bgColor={"#DBFFF5"}
              padding={"4"}
              borderRadius={"md"}
              mt="10px"
            >
              {" "}
              <Text fontWeight="bold" textAlign="left">
                WHR details
                <span
                  style={{
                    color: "red",
                    marginLeft: "4px",
                  }}
                >
                  *
                </span>
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(3,1fr)",
                }}
                spacing="5"
                gap={5}
                mt="10px"
              >
                {/*  whr no */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    WHR No
                  </Text>

                  {/* <Grid templateColumns={"repeat(2, 1fr)"} gap={"2"}>
                    <Box
                      width={{
                        base: "248px",
                        sm: "560px",
                        md: "250px",
                        lg: "200px",
                        xl: "250px",
                      }}
                    >
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
                    </Box>

                    <Box
                      border={"1px solid lightgray"}
                      borderRadius={"md"}
                      padding={"2"}
                      justifyContent={"right"}
                    >
                      <AiOutlineEye size={"20"} />
                    </Box>
                  </Grid> */}

                  <Box>
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
                  </Box>
                </FormControl>

                {/* bag size */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Bag Size
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* balance bags in WHR */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Balance Bag In WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* balance MT in WHR */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Balance MT In WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* stack no  */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Stack No{" "}
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
                </FormControl>
                {/* lot  no  */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Lot No{" "}
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
                </FormControl>

                {/*balance bags in lot */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Balance Bags In Lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>
                {/* balance MT in lot */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Balance MT In Lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* to be delivered bags from lot */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    To Be Delivered Bags From Lot
                  </Text>
                  <Input
                    placeholder="free field"
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
                </FormControl>

                {/* to be delivered MT from lot */}

                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    To Be Delivered MT From Lot
                  </Text>
                  <Input
                    placeholder="free field"
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
                </FormControl>

                {/* Remaining MT in lot */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Remaining MT in lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* Remaining bag in lot */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Remaining bag in lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* Remaining bag in WHR  */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Remaining bag in WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* Remaining bag in WHR  */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Remaining bag in WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* Remaining MT in WHR  */}
                <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Remaining MT in WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>

                {/* WHR Date */}
                {/* <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    WHR Date
                  </Text>
                  <Input
                    placeholder="Auto filled"
                    type="date"
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
                </FormControl> */}

                {/* Total bags In WHR*/}
                {/* <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Total bags In WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl> */}

                {/*  Total MT in WHR  */}
                {/* <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Total MT in WHR
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl> */}

                {/*total bags in lot */}
                {/* <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Total Bags in Lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl> */}

                {/* total MT in lot   */}

                {/* <FormControl>
                  <Text fontWeight="bold" textAlign="left">
                    Total MT in Lot
                  </Text>
                  <Input
                    placeholder="Auto filled"
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
                </FormControl>
                */}
              </Grid>
              <Box
                display="flex"
                gap={2}
                justifyContent="flex-end"
                px="0"
                mt="20px"
              >
                <Button
                  type="button"
                  //w="full"
                  backgroundColor={"primary.700"}
                  _hover={{ backgroundColor: "primary.700" }}
                  color={"white"}
                  borderRadius={"full"}
                  // my={"4"}
                  px={"10"}
                  // onClick={() => {
                  //   updateStackId === null
                  //     ? AddStackDetails()
                  //     : updateStackDetails();
                  // }}
                >
                  {updateStackId === null ? "Add" : "Edit"}
                </Button>
              </Box>
            </Box>

            {/* table  */}
            <TableContainer mt="4">
              <Table color="#000">
                <Thead bg="#dbfff5" border="1px" borderColor="#000">
                  <Tr style={{ color: "#000" }}>
                    <Th color="#000">Sr no</Th>
                    <Th color="#000">WHR No</Th>
                    <Th color="#000">Bag Size </Th>
                    <Th color="#000">Balance Bags in WHR</Th>
                    <Th color="#000">Balance MT in WHR</Th>

                    <Th color="#000">Stack no</Th>
                    <Th color="#000">Lot No</Th>
                    <Th color="#000">Balance Bags In Lot</Th>
                    <Th color="#000">Balance MT In Lot</Th>
                    <Th color="#000">To Be Delivered Bags From Lot</Th>
                    <Th color="#000">To Be Delivered MT From Lot</Th>

                    <Th color="#000">Remaining MT in lot</Th>
                    <Th color="#000">Remaining bag in lot</Th>
                    <Th color="#000">Remaining bag in WHR </Th>
                    <Th color="#000">Remaining MT in WHR </Th>

                    <Th color="#000">View WHR</Th>
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
                    <Td>3 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
                    <Td>6 </Td>
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

            {/* total to be delivered Bags */}

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Total to be delivered bags</Text>
                  <Input
                    placeholder="Auto filled"
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* total to be delivered mt */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Total to be delivered MT</Text>
                  <Input
                    placeholder="Auto filled"
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Authorised person of client */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Authorised person of client</Text>
                  <Input
                    placeholder="Free field "
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Authorised person mobile no */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Authorised person mobile no</Text>
                  <Input
                    placeholder="Free field "
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Authorise person ID Proof type */}
            <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
              <Grid
                gap={4}
                templateColumns={"repeat(3, 1fr)"}
                alignItems="center"
                mt="10px"
              >
                <Text textAlign="right">
                  Authorise person ID Proof type{" "}
                  <span style={{ color: "red" }}>*</span>
                </Text>

                <ReactSelect
                  options={selectBoxOptions?.chamber || []}
                  // onChange={(e) => {
                  //   setWarehouseDetails((old) => ({
                  //     ...old,
                  //     warehouse: e.value,
                  //
                  //   }));
                  // }}
                  // isDisabled={InputDisableFunction()}
                  // value={
                  //   selectBoxOptions?.warehouse?.filter(
                  //     (item) => item.value === getValues("warehouse_id")
                  //   )[0] || {}
                  // }
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      // borderColor: clientError.clientType ? "red" : "#c3c3c3",

                      padding: "1px",
                      textAlign: "left",
                      placeholder: "Aadhar / PAN",
                    }),
                    ...reactSelectStyle,
                  }}
                  // isLoading={getChamberApiIsLoading}
                />
              </Grid>
            </MotionSlideUp>

            {/* Authorise Person ID Proof no */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Authorise Person ID Proof no </Text>
                  <Input
                    placeholder="Enter id proof no "
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Upload client authority letter */}

            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Upload client authority letter </Text>
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Broker name */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Broker name </Text>
                  <Input
                    placeholder="Broker names "
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Expire date of DO */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">
                    Expire date of DO <span style={{ color: "red" }}>*</span>
                  </Text>
                  <CustomDatepicker
                    name="date_of_transfer"
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* Remarks */}
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                  mt="10px"
                >
                  <Text textAlign="right">Remarks </Text>
                  <Input
                    placeholder="Remarks "
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
                </Grid>
              </MotionSlideUp>
            </Box>

            {/* DO Update history table */}

            <Box marginTop="10">
              <Text fontSize={"xl"} color={"black"} fontWeight={"normal"}>
                DO Update history
              </Text>
            </Box>

            <TableContainer mt="4">
              <Table color="#000">
                <Thead bg="#dbfff5" border="1px" borderColor="#000">
                  <Tr style={{ color: "#000" }}>
                    <Th color="#000">Sr no</Th>
                    <Th color="#000">L1 User name </Th>
                    <Th color="#000">L2 User name</Th>
                    <Th color="#000">L3 User name</Th>
                    <Th color="#000">Final Expiry Date</Th>
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
                    <Td>Het </Td>
                    <Td>Asim</Td>
                    <Td>Vaibhav </Td>
                    <Td>18 Jul 2022 </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <Box
              display="flex"
              gap={2}
              justifyContent="flex-end"
              mt="10"
              px="0"
            >
              <Button
                type="submit"
                //w="full"
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addAreaMasterApiIsLoading || updateAreaMasterApiIsLoading
                }
                my={"4"}
                px={"10"}
              >
                {details?.id ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default AddEditDeliveryOrder;

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
