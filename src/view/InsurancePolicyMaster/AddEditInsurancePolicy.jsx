/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addEditFormFields, schema } from "./fields";
import {
  useAddInsurancePolicyMasterMutation,
  useGetBankMasterMutation,
  useGetClientMasterFreeTypeMutation,
  useGetCommodityMasterMutation,
  useGetEarthQuakeZoneTypeMasterMutation,
  useGetWareHouseFreeMutation,
  useGetWareHouseOwnerFreeMutation,
  useUpdateInsurancePolicyMasterMutation,
} from "../../features/master-api-slice";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import generateFormField from "../../components/Elements/GenerateFormField";
import ReactCustomSelect from "../../components/Elements/CommonFielsElement/ReactCustomSelect";
import CustomInput from "../../components/Elements/CustomInput";
import CustomFileInput from "../../components/Elements/CustomFileInput";
import CustomSwitch from "../../components/Elements/CustomSwitch";
import { useGetWarehouseUnitTypeMutation } from "../../features/warehouse-proposal.slice";
import FileUploadCmp from "../../components/Elements/FileUploadCmp";

const AddEditInsurancePolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const details = location.state?.details;
  console.log("details ---> ", details);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      is_active: !details?.id, // Set is_active to true only when adding
    },
  });

  const [formKey, setFormKey] = useState(0);
  const initialIsActive = details ? details.is_active : true;
  const [Earthquackzone, setEarthquackzone] = useState(null);
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    states: [],
    warehouseOwner: [],

    insuranceType: [
      {
        label: "Fire",
        value: "fire",
      },
      {
        label: "Burglary",
        value: "burglary",
      },
    ],
    unit: [
      {
        label: "Dry",
        value: "dry",
      },
      {
        label: "Cold",
        value: "cold",
      },
      {
        label: "Oil tank",
        value: "oil_tank",
      },
      {
        label: "Silo",
        value: "silo",
      },
      {
        label: "Open Plinth",
        value: "open_plinth",
      },
    ],
    policy: [
      {
        label: "Go green",
        value: "go_green",
      },
      {
        label: "Client",
        value: "client",
      },
      {
        label: "Bank",
        value: "bank",
      },
      {
        label: "Owner",
        value: "owner",
      },
    ],
  });

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);
  const {
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = (data) => {
    console.log("data==>", data);
    const { commodity, hypothecation_with_multiple_bank, ...formData } = data;

    if (details?.id) {
      updateData(
        (commodity === null ||
          commodity?.length === 0 ||
          commodity === undefined) &&
          (hypothecation_with_multiple_bank === null ||
            hypothecation_with_multiple_bank?.length === 0 ||
            hypothecation_with_multiple_bank === undefined)
          ? {
              ...formData,
              id: details.id,
              hypothecation_with_multiple_bank: [],
              commodity: [],
            }
          : commodity === null ||
            commodity?.length === 0 ||
            commodity === undefined
          ? {
              ...formData,
              hypothecation_with_multiple_bank:
                hypothecation_with_multiple_bank,
              id: details.id,
              commodity: [],
            }
          : hypothecation_with_multiple_bank === null ||
            hypothecation_with_multiple_bank?.length === 0 ||
            hypothecation_with_multiple_bank === undefined
          ? {
              ...formData,
              commodity: commodity,
              id: details.id,
              hypothecation_with_multiple_bank: [],
            }
          : { ...data, id: details.id }
      );
    } else {
      addData(
        (commodity === null ||
          commodity?.length === 0 ||
          commodity === undefined) &&
          (hypothecation_with_multiple_bank === null ||
            hypothecation_with_multiple_bank?.length === 0 ||
            hypothecation_with_multiple_bank === undefined)
          ? formData
          : commodity === null ||
            commodity?.length === 0 ||
            commodity === undefined
          ? {
              ...formData,
              hypothecation_with_multiple_bank:
                hypothecation_with_multiple_bank,
            }
          : hypothecation_with_multiple_bank === null ||
            hypothecation_with_multiple_bank?.length === 0 ||
            hypothecation_with_multiple_bank === undefined
          ? {
              ...formData,
              commodity: commodity,
            }
          : data
      );
    }
  };
  // for clear data in form
  console.log("form errors --->", errors);

  const clearForm = () => {
    const defaultValues = methods.getValues();
    Object.keys(defaultValues)?.forEach((key) => {
      setValue(key, null, {
        shouldValidate: true,
      });
    });

    setFormKey(formKey + 1); // Trigger re-render
  };

  // Warehouse Unit type code start
  const [
    getWarehouseUnitType,
    { isLoading: getWarehouseUnitTypeApiIsLoading },
  ] = useGetWarehouseUnitTypeMutation();

  const getWarehouseUnitTypeMasterList = async () => {
    try {
      const response = await getWarehouseUnitType().unwrap();

      const arr = response?.results?.map(({ warehouse_unit_type, id }) => ({
        label: warehouse_unit_type,
        value: id,
      }));

      console.log("getWarehouseUnitTypeMasterList:", response, arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        warehouseUnitType: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getWarehouseUnitTypeMasterList();
  }, []);

  // Warehouse Unit Type code End
  const [
    addInsurancePolicyMaster,
    { isLoading: addInsurancePolicyMasterApiIsLoading },
  ] = useAddInsurancePolicyMasterMutation();

  const [
    updateInsurancePolicyMaster,
    { isLoading: updateInsurancePolicyMasterApiIsLoading },
  ] = useUpdateInsurancePolicyMasterMutation();

  const [
    getEarthquakeZoneTypeMaster,
    { isLoading: getEarthquakeZoneTypeMasterApiIsLoading },
  ] = useGetEarthQuakeZoneTypeMasterMutation();

  const EarthZoneData = async () => {
    try {
      const response = await getEarthquakeZoneTypeMaster().unwrap();
      console.log("here:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.earthquake_zone_type,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        earthZone: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [getCommodityMaster, { isLoading: getCommodityMasterApiIsLoading }] =
    useGetCommodityMasterMutation();

  const CommodityData = async () => {
    try {
      const response = await getCommodityMaster().unwrap();
      console.log("here:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.commodity_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        commodity: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [getBankMaster, { isLoading: getBankMasterApiIsLoading }] =
    useGetBankMasterMutation();

  const BankMasterData = async () => {
    try {
      const response = await getBankMaster().unwrap();
      console.log("here:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.bank_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        bank: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Client Master start

  const [getClientMaster, { isLoading: getClientMasterApiIsLoading }] =
    useGetClientMasterFreeTypeMutation();

  const getClientMasterList = async () => {
    try {
      const response = await getClientMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          client: response?.data?.map(({ name_of_client, id }) => ({
            label: name_of_client,
            value: id,
          })),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getClientMasterList();
  }, []);

  // Client Master end

  // Warehouse Master start

  const [getWarehouseMaster, { isLoading: getWarehouseMasterApiIsLoading }] =
    useGetWareHouseFreeMutation();

  const getWarehouseMasterList = async (params) => {
    try {
      const response = await getWarehouseMaster(params).unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          warehouse: response?.data?.map(
            ({ warehouse_name, id, total_rent_payable }) => ({
              label: warehouse_name,
              value: id,
              rent: total_rent_payable,
            })
          ),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getWarehouseMasterList();
  }, []);

  // Warehouse Master end

  // Warehouse Owner Master start

  const [
    getWarehouseOwnerMaster,
    { isLoading: getWarehouseOwnerMasterApiIsLoading },
  ] = useGetWareHouseOwnerFreeMutation();

  const getWarehouseOwnerMasterList = async () => {
    try {
      const response = await getWarehouseOwnerMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setSelectBoxOptions((prev) => ({
          ...prev,
          warehouseOwner: response?.data?.map(
            ({
              warehouse_owner_name,
              id,
              area__earthquake_zone_type__earthquake_zone_type,
            }) => ({
              label: warehouse_owner_name,
              value: id,
              earthquakeZoneType:
                area__earthquake_zone_type__earthquake_zone_type,
            })
          ),
        }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileChange = (url, name) => {
    setValue(name, url, { shouldValidate: true });
  };

  useEffect(() => {
    getWarehouseOwnerMasterList();
  }, []);

  useEffect(() => {
    if (Earthquackzone) {
      // Filter the options based on the selected Earthquackzone
      const filteredOptions = selectBoxOptions.warehouseOwner.filter(
        (option) => option.earthquakeZoneType === Earthquackzone
      );

      // Update the state with the filtered options
      setSelectBoxOptions((prev) => ({
        ...prev,
        warehouseOwner: filteredOptions,
      }));
    }
  }, [Earthquackzone]);

  // Warehouse Owner Master end

  const addData = async (data) => {
    try {
      const response = await addInsurancePolicyMaster(data).unwrap();
      console.log("add insurance policy master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/manage-insurance/insurance-policy-master");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        "Insurance Policy Adding is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  const getInsurancePolicy = async () => {
    try {
      setAddEditFormFieldsList(
        addEditFormFields.map((field) => {
          return field;
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateData = async (data) => {
    try {
      const response = await updateInsurancePolicyMaster({
        ...data,
        id: details.id,
      }).unwrap();
      if (response.status === 200) {
        console.log("update insurance policy master res", response);
        toasterAlert(response);
        navigate("/manage-insurance/insurance-policy-master");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        "Insurance Policy Updating is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  useEffect(() => {
    getInsurancePolicy();
    EarthZoneData();
    CommodityData();
    BankMasterData();

    if (details?.id) {
      const tempcommodityArr = details?.commodity?.map((item) => {
        return item.id;
      });
      const tempmultibankArr = details?.hypothecation_with_multiple_bank?.map(
        (item) => {
          return item.id;
        }
      );

      let obj = {
        policy_number: details?.policy_number,
        insurance_policy_holder_name: details?.insurance_policy_holder_name,
        insurance_company: details?.insurance_company,
        risk_cover_type: details?.risk_cover_type,
        policy_amount: details?.policy_amount,
        policy_start_date: details?.policy_start_date,
        policy_end_date: details?.policy_end_date,
        earthquake_zone: details?.earthquake_zone?.id,
        warehouse_unit_type: details?.warehouse_unit_type?.id,
        warehouse_risk_cover_limit: details?.warehouse_risk_cover_limit,
        commodity: tempcommodityArr,
        policy_by: details?.policy_by,
        client: details?.client?.id,
        warehouse_owner: details?.warehouse_owner?.id,
        bank: details?.bank?.id,
        warehouse_name: details?.warehouse_name,
        hypothecation_with_multiple_bank: tempmultibankArr,
        email_attactment: details?.email_attactment,
        insurance_policy: details?.insurance_policy,
        is_active: details?.is_active,
        remark: details?.remark,
      };

      // setHandleSelectBoxVal

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    const breadcrumbArray = [
      {
        title: "Manage Insurance",
        link: "/manage-insurance/insurance-policy-master",
      },
      {
        title: " Insurance Policy Master",
        link: "/manage-insurance/insurance-policy-master",
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

  return (
    <Box bg="white" key={formKey} borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 285px )" overflowY="auto">
            <Box>
              {/* This is code for the insurance policy number */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      {" "}
                      Policy No{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                    <CustomInput
                      name="policy_number"
                      placeholder="Policy No"
                      type="text"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This code for the Insurance Policy holder name */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Insurance Policy holder name{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                    <CustomInput
                      name="insurance_policy_holder_name"
                      placeholder="Insurance Policy Holder Name"
                      type="text"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This code for the insurance company */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Insurance Company Name{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                    <CustomInput
                      name="insurance_company"
                      placeholder="Insurance Company"
                      type="text"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the insurance policy  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Risk Cover Type{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="risk_cover_type"
                      label=""
                      isLoading={false}
                      options={selectBoxOptions?.insuranceType || []}
                      selectedValue={
                        selectBoxOptions?.insuranceType?.filter(
                          (item) => item.value === getValues("risk_cover_type")
                        )[0] || {}
                      }
                      isClearable={true}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("risk_cover_type", val?.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {addEditFormFieldsList &&
                addEditFormFieldsList.map((item, i) => (
                  <MotionSlideUp key={i} duration={0.2 * i} delay={0.1 * i}>
                    <Grid
                      gap={4}
                      templateColumns={"repeat(3, 1fr)"}
                      alignItems="center"
                    >
                      <Text textAlign="right">
                        {item.label}
                        {item.label === "Active" ? null : (
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                        )}
                      </Text>
                      {generateFormField({
                        ...item,
                        label: "",
                        showNumberToWord: {
                          isShow: true,
                          showOnly: ["policy_amount"],
                        },
                        // options: item.type === "select" && commodityTypeMaster,
                        selectedValue:
                          item.type === "select" &&
                          item?.options?.find(
                            (opt) =>
                              opt.label ===
                              details?.commodity_type?.commodity_type
                          ),
                        selectType: "label",
                        isChecked: details?.is_active,
                        isClearable: false,
                        style: { mb: 1, mt: 1 },
                      })}
                    </Grid>
                  </MotionSlideUp>
                ))}

              {/* This is code for the earth zone  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Earthquake zone{" "}
                      {/* <span style={{ color: "red", marginLeft: "4px" }}>*</span> */}
                    </Text>
                    <ReactCustomSelect
                      name="earthquake_zone"
                      label=""
                      isLoading={getEarthquakeZoneTypeMasterApiIsLoading}
                      options={selectBoxOptions?.earthZone || []}
                      selectedValue={
                        selectBoxOptions?.earthZone?.filter(
                          (item) => item.value === getValues("earthquake_zone")
                        )[0] || {}
                      }
                      isClearable={true}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("earthquake_zone", val?.value, {
                          shouldValidate: true,
                        });
                        let params = {
                          filter:
                            "area__earthquake_zone_type__earthquake_zone_type",
                          area__earthquake_zone_type__earthquake_zone_type:
                            val?.label,
                        };
                        getWarehouseMasterList(params);
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the Warehouse Unit type  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Warehouse Unit type{" "}
                      {/* <span style={{ color: "red", marginLeft: "4px" }}>*</span> */}
                    </Text>
                    <ReactCustomSelect
                      name="warehouse_unit_type"
                      label=""
                      isLoading={false}
                      options={selectBoxOptions?.warehouseUnitType || []}
                      selectedValue={
                        selectBoxOptions?.warehouseUnitType?.filter(
                          (item) =>
                            item.value === getValues("warehouse_unit_type")
                        )[0] || {}
                      }
                      isClearable={true}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        setValue("warehouse_unit_type", val?.value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the Warehouse risk cover limit (rs) */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Warehouse risk cover limit (rs)
                      {/* <span style={{ color: "red", marginLeft: "4px" }}>*</span> */}
                    </Text>
                    <CustomInput
                      name="warehouse_risk_cover_limit"
                      placeholder="Warehouse risk cover limit (rs)"
                      type="number"
                      label=""
                      inputValue={getValues("warehouse_risk_cover_limit") || ""}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setValue(
                          "warehouse_risk_cover_limit",
                          e.target.value === "" ? null : e.target.value,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      showNumberToWord={{
                        isShow: true,
                        showOnly: ["warehouse_risk_cover_limit"],
                      }}
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the commodity  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">Commodity </Text>
                    <ReactCustomSelect
                      name="commodity"
                      label=""
                      isMultipleSelect={true}
                      isLoading={getCommodityMasterApiIsLoading}
                      options={selectBoxOptions?.commodity || []}
                      selectedValue={
                        selectBoxOptions?.commodity?.filter((item) =>
                          getValues("commodity")?.some(
                            (old) => old === item?.value
                          )
                        ) || []
                      }
                      isClearable={true}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        const tempArr = val?.map((item) => {
                          return item.value;
                        });
                        setValue("commodity", tempArr, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the Policy by  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Policy by{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>
                    <ReactCustomSelect
                      name="policy_by"
                      label=""
                      isLoading={false}
                      options={selectBoxOptions?.policy || []}
                      selectedValue={
                        selectBoxOptions?.policy?.filter(
                          (item) => item.value === getValues("policy_by")
                        )[0] || {}
                      }
                      isClearable={true}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        if (val?.value === "bank") {
                          setValue("hypothecation_with_multiple_bank", null, {
                            shouldValidate: true,
                          });
                        }
                        setValue("policy_by", val?.value, {
                          shouldValidate: true,
                        });
                        setValue("client", null, {
                          shouldValidate: true,
                        });
                        setValue("warehouse_owner", null, {
                          shouldValidate: true,
                        });
                        setValue("bank", null, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {getValues("policy_by") === "client" ? (
                <>
                  {/* This is code for the Client Name */}
                  <Box>
                    <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                      <Grid
                        gap={4}
                        templateColumns={"repeat(3, 1fr)"}
                        alignItems="center"
                      >
                        <Text textAlign="right">
                          Client Name{" "}
                          {getValues("policy_by") === "client" ? (
                            <span style={{ color: "red", marginLeft: "4px" }}>
                              *
                            </span>
                          ) : (
                            <></>
                          )}
                        </Text>
                        <ReactCustomSelect
                          name="client"
                          label=""
                          selectDisable={
                            getValues("policy_by") === "client" ? false : true
                          }
                          isLoading={getClientMasterApiIsLoading}
                          options={selectBoxOptions?.client || []}
                          selectedValue={
                            selectBoxOptions?.client?.filter(
                              (item) => item.value === getValues("client")
                            )[0] || {}
                          }
                          isClearable={true}
                          selectType="label"
                          style={{
                            mb: 1,
                            mt: 1,
                          }}
                          handleOnChange={(val) => {
                            setValue("client", val?.value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </Grid>
                    </MotionSlideUp>
                  </Box>
                </>
              ) : (
                <></>
              )}

              {getValues("policy_by") === "owner" ? (
                <>
                  {/* This is code for the Warehouse owner name */}
                  <Box>
                    <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                      <Grid
                        gap={4}
                        templateColumns={"repeat(3, 1fr)"}
                        alignItems="center"
                      >
                        <Text textAlign="right">
                          Warehouse owner name{" "}
                          {getValues("policy_by") === "owner" ? (
                            <span style={{ color: "red", marginLeft: "4px" }}>
                              *
                            </span>
                          ) : (
                            <></>
                          )}
                        </Text>
                        <ReactCustomSelect
                          name="warehouse_owner"
                          label=""
                          isLoading={false}
                          selectDisable={
                            getValues("policy_by") === "owner" ? false : true
                          }
                          options={selectBoxOptions?.warehouseOwner || []}
                          selectedValue={
                            selectBoxOptions?.warehouseOwner?.filter(
                              (item) =>
                                item.value === getValues("warehouse_owner")
                            )[0] || {}
                          }
                          isClearable={true}
                          selectType="label"
                          style={{
                            mb: 1,
                            mt: 1,
                          }}
                          handleOnChange={(val) => {
                            setValue("warehouse_owner", val?.value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </Grid>
                    </MotionSlideUp>
                  </Box>
                </>
              ) : (
                <></>
              )}

              {getValues("policy_by") === "bank" ? (
                <>
                  {/* This is code for the Bank Name */}
                  <Box>
                    <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                      <Grid
                        gap={4}
                        templateColumns={"repeat(3, 1fr)"}
                        alignItems="center"
                      >
                        <Text textAlign="right">
                          Bank Name{" "}
                          {getValues("policy_by") === "bank" ? (
                            <span style={{ color: "red", marginLeft: "4px" }}>
                              *
                            </span>
                          ) : (
                            <></>
                          )}
                        </Text>
                        <ReactCustomSelect
                          name="bank"
                          label=""
                          selectDisable={
                            getValues("policy_by") === "bank" ? false : true
                          }
                          isLoading={getBankMasterApiIsLoading}
                          options={selectBoxOptions?.bank || []}
                          selectedValue={
                            selectBoxOptions?.bank?.filter(
                              (item) => item.value === getValues("bank")
                            )[0] || {}
                          }
                          isClearable={true}
                          selectType="label"
                          style={{
                            mb: 1,
                            mt: 1,
                          }}
                          handleOnChange={(val) => {
                            setValue("bank", val?.value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </Grid>
                    </MotionSlideUp>
                  </Box>
                </>
              ) : (
                <></>
              )}

              {/* This is code for the warehouse name  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      warehouse name{" "}
                      {getValues("earthquake_zone") ? <></> : <></>}{" "}
                    </Text>
                    <ReactCustomSelect
                      name="warehouse_name"
                      label=""
                      isMultipleSelect={true}
                      isLoading={getCommodityMasterApiIsLoading}
                      options={selectBoxOptions?.warehouse || []}
                      selectedValue={
                        selectBoxOptions?.warehouse?.filter((item) =>
                          getValues("warehouse_name")?.some(
                            (old) => old === item.value
                          )
                        ) || []
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        const tempArr = val.map((item) => {
                          return item.value;
                        });
                        setValue("warehouse_name", tempArr, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This is code for the Hypothecation with multiple bank  */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      Hypothecation with multiple bank
                    </Text>
                    <ReactCustomSelect
                      name="hypothecation_with_multiple_bank"
                      label=""
                      selectDisable={
                        getValues("policy_by") !== "bank" ? false : true
                      }
                      isMultipleSelect={true}
                      isLoading={getBankMasterApiIsLoading}
                      options={selectBoxOptions?.bank || []}
                      selectedValue={
                        selectBoxOptions?.bank?.filter((item) =>
                          getValues("hypothecation_with_multiple_bank")?.some(
                            (old) => old === item.value
                          )
                        ) || []
                      }
                      isClearable={false}
                      selectType="label"
                      style={{
                        mb: 1,
                        mt: 1,
                      }}
                      handleOnChange={(val) => {
                        const tempArr = val.map((item) => {
                          return item.value;
                        });
                        setValue("hypothecation_with_multiple_bank", tempArr, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This code for the upload document */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                    my="2"
                  >
                    <Text textAlign="right">
                      Policy Upload{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>

                    <FileUploadCmp
                      label=""
                      name="insurance_policy"
                      isError={errors?.insurance_policy}
                      type="application/pdf, image/jpeg, image/png, image/jpg"
                      placeholder="Choose a file"
                      allowedTypes={[
                        "application/pdf",
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ]}
                      fileName={getValues("insurance_policy")}
                      clearFileName={getValues("insurance_policy") === ""}
                      value={getValues("insurance_policy")}
                      showDownloadIcon={true}
                      isMultipalUpload={false}
                      maxFileSize={1024 * 1024} // For example, 1MB (1024 bytes * 1024 bytes)
                      onChange={(url) =>
                        handleFileChange(url, "insurance_policy")
                      }
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This code for the upload document */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">
                      E-mail attachment{" "}
                      <span style={{ color: "red", marginLeft: "4px" }}>*</span>
                    </Text>

                    <FileUploadCmp
                      label=""
                      name="email_attactment"
                      isError={errors?.email_attactment}
                      type="application/pdf, image/jpeg, image/png, image/jpg"
                      placeholder="Choose a file"
                      allowedTypes={[
                        "application/pdf",
                        "image/jpeg",
                        "image/png",
                        "image/jpg",
                      ]}
                      fileName={getValues("email_attactment")}
                      clearFileName={getValues("email_attactment") === ""}
                      value={getValues("email_attactment")}
                      showDownloadIcon={true}
                      isMultipalUpload={false}
                      maxFileSize={1024 * 1024} // For example, 1MB (1024 bytes * 1024 bytes)
                      onChange={(url) =>
                        handleFileChange(url, "email_attactment")
                      }
                    />
                  </Grid>
                </MotionSlideUp>
              </Box>

              {/* This code for the remark */}
              <Box>
                <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                  <Grid
                    gap={4}
                    templateColumns={"repeat(3, 1fr)"}
                    alignItems="center"
                  >
                    <Text textAlign="right">Remark</Text>
                    <CustomInput
                      name="remark"
                      placeholder="Remark"
                      type="text"
                      label=""
                      style={{
                        mb: 1,
                        mt: 1,
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
                >
                  <Text textAlign="right">Active</Text>
                  <CustomSwitch
                    name="is_active"
                    label=""
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                    isChecked={initialIsActive}
                  />
                </Grid>
              </MotionSlideUp>
            </Box>

            <Box
              display="flex"
              gap={2}
              justifyContent="flex-end"
              mt="10"
              px="0"
            >
              <Button
                type="button"
                backgroundColor={"white"}
                borderWidth={"1px"}
                borderColor={"#F82F2F"}
                _hover={{ backgroundColor: "" }}
                color={"#F82F2F"}
                borderRadius={"full"}
                my={"4"}
                px={"10"}
                onClick={() => clearForm()}
              >
                Clear
              </Button>
              <Button
                type="submit"
                //w="full"
                backgroundColor={"primary.700"}
                _hover={{ backgroundColor: "primary.700" }}
                color={"white"}
                borderRadius={"full"}
                isLoading={
                  addInsurancePolicyMasterApiIsLoading ||
                  updateInsurancePolicyMasterApiIsLoading
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
};

export default AddEditInsurancePolicy;

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
