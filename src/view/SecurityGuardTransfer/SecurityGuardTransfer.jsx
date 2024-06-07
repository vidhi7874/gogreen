import {
  Box,
  Grid,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MotionSlideUp } from "../../utils/animation";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomInput from "../../components/Elements/CustomInput";
import CustomDatepicker from "../../components/Elements/CustomDatepicker";
import { useFetchLocationDrillDownMutation } from "../../features/warehouse-proposal.slice";
import { useLocation } from "react-router-dom";
import {
  useGetSecurityAgencyMasterMutation,
  useGetSecurityGuardMasterMutation,
  useGetSecurityGuardTransferListMutation,
  useGetSecurityGuardTransferMutation,
  useTransferSecurityGuardMutation,
} from "../../features/master-api-slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

function SecurityGuardTransfer() {
  const methods = useForm();
  const [tableData, setTableData] = useState([]);
  const tableDatas_old = [
    {
      srno: 1,
      Warehousename: "Warehouse - Xyz",
      Securityguardname: "Het",
      Startdate: "Jun 20, 2022",
      status: "Transfer Received",
    },
    {
      srno: 2,
      Warehousename: "Warehouse - Xyz",
      Securityguardname: "Het",
      Startdate: "Jun 20, 2022",
      status: "Transfer Received",
    },
    {
      srno: 3,
      Warehousename: "Warehouse - Xyz",
      Securityguardname: "Het",
      Startdate: "Jun 20, 2022",
      status: "Transfer Received",
    },
    {
      srno: 4,
      Warehousename: "Warehouse - Xyz",
      Securityguardname: "Het",
      Startdate: "Jun 20, 2022",
      status: "Transfer Received",
    },
    {
      srno: 5,
      Warehousename: "Warehouse - Xyz",
      Securityguardname: "Het",
      Startdate: "Jun 20, 2022",
      status: "Transfer Received",
    },
  ];
  const [locationDrillDownState, setLocationDrillDownState] = useState({});
  const [transferListsIds, setTransferListsIds] = useState([]);
  const location = useLocation();

  const {
    setValue,
    getValues,
    formState: { errors },
  } = methods;

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],
    areas: [],
    agencyList: [],
    guardList: [],
  });

  const onSubmit = async () => {
    console.log(transferListsIds);
    let obj = {
      warehouses: transferListsIds,
      date_of_transfer: "2023-08-15",
      from_security_guard: getValues("from_security_guard"),
      to_security_guard: getValues("to_security_guard"),
    };

    console.log(obj);

    try {
      const res = await transferSecurityGuard(obj).unwrap();
      if (res?.status === 200) {
        console.log("dsfd");
        toasterAlert(res);
      }
      console.log("fetchLocationDrillDown response :", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let details = location.state?.details;
  console.log("details ---> ", details);

  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownMutation();

  const [
    getSecurityGuardTypeMaster,
    { isLoading: getSecurityGuardTypeMasterApiIsLoading },
  ] = useGetSecurityGuardTransferMutation();

  // warehouse/security_guard_transfer/

  const [
    getSecurityAgencyMaster,
    { isLoading: getSecurityAgencyMasterApiIsLoading },
  ] = useGetSecurityAgencyMasterMutation();

  const [
    getSecurityGuardMaster,
    { isLoading: getSecurityGuardMasterApiIsLoading },
  ] = useGetSecurityGuardMasterMutation();

  const [
    getSecurityGuardTransferList,
    { isLoading: getSecurityGuardTransferListIsLoading },
  ] = useGetSecurityGuardTransferListMutation();

  const [transferSecurityGuard, { isLoading: transferSecurityGuardIsLoading }] =
    useTransferSecurityGuardMutation();

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

      if (details?.region?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: [
            ...arr,
            {
              label: details?.region?.region_name,
              value: details?.region?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          regions: arr,
        }));
      }
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
      if (details?.district?.substate?.state?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: [
            ...arr,
            {
              label: details?.district?.substate?.state?.state_name,
              value: details?.district?.substate?.state?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          states: arr,
        }));
      }
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
      if (details?.district?.substate?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          substate: [
            ...arr,
            {
              label: details?.district?.substate?.substate_name,
              value: details?.district?.substate?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          substate: arr,
        }));
      }
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
      if (details?.district?.is_active === false) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          districts: [
            ...arr,
            {
              label: details?.district?.district_name,
              value: details?.district?.id,
            },
          ],
        }));
      } else {
        setSelectBoxOptions((prev) => ({
          ...prev,
          districts: arr,
        }));
      }
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

    console.log("query", query);

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

  const areaOnChange = async (val) => {
    setValue("area", val?.value, {
      shouldValidate: true,
    });

    const query = {
      region: getValues("region"),
      state: getValues("state"),
      substate: getValues("substate"),
      district: getValues("district"),
      area: val?.value,
    };

    try {
      const response = await getSecurityAgencyMaster(query).unwrap();
      console.log("responseFrom", response);
      if (response?.status === 200) {
        let list = response?.results?.map((el) => ({
          label: el.security_agency_name,
          value: el.id,
        }));

        setSelectBoxOptions((prev) => ({
          ...prev,
          agencyList: list,
        }));
      }
    } catch (error) {
      console.log("Error: " + error);
    }

    console.log(query);
  };

  const fromAgencyOnChange = async (val) => {
    setValue("security_agency_name", val.value, {
      shouldValidate: true,
    });

    let query = {
      security_agency_id: val.label,
    };
    try {
      const response = await getSecurityGuardMaster(query).unwrap();
      console.log(response);
      if (response?.status === 200) {
        let list = response.results.map((el) => ({
          label: el.security_guard_name,
          value: el.id,
        }));
        console.log(list);
        setSelectBoxOptions((prev) => ({
          ...prev,
          guardList: list,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fromSecurityGuardOnChange = async (val) => {
    setValue("from_security_guard", val.value, {
      shouldValidate: true,
    });

    try {
      const response = await getSecurityGuardTransferList(val.value).unwrap();
      console.log(response);
      if (response?.status === 200) {
        setTableData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFromSecurityAgency = async () => {
    try {
      const response = await getSecurityGuardTypeMaster().unwrap();
      console.log("responseFrom", response);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const onCheck = (e, id) => {
    let isChecked = e.target.checked;
    console.log(id);

    if (isChecked) {
      setTransferListsIds((prevIds) => [...prevIds, id]);
    } else {
      setTransferListsIds((prevIds) =>
        prevIds.filter((prevId) => prevId !== id)
      );
    }
  };

  const getFromSecurityGuard = async () => {
    try {
      const response = await getSecurityGuardTypeMaster().unwrap();
      console.log("responseFrom", response);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getRegionMasterList();
    getFromSecurityAgency();
  }, []);

  return (
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 285px )" overflowY="auto">
            <Box>
              {" "}
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
              <Box>
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
                      handleOnChange={(val) => {
                        districtOnChange(val);
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
                      Area <span style={{ color: "red" }}>*</span>
                    </Text>
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
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                    mt="10px"
                  >
                    <Text textAlign="right">
                      From Agency <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="security_agency_name"
                      label=""
                      isLoading={getSecurityAgencyMasterApiIsLoading}
                      options={selectBoxOptions?.agencyList || []}
                      selectedValue={
                        selectBoxOptions?.agencyList?.filter(
                          (item) =>
                            item.value === getValues("security_agency_name")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => fromAgencyOnChange(val)}
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
                      From security guard{" "}
                      <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="from_security_guard"
                      label=""
                      isLoading={getSecurityGuardMasterApiIsLoading}
                      options={selectBoxOptions?.guardList || []}
                      selectedValue={
                        selectBoxOptions?.guardList?.filter(
                          (item) =>
                            item.value === getValues("from_security_guard")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => fromSecurityGuardOnChange(val)}
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
                      To Agency <span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="to_agency"
                      label=""
                      isLoading={getSecurityGuardMasterApiIsLoading}
                      options={selectBoxOptions?.agencyList || []}
                      selectedValue={
                        selectBoxOptions?.agencyList?.filter(
                          (item) => item.value === getValues("to_agency")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("to_agency", val.value, {
                          shouldValidate: true,
                        });
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
                      To security guard<span style={{ color: "red" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="to_security_guard"
                      label=""
                      isLoading={getSecurityGuardMasterApiIsLoading}
                      options={selectBoxOptions?.guardList || []}
                      selectedValue={
                        selectBoxOptions?.guardList?.filter(
                          (item) =>
                            item.value === getValues("to_security_guard")
                        )[0] || {}
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("to_security_guard", val.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>
              <Box mt="6">
                <TableContainer border={"none"}>
                  <Table variant="simple">
                    <Thead backgroundColor={"aqua.100"}>
                      <Tr>
                        <Th border={"none"} color="#000">
                          Sr no
                        </Th>
                        <Th border={"none"} color="#000">
                          Warehouse name
                        </Th>
                        <Th border={"none"} color="#000">
                          Security guard name
                        </Th>
                        <Th border={"none"} color="#000">
                          Start date
                        </Th>
                        <Th border={"none"} color="#000">
                          Status{" "}
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {tableData?.length === 0 && (
                        <Tr textAlign={"center"}>
                          <Td textAlign="center"></Td>
                          <Td textAlign="center"></Td>
                          <Td textAlign="center">No data found</Td>
                          <Td textAlign="center"></Td>
                          <Td textAlign="center"></Td>
                        </Tr>
                      )}

                      {tableData.length === 0 &&
                        getSecurityGuardTypeMasterApiIsLoading && (
                          <Tr textAlign={"center"}>
                            <Td textAlign="center"></Td>
                            <Td textAlign="center"></Td>
                            <Td textAlign="center">Loading...</Td>
                            <Td textAlign="center"></Td>
                            <Td textAlign="center"></Td>
                          </Tr>
                        )}

                      {tableData?.length > 0 &&
                        tableData?.map((item, ind) => (
                          <Tr key={`table_${ind}`} textAlign={"center"}>
                            <Td>
                              <Checkbox
                                // defaultChecked
                                size="lg"
                                colorScheme="green"
                                onChange={(e) => onCheck(e, item.id)}
                              >
                                {" "}
                                {ind + 1}
                              </Checkbox>
                            </Td>
                            <Td textAlign={"center"}>
                              {item.warehouse?.warehouse_name}
                            </Td>
                            <Td textAlign={"center"}>
                              {item?.from_security_guard?.security_guard_name}
                            </Td>
                            <Td textAlign={"center"}>{item.start_date}</Td>
                            <Td textColor={"primary.700"} textAlign={"center"}>
                              {item.status}
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
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
                      Date of transfer <span style={{ color: "red" }}>*</span>
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
            
            </Box>

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
                // my={"4"}
                px={"10"}
              >
                Transfer
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}

export default SecurityGuardTransfer;

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
