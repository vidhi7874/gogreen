import React, { useEffect, useState } from "react";
import { Box, Button, Text, Grid } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useAddBankCMLocationMasterMutation,
  useGetBankBranchMasterFreeMutation,
  useGetBankMasterFreeMutation,
  useUpdateBankCMLocationMasterMutation,
} from "../../features/master-api-slice";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MotionSlideUp } from "../../utils/animation";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { addEditFormFields, schema } from "./fields";
import generateFormField from "../../components/Elements/GenerateFormField";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../features/manage-breadcrumb.slice";
import CustomSelector from "../../components/Elements/CustomSelector";

const AddEditBankCmLocationMaster = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      is_active: true, // Set is_active to true by default
    },
  });

  const {
    formState: { errors },
    setValue,
    getValues,
  } = methods;

  const [selectBoxOptions, setSelectBoxOptions] = useState({
    banks: [],
  });
  const details = location.state?.details;

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
      // Check if the field key is not 'is_active' before clearing it
      if (key !== "is_active") {
        setValue(key, "", {
          shouldValidate: true,
        });
      }
    });
  };
  // Form Clear Function End

  const [addEditFormFieldsList, setAddEditFormFieldsList] = useState([]);

  const [isClear, setIsClear] = useState(false);

  // Add bank Cm Api Start
  const [
    addBankCMLocationMaster,
    { isLoading: addBankCMLocationMasterrApiIsLoading },
  ] = useAddBankCMLocationMasterMutation();

  const addData = async (data) => {
    try {
      const response = await addBankCMLocationMaster(data).unwrap();
      console.log("add EarthQuack master res", response);
      if (response.status === 201) {
        toasterAlert(response);
        navigate("/bank-master/bank-cm-location-master");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        "Bank Cm Location Adding is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };
  // Add bank Cm Api End

  // For bank master api list calling
  const [getBankMaster] = useGetBankMasterFreeMutation();

  const getBankMasterList = async () => {
    try {
      const response = await getBankMaster().unwrap();
      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((item) => ({
        label: item.bank_name,
        value: item.id,
      }));

      console.log(arr);

      setSelectBoxOptions((prev) => ({
        ...prev,
        banks: arr,
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  //Bank master api end

  // For bank branch master api list calling
  const [getBankBranchMaster] = useGetBankBranchMasterFreeMutation();
  const getBankCMLocation = async () => {
    try {
      // let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getBankBranchMaster().unwrap();

      console.log("Success:", response);
      let onlyActive = response?.results?.filter((item) => item.is_active);
      let arr = onlyActive?.map((type) => ({
        label: type.branch_name,
        value: type.id,
      }));
      console.log(arr);
      setAddEditFormFieldsList(
        addEditFormFields.map((field) => {
          if (field.type === "select") {
            return {
              ...field,
              options: arr,
            };
          } else {
            return field;
          }
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // For bank branch master api end

  const [
    updateBankCMLocationMaster,
    { isLoading: updateBankCMLocationMasterApiIsLoading },
  ] = useUpdateBankCMLocationMasterMutation();
  const updateData = async (data) => {
    try {
      console.log("data ---> ", data);
      const response = await updateBankCMLocationMaster(data).unwrap();
      if (response.status === 200) {
        console.log("update earthQuack master res", response);
        toasterAlert(response);
        navigate("/bank-master/bank-cm-location-master");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        "Bank Cm Location Adding is Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  // Update bank cm Api End

  // Edit Form Fill Logic Start
  useEffect(() => {
    getBankMasterList();

    if (details?.id) {
      let obj = {
        bank_branch: details?.bank_branch?.branch_name,
        bank: details?.bank,
        bank_cm_location_name: details.bank_cm_location_name,
        cm_charges: details.cm_charges,
        fix_charges: details.fix_charges,
        minimum_commitment: details.minimum_commitment,
        is_active: details.is_active,
      };

      // setHandleSelectBoxVal

      console.log(obj);

      Object.keys(obj).forEach(function (key) {
        methods.setValue(key, obj[key], { shouldValidate: true });
      });
    }

    getBankCMLocation();
    const breadcrumbArray = [
      {
        title: "Manage Banks",
        link: "/bank-master/bank-cm-location-master",
      },
      {
        title: "Bank CM Location Master",
        link: "/bank-master/bank-cm-location-master",
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
    <Box bg="white" borderRadius={10} p="10">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box maxHeight="calc( 100vh - 285px )" overflowY="auto">
            <Box>
              <MotionSlideUp duration={0.2 * 1} delay={0.1 * 1}>
                <Grid
                  gap={4}
                  templateColumns={"repeat(3, 1fr)"}
                  alignItems="center"
                >
                  <Text textAlign="right">
                    {" "}
                    Bank<span style={{ color: "red" }}>*</span>
                  </Text>
                  <CustomSelector
                    name="bank"
                    label=""
                    options={selectBoxOptions.banks}
                    selectedValue={
                      selectBoxOptions?.banks?.filter(
                        (opt) => opt.value === getValues("bank")
                      )[0] || {}
                    }
                    // selectedValue={selectBoxOptions.banks?.find(
                    //   (opt) => opt.label === details?.bank
                    // )}
                    isClearable={false}
                    selectType={"value"}
                    style={{
                      mb: 1,
                      mt: 1,
                    }}
                  />
                </Grid>
              </MotionSlideUp>

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
                        isChecked: methods.watch("is_active"),
                        style: {
                          mb: 1,
                          mt: 1,
                        },
                        // options: item.type === "select" && commodityTypeMaster,

                        selectedValue:
                          item.type === "select" &&
                          item?.options?.find((opt) => {
                            console.log("opt", opt);
                            console.log("details", details);
                            return opt.value === details?.bank_branch?.id;
                          }),
                        selectType: "value",
                        isClearable: false,
                      })}
                    </Grid>
                  </MotionSlideUp>
                ))}
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
                onClick={clearForm}
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
                  addBankCMLocationMasterrApiIsLoading ||
                  updateBankCMLocationMasterApiIsLoading
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

export default AddEditBankCmLocationMaster;

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
