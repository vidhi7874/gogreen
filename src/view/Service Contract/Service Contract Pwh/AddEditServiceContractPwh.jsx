import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import * as yup from "yup";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useFetchLocationDrillDownFreeMutation } from "../../../features/warehouse-proposal.slice";
import ReactCustomSelect from "../../../components/Elements/CommonFielsElement/ReactCustomSelect";
import { FormProvider, get, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  chamberDetailsSchema,
  reservationDetailsSchema,
  contractCommodity_Bag_size_Schema,
  schema,
} from "./fields";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadCmp from "../../../components/Elements/FileUploadCmp";
import {
  useAssignServiceContractMutation,
  useFetchBagWiseDetailsMutation,
  useGetAllClientsMutation,
  usePostServiceContractMutation,
  useUpdateServiceContractMutation,
} from "../../../features/service-contract-api.slice";
import {
  useGetChamberFreeMutation,
  useGetWareHouseFreeMutation,
  useGetCommodityFreeMasterMutation,
  useGetBankMasterFreeMutation,
  useGetCommodityBagFreeMasterMutation,
} from "../../../features/master-api-slice";
import moment from "moment";
import { showToastByStatusCode } from "../../../services/showToastByStatusCode";
import { scrollToElement } from "../../../services/common.service";
import { useDispatch } from "react-redux";
import { setBreadCrumb } from "../../../features/manage-breadcrumb.slice";

const tableHeaders = [
  "Reservation Type",
  "Reservation MT",
  "Reservation Size",
  "Reserved no of bags",
  "Start date",
  "End date",
  "pbpm rate",
  "Reservation Rate",
  "Billing cycle",
  "Action",
];

const Fumigation_by_go_green = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const insurance_by = [
  { value: "Go Green", label: "Go Green" },
  { value: "Client", label: "Client" },
  { value: "WH Owner", label: "WH Owner" },
  { value: "Bank", label: "Bank" },
];
const QC_charges_by_go_green = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];
const Excess_Billing_Cycle = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Fortnightly", label: "Fortnightly" },
  { value: "Monthly", label: "Monthly" },
];
const Storage_rate_on = [
  { value: "On No of bags", label: "On No of bags" },
  { value: "On MT", label: "On MT" },
];
const RESERVATION = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const Post_Reservation_Billing_Cycle = [
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
  { value: "Fortnightly", label: "Fortnightly" },
  { value: "Monthly", label: "Monthly" },
];

function isBagSizeAlreadyExists(obj, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.bag_size?.value === obj?.bag_size?.value) {
      return true; // bag_size already exists
    }
  }
  return false; // bag_size does not exist
}

function isChamberNumberAlreadyExists(obj, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.chamber?.value === obj?.chamber?.value) {
      return true; // chamber already exists
    }
  }
  return false; // chamber does not exist
}

const AddEditServiceContractPwh = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pageView = location?.state?.view;
  //console.log("location: ", location);
  const details = location.state?.details;
  const [
    addServiceContractData,
    { isLoading: addServiceContractDataApiIsLoading },
  ] = usePostServiceContractMutation();

  const [
    updateServiceContractData,
    { isLoading: updateServiceContractDataApiIsLoading },
  ] = useUpdateServiceContractMutation();

  const [
    getCommodityBagFreeMaster,
    { isLoading: getCommodityBagFreeMasterApiIsLoading },
  ] = useGetCommodityBagFreeMasterMutation();

  const [fetchBagWiseDetails, { isLoading: fetchBagWiseDetailsApiIsLoading }] =
    useFetchBagWiseDetailsMutation();

  const methods = useForm({
    resolver: yupResolver(schema),
    // resolver: yupResolver(reservationDetailsSchema),
    mode: "onBlur", // Set the mode to onBlur
  });

  const {
    setValue,
    getValues,
    setError,
    clearErrors,
    unregister,
    register,
    reset,
    watch,
    formState: { errors },
  } = methods;
  // end date should not less then start date
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [lastEndDate, setLastEndDate] = useState(null);
  const [groupedReservationDetails, setGroupReservationDetails] = useState({});

  const [clientOptions, setClientOptions] = useState([]);
  const [banksList, setBankList] = useState([]);
  const [reservationDates, setReservationDates] = useState({
    startDate: "",
    endDate: new Date(),
  });

  const [isBagWiseDetailsEditState, setIsBagWiseDetailsEditState] = useState({
    isEdit: false,
    index: null,
  });
  const [bagWiseDetailsArray, setBagWiseDetailsArray] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [chamberOptions, setChamberOptions] = useState([]);
  const [commodityOptions, setCommodityOptions] = useState([]);
  const [fumigationOptions, setFumigationOptions] = useState(
    Fumigation_by_go_green
  );
  const [isDisabledReservationType, setIsDisabledReservationType] =
    useState(false);
  const [insuranceByOptions, setInsuranceByOptions] = useState(insurance_by);
  const [qcChargesOptions, setQcChargesOptions] = useState(
    QC_charges_by_go_green
  );
  const [reservationBillingCycleOptions, setReservationBillingCycleOptions] =
    useState(Post_Reservation_Billing_Cycle);

  // Billing details
  const [excessBillingCycleOptions, setExcessBillingCycleOptions] =
    useState(Excess_Billing_Cycle);
  const [storageOnRateOptions, setStorageOnRateOptions] =
    useState(Storage_rate_on);
  const [reservationOptions, setReservationOptions] = useState(RESERVATION);

  // No reservation

  const [contractCommodity, setContractCommodity] = useState([]);
  const [reservationBillingCycle, setReservationBillingCycle] = useState({
    Reservation: {},
    "Post Reservation": {},
  });

  const [bagWiseRateDetails, setBagWiseRateDetails] = useState([]);

  const [warehousechamber, setWarehousechamber] = useState([]);
  const [reservationDetails, setReservationDetails] = useState([]);

  const [isChamberDetailsEditState, setIsChamberDetailsEditState] = useState({
    isEdit: false,
    index: null,
  });

  const [isReservationDetailsEditState, setIsReservationDetailsEditState] =
    useState({
      isEdit: false,
      index: null,
    });

  const [selectedDropDownValue, setSelectedDropDownValue] = useState({
    selectedClient: {},
    selectedWarehouseName: {},
    selectedChamber: {},
    selectedFumigation: {},
    selectedInsurance: {},
    selectedQcCharges: {},
    selectedExcessBillingCycle: {},
    selectedStorageRate: {},
    selectedReservation: {},
    selectedReservationBillingCycle: {},
    selected_reservation_type: {},
    selected_reservation_bag_size: {},
  });

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

  // console.log("details-->", details);
  // Start the region state are substate district options
  const [selectBoxOptions, setSelectBoxOptions] = useState({
    regions: [],
    substate: [],
    districts: [],
    states: [],

    areas: [],
  });

  const [bagSizeList, setBagSizeList] = useState([]);

  const dropDownOnChange = (val, key, name) => {
    console.log(val);
    console.log(key);
    console.log(name);

    if (name === "insurance_by" && val.value === "Bank") {
      fetchAllBanks();
    }

    if (val?.value === "On No of bags" && name === "storage_rate_on") {
      fetchAllBagSizeLists();
    }

    setSelectedDropDownValue((prev) => ({
      ...prev,
      [key]: val,
    }));
    setValue(name, val, {
      shouldValidate: true,
    });
  };

  const handleEndDateChange = (e) => {
    const startDateValue = new Date(
      // Assuming you have a similar input for start date, update this line
      document.querySelector('input[name="service_contract_start_date"]').value
    );
    const endDateValue = new Date(e.target.value);

    if (startDateValue && endDateValue < startDateValue) {
      setError("service_contract_end_date", {
        type: "custom",
        message: "End Date should not be less than Start Date",
      });
    } else {
      clearErrors("service_contract_end_date");
    }
  };

  // location drill down api hook
  const [
    fetchLocationDrillDown,
    { isLoading: fetchLocationDrillDownApiIsLoading },
  ] = useFetchLocationDrillDownFreeMutation();

  const [getAllClients, { isLoading: getAllClientsApiIsLoading }] =
    useGetAllClientsMutation();

  // Warehouse Master start

  const [getWarehouseMaster, { isLoading: getWarehouseMasterApiIsLoading }] =
    useGetWareHouseFreeMutation();

  const [getBankMasterFree, { isLoading: banksApiIsLoading }] =
    useGetBankMasterFreeMutation();

  const [getAllCommodity, { isLoading: getAllCommodityApiIsLoading }] =
    useGetCommodityFreeMasterMutation();

  const getWarehouseMasterList = async (queryParams) => {
    try {
      const response = await getWarehouseMaster(queryParams).unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setWarehouseOptions(
          response?.data?.map(({ warehouse_name, id, total_rent_payable }) => ({
            label: warehouse_name,
            value: id,
            rent: total_rent_payable,
          }))
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllCommodity = async () => {
    try {
      const response = await getAllCommodity().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        console.log(response);
        setCommodityOptions(
          response?.data?.map(({ commodity_name, id }) => ({
            label: commodity_name,
            value: id,
          }))
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Warehouse Master end

  // Chamber Master start

  const [getChamberMaster, { isLoading: getChamberApiIsLoading }] =
    useGetChamberFreeMutation();

  const getChamberMasterList = async (query) => {
    try {
      const response = await getChamberMaster(query).unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setChamberOptions(
          response?.data?.map(({ chamber_number, id, warehouse }) => ({
            label: chamber_number,
            value: id,
            warehouse: warehouse?.id,
          }))
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllBanks = async () => {
    try {
      const response = await getBankMasterFree().unwrap();
      console.log("getRegionMasterList:", response);
      let arr = response?.results?.map(({ bank_name, id }) => ({
        label: bank_name,
        value: id,
      }));
      setBankList(arr);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

  const fetchAllClients = async () => {
    try {
      const response = await getAllClients().unwrap();

      let arr = response.data.map((el) => ({
        label: el.name_of_client,
        value: el.id,
      }));
      setClientOptions(arr);
      console.log("getRegionMasterList:", response.data);
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
  // Region State  Zone District Area  onChange drill down api end //

  // CHAMBERS ALL METHODS START HERE //

  const fetchAllBagSizeLists = async () => {
    try {
      const response = await getCommodityBagFreeMaster().unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        console.log(response);
        let arr = response?.data.map((el) => ({
          label: el.bag_size,
          value: el.id,
        }));
        setBagSizeList(arr);
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const checkPbpm = async () => {
    console.log(warehousechamber);
    let id = 43;
    // let id = warehousechamber?.[0]?.warehouse?.value;
    console.log(id);

    try {
      const response = await fetchBagWiseDetails(id).unwrap();
      console.log(response);
      if (response?.status === 200) {
        setValue("pbpm_rate", 23, { shouldValidate: true });
      } else {
        setValue("pbpm_rate", "", { shouldValidate: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addUpdateChamber = () => {
    const data = getValues();

    console.log("all values :", data);

    const details = {
      warehouse: data?.warehouse,
      chamber: data?.chamber,
    };

    console.log("details.", details);
    const copy_mainArr = [...warehousechamber];

    const { index, isEdit } = isChamberDetailsEditState;

    try {
      toValidateChamberDetailsSchema(details);
      console.log("Data is valid.", details);
      console.log(warehousechamber);
      setWarehouseOptions([data?.warehouse]);

      const chamberExistsInMainArr = isChamberNumberAlreadyExists(
        details,
        warehousechamber
      );
      const chamberExistsInCopyArr = isChamberNumberAlreadyExists(
        details,
        copy_mainArr
      );

      if (isEdit && index >= 0 && index < warehousechamber.length) {
        // In edit mode and the edited index exists
        if (chamberExistsInMainArr) {
          if (
            warehousechamber[index]?.chamber?.value === details?.chamber?.value
          ) {
            // The doc_type remains the same, update the existing entry in the main kyc array
            const updatedArr = [...warehousechamber];
            updatedArr[index] = details;

            setWarehousechamber(updatedArr);
          } else {
            // The doc_type has changed, check if it exists in the copy array
            if (chamberExistsInCopyArr) {
              showToastByStatusCode(400, "Chamber already exists");
            } else {
              // Update the existing entry in the main kyc array with the new doc_type
              const updatedArr = [...warehousechamber];
              updatedArr[index] = details;
              //setIsKycFormDirty(false);
              setWarehousechamber(updatedArr);
            }
          }
        } else {
          showToastByStatusCode(400, "Chamber type not found.");
        }
      } else {
        // Not in edit mode or index is out of bounds
        if (chamberExistsInCopyArr) {
          showToastByStatusCode(400, "Chamber already exists");
        } else {
          setWarehousechamber([...warehousechamber, details]);
        }
      }

      clearChamberDetailsForm(details);

      setIsChamberDetailsEditState({
        isEdit: false,
        index: null,
      });

      // ---------------------------------------------------------

      // if (isEdit) {
      //   const updatedArr = [...warehousechamber];
      //   updatedArr[index] = details;

      //   setWarehousechamber(updatedArr);
      // } else {
      //   setWarehousechamber((prev) => [...prev, details]);
      // }
      // clearChamberDetailsForm(details);

      // setIsChamberDetailsEditState({
      //   isEdit: false,
      //   index: null,
      // });
    } catch (validationErrors) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: validationErrors[key] || "",
        });
      });
      return false;
    }
  };

  const chamberDetailsOnEdit = (item, i) => {
    setIsChamberDetailsEditState({
      isEdit: true,
      index: i,
    });
    Object.keys(item).forEach((key) => {
      setValue(key, item[key], {
        shouldValidate: false,
      });
      setSelectedDropDownValue((prev) => ({
        ...prev,
        selectedWarehouseName: item.warehouse,
        selectedChamber: item.chamber,
      }));
    });
  };

  const deleteChamberDetails = (index) => {
    let indexToRemove = index;
    console.log("warehousechamber length -->", warehousechamber.length);
    if (indexToRemove >= 0 && indexToRemove < warehousechamber.length) {
      let x = warehousechamber.splice(indexToRemove, 1);
      setWarehousechamber([...warehousechamber]);
      clearChamberDetailsForm();
    }

    if (index === 0) {
      let selected_area_obj =
        selectBoxOptions?.areas?.filter(
          (item) => item.value === getValues("area")
        )[0] || {};
      let query = {
        filter: "warehouse_type",
        warehouse_type: "PWH",
        filter: "area",
        area: selected_area_obj?.label,
      };

      console.log("deleteChamberDetails query --", query);

      getWarehouseMasterList(query);
    }
  };

  const clearChamberDetailsForm = () => {
    const obj = {
      warehouse: "",
      chamber: "",
    };
    Object.keys(obj).forEach((key) => {
      setValue(key, "", {
        shouldValidate: false,
      });
      //clearErrors(key);
    });
    setSelectedDropDownValue((prev) => ({
      ...prev,
      selectedWarehouseName: {},
      selectedChamber: {},
      selectedCommodity: {},
    }));
  };

  // CHAMBERS ALL METHODS END HERE //

  // Bag wise rate details all methods start here

  const addUpdateBagWiseRate = () => {
    console.log(getValues());
    const formData = getValues();
    console.log("errors ", errors);
    const obj = {
      bag_size: formData?.bag_size,
      pbpm_rate: formData?.pbpm_rate || "",
      rate: formData?.rate || "",
    };

    console.log(obj);
    // {
    //   bag_size: { label: 80, value: 158 },
    //   pbpm_rate: 23,
    //   rate: '11'
    // }
    try {
      validateBagWiseRateDetailsFormData(obj);
      // console.log("isValid ", isValid);
    } catch (error) {
      console.log(error);
      Object.keys(error).forEach((key) => {
        setError(key, {
          type: "manual",
          message:
            key === "pbpm_rate"
              ? "Click on 'Check PBPM button' to auto filled PBPM rate"
              : error[key] || "",
        });
      });
      return false;
    }

    //Service Contract(PWH) on submit
    console.log(obj);
    //setBagWiseDetailsArray((prev) => [...prev, obj]);

    // Handle form submission here if all required fields are filled

    const copy_mainArr = [...bagWiseDetailsArray];

    const isEditing = isBagWiseDetailsEditState?.isEdit;
    const editedIndex = isBagWiseDetailsEditState?.index;

    // Perform your submission logic here

    console.log(obj);

    const stateExistsInMainArr = isBagSizeAlreadyExists(
      obj,
      bagWiseDetailsArray
    );
    const stateExistsInCopyArr = isBagSizeAlreadyExists(obj, copy_mainArr);

    if (
      isEditing &&
      editedIndex >= 0 &&
      editedIndex < bagWiseDetailsArray.length
    ) {
      // In edit mode and the edited index exists
      if (stateExistsInMainArr) {
        if (
          bagWiseDetailsArray[editedIndex]?.bag_size?.label ===
          obj?.bag_size?.label
        ) {
          // The doc_type remains the same, update the existing entry in the main kyc array
          const updatedArr = [...bagWiseDetailsArray];
          updatedArr[editedIndex] = obj;

          setBagWiseDetailsArray(updatedArr);
        } else {
          // The doc_type has changed, check if it exists in the copy array
          if (stateExistsInCopyArr) {
            showToastByStatusCode(400, "Bag size already exists");
          } else {
            // Update the existing entry in the main kyc array with the new doc_type
            const updatedArr = [...bagWiseDetailsArray];
            updatedArr[editedIndex] = obj;
            //setIsKycFormDirty(false);
            setBagWiseDetailsArray(updatedArr);
          }
        }
      } else {
        showToastByStatusCode(400, "Bag size not found.");
      }
    } else {
      // Not in edit mode or index is out of bounds
      if (stateExistsInCopyArr) {
        showToastByStatusCode(400, "Bag size already exists");
      } else {
        setBagWiseDetailsArray([...bagWiseDetailsArray, obj]);
      }
    }

    setIsBagWiseDetailsEditState({
      isEdit: false,
      index: null,
    });

    clearBagWiseRateDetailsForm();
  };

  const bagWiseRateDetailsOnEdit = (item, i) => {
    setIsBagWiseDetailsEditState({
      isEdit: true,
      index: i,
    });

    Object.keys(item).forEach((key) => {
      setValue(key, item[key], {
        shouldValidate: false,
      });
    });
  };

  const deleteBagWiseRateDetails = (index) => {
    let indexToRemove = index;

    if (indexToRemove >= 0 && indexToRemove < bagWiseDetailsArray.length) {
      bagWiseDetailsArray.splice(indexToRemove, 1);
      setBagWiseDetailsArray([...bagWiseDetailsArray]);
      clearBagWiseRateDetailsForm();
    }
  };

  const clearBagWiseRateDetailsForm = () => {
    const obj = {
      bag_size: "",
      pbpm_rate: "",
      rate: "",
    };

    Object.keys(obj).forEach((key) => {
      setValue(key, "", {
        shouldValidate: false,
      });
    });

    setIsBagWiseDetailsEditState({
      isEdit: false,
      index: null,
    });
  };

  // Bag wise rate details all methods end here

  // RESERVATION ALL METHODS START HERE //

  // const updateGroupedReservationDetails = (details) => {
  //   const type = details.reservation_type.value;
  //   const { index, isEdit } = isReservationDetailsEditState;

  // //  add and update time alway check start is alway +1 end date in every next record in every grouped

  //   setGroupReservationDetails((prevData) => {
  //     const updatedData = { ...prevData };

  //     if (!updatedData[type]) {
  //       updatedData[type] = [details];
  //     } else {
  //       if (isEdit && index !== null && updatedData[type][index]) {
  //         // Editing an existing item
  //         updatedData[type][index] = details;
  //       } else {
  //         // Adding a new item
  //         updatedData[type].push(details);
  //       }
  //     }

  //     console.log(updatedData);

  //     return updatedData;
  //   });
  // };

  const updateGroupedReservationDetails_tt = (details) => {
    const type = details.reservation_type.value;
    const { index, isEdit } = isReservationDetailsEditState;

    setGroupReservationDetails((prevData) => {
      const updatedData = { ...prevData };

      if (!updatedData[type]) {
        updatedData[type] = [details];
      } else {
        const existingItems = updatedData[type];
        const lastItem = existingItems[existingItems.length - 1];

        if (
          isEdit &&
          index !== null &&
          lastItem &&
          index === existingItems.length - 1
        ) {
          // Editing the last item
          const endDate = new Date(lastItem.reservation_end_date);
          const startDate = new Date(details.reservation_start_date);
          const oneDayAfterEndDate = new Date(endDate);
          oneDayAfterEndDate.setDate(oneDayAfterEndDate.getDate() + 1);

          if (startDate > oneDayAfterEndDate) {
            // Update the item if the start date is valid
            updatedData[type][index] = details;
          } else {
            // Display an error alert if the start date is not one day ahead
            let msg =
              "Start date should be one day ahead of the end date of the previously added record.";
            showToastByStatusCode(400, msg);
            //return false;
          }
        } else {
          // Adding a new item
          if (lastItem) {
            const endDate = new Date(lastItem.reservation_end_date);
            const startDate = new Date(details.reservation_start_date);
            const oneDayAfterEndDate = new Date(endDate);
            oneDayAfterEndDate.setDate(oneDayAfterEndDate.getDate() + 1);

            if (startDate > oneDayAfterEndDate) {
              // Ensure that the start date is one day ahead of the end date
              updatedData[type].push(details);
            } else {
              // Display an error alert if the start date is not one day ahead
              let msg =
                "Start date should be one day ahead of the end date of the previously added record.";
              showToastByStatusCode(400, msg);
              // return false;
            }
          } else {
            // No existing items, so we add the new item
            updatedData[type].push(details);
          }
        }
      }

      return updatedData;
    });
  };

  useEffect(() => {
    console.log("groupedReservationDetails", groupedReservationDetails);
  }, [groupedReservationDetails]);

  const updateGroupedReservationDetails = (details) => {
    console.log("details: ", details);
    const type = details.reservation_type.value;
    const { index, isEdit } = isReservationDetailsEditState;
    let end_date = moment(details.reservation_end_date)
      .add(1, "days")
      .format("YYYY-MM-DD");
    console.log(end_date);

    setGroupReservationDetails((prevData) => {
      // const updatedData = { ...prevData };
      const updatedData = { ...prevData };
      // setIsDisabledReservationType(true)
      if (!updatedData[type]) {
        alert(1);
        updatedData[type] = [details];
        setReservationDates({
          // endDate: moment(details.reservation_end_date).add(1, "days").toDate(),
          endDate: end_date,
        });
        clearReservationDetailsForm();
        // return updatedData;
      } else {
        const existingItems = updatedData[type];
        const lastItem = existingItems[existingItems.length - 1];

        if (
          isEdit &&
          index !== null &&
          lastItem &&
          index === existingItems.length - 1
        ) {
          // Editing the last item
          if (existingItems.length === 1) {
            alert(2);
            // Skip date check when there's only one item
            updatedData[type][index] = details;
            setReservationDates({
              endDate: end_date,
            });
            clearReservationDetailsForm();
            // return updatedData;
          } else {
            alert(3);
            updatedData[type][index] = details;
            setReservationDates({
              endDate: end_date,
            });
            clearReservationDetailsForm();

            // const endDate = new Date(lastItem.reservation_end_date);
            // const startDate = new Date(details.reservation_start_date);
            // const oneDayAfterEndDate = new Date(endDate);
            // oneDayAfterEndDate.setDate(oneDayAfterEndDate.getDate() + 1);

            // let end_date = moment(details.reservation_end_date)
            // .add(1, "days")
            // .format("YYYY-MM-DD");

            // if (startDate.getTime() === oneDayAfterEndDate.getTime()) {
            //   // Update the item if the start date is exactly one day after the end date
            //   updatedData[type][index] = details;
            //   setReservationDates({
            //     endDate: end_date,
            //   });
            //   clearReservationDetailsForm();
            //   //return updatedData;
            // } else {
            //   // Display an error alert if the start date is not exactly one day ahead
            //   let msg =
            //     "11 Start date should be exactly one day ahead of the end date of the previously added record.";
            //   showToastByStatusCode(400, msg);
            //   // return false;
            // }
          }
        } else {
          // Adding a new item
          console.log(lastItem);
          if (lastItem) {
            alert(4);
            updatedData[type].push(details);
            clearReservationDetailsForm();
            setReservationDates({
              endDate: end_date,
            });

            // const endDate = new Date(lastItem.reservation_end_date);
            // const startDate = new Date(details.reservation_start_date);
            // const oneDayAfterEndDate = new Date(endDate);
            // oneDayAfterEndDate.setDate(oneDayAfterEndDate.getDate() + 1);

            // console.log(startDate);
            // console.log(endDate);

            // console.log(endDate.getTime());
            // console.log(oneDayAfterEndDate.getTime());

            // if (startDate.getTime() === oneDayAfterEndDate.getTime()) {
            //   // Ensure that the start date is exactly one day ahead of the end date
            //   updatedData[type].push(details);
            //   clearReservationDetailsForm();
            //   setReservationDates({
            //     endDate: end_date,
            //   });

            //   // return updatedData;
            // }
            // else {
            //   // Display an error alert if the start date is not exactly one day ahead
            //   let msg =
            //     "22 Start date should be exactly one day ahead of the end date of the previously added record.";
            //   showToastByStatusCode(400, msg);
            //   //return false;
            // }
          } else {
            alert(5);
            // No existing items, so we add the new item
            updatedData[type].push(details);
            clearReservationDetailsForm();
            setReservationDates({
              endDate: end_date,
            });
            // return updatedData;
          }
        }
      }

      return updatedData;
    });
  };

  const updateGroupedReservationDetails_old_working = (details) => {
    const type = details.reservation_type.value;
    const { index, isEdit } = isReservationDetailsEditState;

    console.log(details);

    setGroupReservationDetails((prevData) => {
      const updatedData = { ...prevData };

      if (!updatedData[type]) {
        updatedData[type] = [details];
      } else {
        if (isEdit && index !== null && updatedData[type][index]) {
          // Editing an existing item
          updatedData[type][index] = details;
        } else {
          // Adding a new item
          const existingItems = updatedData[type];
          const lastItem = existingItems[existingItems.length - 1];

          if (lastItem) {
            const endDate = new Date(lastItem.reservation_end_date);
            const startDate = new Date(details.reservation_start_date);

            if (startDate > endDate) {
              // Ensure that the start date is one day ahead of the end date
              updatedData[type].push(details);
            } else {
              // Display an error alert if the start date is not one day ahead

              let msg =
                "Start date should be one day ahead of the end date of previously added record.";
              showToastByStatusCode(400, msg);
              return false;
            }
          } else {
            // No existing items, so we add the new item
            updatedData[type].push(details);
          }
        }
      }

      console.log(updatedData);

      return updatedData;
    });
  };

  const addUpdateReservation = () => {
    const data = getValues();

    console.log("all values :", data);

    // quantity: parseFloat(data?.quantity),

    // storage_rate_on: { value: 'On MT', label: 'On MT' },
    // storage_rate_on: { value: 'On No of bags', label: 'On No of bags' }

    // reservation_type: { label: 'Post Reservation', value: 'Post Reservation' }
    // reservation_type: { label: 'Reservation', value: 'Reservation' }

    // expected_no_of_bags: '',
    // reservation: { value: 'Yes', label: 'Yes' },
    // reserved_no_of_bags: '',

    // reservation_bag_size
    // reserved_no_of_bags

    let obj = {
      reservation_type: data?.reservation_type,
      storage_rate_on: data?.storage_rate_on,
      reservation_storage_rate_mt: data?.reservation_storage_rate_mt,
      reservation_bag_size: data?.reservation_bag_size || "",
      reserved_no_of_bags: data?.reserved_no_of_bags || "",
    };

    console.log(obj);

    let extra_fields = {};

    if (
      obj?.storage_rate_on?.value === "On No of bags" &&
      obj?.reservation_type?.value === "Reservation" &&
      (obj?.reservation_bag_size === "" || obj?.reserved_no_of_bags === "")
    ) {
      if (obj?.reservation_bag_size === "") {
        setError("reservation_bag_size", {
          type: "manual",
          message: "", // You can customize the error message here
        });
      }

      if (obj?.reserved_no_of_bags === "") {
        setError("reserved_no_of_bags", {
          type: "manual",
          message: "", // You can customize the error message here
        });
      }

      return false;
    } else {
      extra_fields = {
        reservation_bag_size: obj?.reservation_bag_size,
        reserved_no_of_bags: obj?.reserved_no_of_bags,
      };
      clearErrors(["reservation_bag_size", "reserved_no_of_bags"]);
    }

    console.log("extra_fields", extra_fields);

    // On MT
    if (
      obj?.storage_rate_on?.value === "On MT" &&
      obj?.reservation_type?.value === "Reservation" &&
      data?.reservation_storage_rate_mt === ""
    ) {
      setError("reservation_storage_rate_mt", {
        type: "manual",
        message: "", // You can customize the error message here
      });
      return false;
    } else {
      extra_fields = {
        reservation_storage_rate_mt: obj?.reservation_storage_rate_mt,
      };
      clearErrors(["reservation_storage_rate_mt"]);
    }

    const details = {
      reservation_type: data?.reservation_type || { label: "", value: "" },

      reservation_start_date: data?.reservation_start_date,
      reservation_end_date: data?.reservation_end_date,
      reservation_pbpm_rate: parseFloat(data?.reservation_pbpm_rate),
      reservation_rate: parseFloat(data?.reservation_rate),
      reservation_billing_cycle: data?.reservation_billing_cycle || {
        label: "",
        value: "",
      },
    };

    console.log("details.", details);

    const { index, isEdit } = isReservationDetailsEditState;

    try {
      // toValidateReservationDetailsSchema(details);
      const schema = validateReservationDetailsFormData(details);

      const { index, isEdit } = isReservationDetailsEditState;
      console.log("Data is valid.", details);
      const form_data_obj = {
        ...details,
        reservation_storage_rate_mt: data?.reservation_storage_rate_mt,
        reservation_bag_size: data?.reservation_bag_size,
        reserved_no_of_bags: data?.reserved_no_of_bags,
      };
      console.log(form_data_obj);

      // Use the function to update groupedReservationDetails
      //  let grouped_data = updateGroupedReservationDetails(form_data_obj);

      const updatedGroupDetails = { ...groupedReservationDetails };

      console.log(updatedGroupDetails);

      const group = form_data_obj.reservation_type.value;

      let end_date = moment(form_data_obj.reservation_end_date)
        .add(1, "days")
        .format("YYYY-MM-DD");
      console.log(end_date);
      if (isEdit) {
        setReservationDates({
          // endDate: moment(details.reservation_end_date).add(1, "days").toDate(),
          endDate: end_date,
        });
        updatedGroupDetails[group][index] = form_data_obj; // Editing existing reservation

        clearReservationDetailsForm();
      } else {
        if (!updatedGroupDetails[group]) {
          updatedGroupDetails[group] = []; // Create the group if it doesn't exist
        }
        setReservationDates({
          // endDate: moment(details.reservation_end_date).add(1, "days").toDate(),
          endDate: end_date,
        });

        updatedGroupDetails[group].push(form_data_obj); // Adding a new reservation
        clearReservationDetailsForm();
      }
      setReservationBillingCycle((prev) => ({
        ...prev,
        [group]: form_data_obj?.reservation_billing_cycle?.value,
      }));
      console.log(updatedGroupDetails);
      setGroupReservationDetails(updatedGroupDetails);
      //   console.log("grouped data ", grouped_data);

      // clearReservationDetailsForm();

      setIsReservationDetailsEditState({
        isEdit: false,
        index: null,
      });
    } catch (validationErrors) {
      console.log("validationErrors", validationErrors);
      Object.keys(validationErrors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: validationErrors[key] || "",
        });
      });
      return false;
    }
  };

  const reservationDetailsOnEdit = (item, i) => {
    console.log(item, i);
    setIsDisabledReservationType(true);
    setIsReservationDetailsEditState({
      isEdit: true,
      index: i,
    });

    setSelectedDropDownValue((prev) => ({
      ...prev,
      selectedReservationBillingCycle: item?.reservation_billing_cycle,
      selected_reservation_type: item?.reservation_type,
      selected_reservation_bag_size: item?.reservation_bag_size,
    }));

    Object.keys(item).forEach((key) => {
      setValue(key, item[key], {
        shouldValidate: true,
      });
    });
  };

  // const deleteReservationDetails = (index) => {
  //   let indexToRemove = index;

  //   if (indexToRemove >= 0 && indexToRemove < reservationDetails.length) {
  //     reservationDetails.splice(indexToRemove, 1);
  //     setReservationDetails([...reservationDetails]);
  //     clearReservationDetailsForm();
  //   }
  // };

  const deleteReservationDetails = (type, index) => {
    setIsDisabledReservationType(false);
    setGroupReservationDetails((prevData) => {
      const updatedData = { ...prevData };

      if (updatedData[type]) {
        if (updatedData[type].length === 1) {
          // If there is only one item in the group, remove the entire group
          delete updatedData[type];
        } else {
          // Remove the specific item from the group
          updatedData[type].splice(index, 1);
        }
      }

      return updatedData;
    });
  };

  console.log("all form errors --> ", errors);

  const clearReservationDetailsForm = () => {
    const obj = {
      reservation_type: "",

      reservation_storage_rate_mt: "",
      reservation_bag_size: "",
      reserved_no_of_bags: "",

      reservation_start_date: "",
      reservation_end_date: "",
      reservation_pbpm_rate: "",
      reservation_rate: "",
      reservation_billing_cycle: "",
    };

    setSelectedDropDownValue((prev) => ({
      ...prev,
      selectedReservationBillingCycle: {},
      selected_reservation_type: {},
      selected_reservation_bag_size: {},
    }));

    Object.keys(obj).forEach((key) => {
      setValue(key, "", {
        shouldValidate: false,
      });
    });
    setIsDisabledReservationType(false);
  };

  useEffect(() => {
    console.log("reservationDetails", reservationDetails);
  }, [reservationDetails]);

  // RESERVATION ALL METHODS END HERE //

  const handleFileChange = (url, name) => {
    setValue(name, url, { shouldValidate: true });

    console.log("param --->", url, name);
  };

  // form onsubmit method
  const onSubmit = (data) => {
    console.log("data==>", data);
    console.log("  ==>", warehousechamber);
    console.log("bag size array ===>", bagWiseRateDetails);
    console.log("reservation array ===>", reservationDetails);

    if (warehousechamber.length === 0) {
      scrollToElement("", 210); // first param to pass "ELEMENT-ID" || " " id to scroll and second param is pass "OFFSET" is options
      setError("warehouse", {
        type: "manual",
        message: "",
      });
      setError("chamber", {
        type: "manual",
        message: "",
      });
      return;
    }

    try {
      let contractcommodityArr = [];
      // old code logic
      // if (selectedDropDownValue?.selectedReservation?.value === "No") {
      //   //storage_rate_per_mt
      //   let arr = bagWiseRateDetails.map((el) => {
      //     delete el.service_contract;
      //     return {
      //       ...el,
      //       commodity: data.commodity.value,
      //       storage_rate_per_mt: parseFloat(getValues("storage_rate_per_mt")),
      //     };
      //   });

      //   contractcommodityArr = arr;
      // } else {
      //   contractcommodityArr = reservationDetails.map((el) => {
      //     delete el?.service_contract;
      //     return {
      //       ...el,
      //       commodity: data.commodity.value,
      //     };
      //   });
      // }

      const chamberArr = warehousechamber.map((el) => {
        return {
          warehouse: el.warehouse.value,
          chamber: el.chamber.value,
        };
      });

      const finalFormData = {
        contract_type: "pwh",
        client: data.client.value,
        fumigation_by_gogreen: data.fumigation_by_gogreen.value,
        insurance_by: data.insurance_by.value,
        qc_charges_by_gogreen: data.qc_charges_by_gogreen.value,
        excess_billing_cycle: data.excess_billing_cycle.value,
        storage_rate_on: data.storage_rate_on.value,
        reservation: data.reservation.value,

        post_reservation_billing_cycle:
          data.post_reservation_billing_cycle.value,
        service_contract_start_date: moment(
          data.service_contract_start_date
        ).format("YYYY-MM-DD"),
        service_contract_end_date: moment(
          data.service_contract_end_date
        ).format("YYYY-MM-DD"),

        upload_signed_service_contract: data.upload_signed_service_contract,
        warehousechamber: chamberArr,
        contractcommodity: contractcommodityArr,
      };

      if (selectedDropDownValue?.selectedReservation?.value === "No") {
        const bag_wise_rate_details_for_schema_validations = {
          storage_rate_per_mt: getValues("storage_rate_per_mt"),
          contractCommodity: contractCommodity?.map((el) => ({
            bag_size: el.bag_size,
            pbpm_rate: el.pbpm_rate,
            rate: el.rate,
          })),
        };

        toValidateContractCommodity_Bag_size_Schema(
          bag_wise_rate_details_for_schema_validations
        );

        console.log("finalFormData obj ==========>", finalFormData);
        if (details?.id) {
          updateData({ ...finalFormData, id: details.id });
        } else {
          addData(finalFormData);
        }
      } else {
        if (details?.id) {
          updateData({ ...finalFormData, id: details.id });
        } else {
          addData(finalFormData);
        }
      }
      //console.log("details", details);
    } catch (validationErrors) {
      console.log("validationErrors ----->", validationErrors);
      Object.keys(validationErrors).forEach((key) => {
        setError(key, {
          type: "manual",
          message: validationErrors[key] || "",
        });
      });
      return false;
    }
  };

  const addData = async (finalFormData) => {
    try {
      const response = await addServiceContractData(finalFormData).unwrap();
      console.log("Success:", response);
      if (response.status === 201) {
        console.log(response);
        showToastByStatusCode(201, response?.message);

        navigate("/service-contract-pwh");
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const fetchAllBagWiseDetails = async (id) => {
    try {
      const response = await fetchBagWiseDetails(id).unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        setValue("rate", 0, {
          shouldValidate: true,
        });
        console.log(response);
        let arr = response?.data?.map((el) => ({
          bag_size: el.bag_size,
          commodity: el.commodity_name,
          pbpm_rate: el.storage_rate,
          rate: 0,
        }));

        setBagWiseRateDetails(arr);
      }
    } catch (error) {
      console.error("Error:", error);
      toasterAlert(error);
    }
  };

  const updateData = async (finalFormData) => {
    try {
      const response = await updateServiceContractData({
        finalFormData,
        id: details.id,
        contract_type: "pwh",
      }).unwrap();
      console.log("Success:", response);
      if (response.status === 200) {
        if (
          Number(details?.status?.status_code || 0) === 2 ||
          Number(details?.status?.status_code || 0) === 5
        ) {
          approvedToMeFunction();
        } else {
          toasterAlert(response);
          navigate("/service-contract-pwh");
        }
      }
    } catch (error) {
      console.log(error);
      let errorMessage =
        error?.data?.data || error?.data?.message || "Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  const calculateEndDate = (startDate) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 11);
    return endDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // All useEffect start here
  useEffect(() => {
    fetchAllClients();
    getRegionMasterList();
    fetchAllCommodity();

    if (details?.id) {
      // alert();
      let drillDown = {
        region:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.region?.id
            : "",
        state:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.state?.id
            : "",
        substate:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.substate?.id
            : "",
        district:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.district?.id
            : "",
        area:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.area?.id
            : "",
      };

      regionOnChange({ value: drillDown?.region });
      stateOnChange({ value: drillDown?.state });
      zoneOnChange({ value: drillDown?.substate });
      districtOnChange({ value: drillDown?.district });
      methods.setValue("area", drillDown?.area, { shouldValidate: true });

      let query = {
        filter: "warehouse_type",
        warehouse_type: "PWH",
        filter: "area",
        area:
          details?.warehousechamber?.length > 0
            ? details?.warehousechamber[0]?.warehouse?.area?.area_name
            : "",
      };

      getWarehouseMasterList(query);

      // let obj = {
      //   region: details?.region?.id,
      //   state: details?.state?.id,
      //   substate: details.substate?.id,
      //   district: details.district?.id,
      //   area: details.area?.id,
      // };
      // console.log("details", details);
      // console.log("obj", obj);

      // Object.keys(obj).forEach(function (key) {
      //   methods.setValue(key, obj[key], { shouldValidate: true });
      // });
      console.log("all edited details -->", details);

      const finalFormData = {
        client: {
          label: details?.client.name_of_client,
          value: details?.client.id,
        },
        commodity: {
          label:
            details?.contractcommodity?.length > 0
              ? details?.contractcommodity[0]?.commodity?.commodity_name
              : "",
          value:
            details?.contractcommodity?.length > 0
              ? details?.contractcommodity[0]?.commodity?.id
              : "",
        },

        fumigation_by_gogreen: {
          label: details?.fumigation_by_gogreen,
          value: details?.fumigation_by_gogreen,
        },
        insurance_by: insurance_by.filter(
          (el) => el.value === details.insurance_by
        )[0],
        qc_charges_by_gogreen: QC_charges_by_go_green.filter(
          (el) => el.value === details.qc_charges_by_gogreen
        )[0],
        excess_billing_cycle: Excess_Billing_Cycle.filter(
          (el) => el.value === details.excess_billing_cycle
        )[0],
        storage_rate_on: Storage_rate_on.filter(
          (el) => el.value === details.storage_rate_on
        )[0],
        reservation: RESERVATION.filter(
          (el) => el.value === details.reservation
        )[0],

        post_reservation_billing_cycle: Post_Reservation_Billing_Cycle.filter(
          (el) => el.value === details.post_reservation_billing_cycle
        )[0],
        service_contract_start_date: details.service_contract_start_date,
        service_contract_end_date: details.service_contract_end_date,

        upload_signed_service_contract: details.upload_signed_service_contract,
      };

      setSelectedDropDownValue((prev) => ({
        ...prev,
        selectedClient: finalFormData.client,
        selectedCommodity: finalFormData.commodity,
        selectedFumigation: finalFormData.fumigation_by_gogreen,
        selectedInsurance: finalFormData.insurance_by,
        selectedQcCharges: finalFormData.qc_charges_by_gogreen,
        selectedExcessBillingCycle: finalFormData.excess_billing_cycle,
        selectedStorageRate: finalFormData.storage_rate_on,
        selectedReservation: finalFormData.reservation,
        selectedReservationBillingCycle:
          finalFormData.post_reservation_billing_cycle,
      }));

      setWarehousechamber(
        details?.warehousechamber?.map((el) => ({
          warehouse: {
            label: el.warehouse.warehouse_name,
            value: el.warehouse.id,
          },
          chamber: {
            label: el.chamber.chamber_number,
            value: el.chamber.id,
          },
        }))
      );

      if (finalFormData?.reservation?.value === "No") {
        methods.setValue(
          "storage_rate_per_mt",
          details?.contractcommodity?.length > 0
            ? details?.contractcommodity[0]?.storage_rate_per_mt
            : "",
          { shouldValidate: true }
        );

        let warehouse_id = details?.warehousechamber
          ? details?.warehousechamber[0]?.warehouse.id
          : null;
        fetchAllBagWiseDetails(warehouse_id);
        setBagWiseRateDetails(details?.contractcommodity);
      } else {
        setReservationDetails(details?.contractcommodity);
      }

      Object.keys(finalFormData).forEach(function (key) {
        methods.setValue(key, finalFormData[key], { shouldValidate: true });
      });

      console.log("finalFormData ---> on page load -->", finalFormData);
    }
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("value -->", value);
      console.log("name -->", name);
      console.log("type -->", type);

      if (name === "area" && value.area !== null && !Number(value.area)) {
        let query = {
          filter: "warehouse_type",
          warehouse_type: "PWH",
          filter: "area",
          area: value?.area,
        };

        setWarehouseOptions([]);
        setChamberOptions([]);

        setSelectedDropDownValue((prev) => ({
          ...prev,
          selectedWarehouseName: {},
          selectedChamber: {},
        }));

        getWarehouseMasterList(query);
      }

      if (name === "warehouse") {
        let query = {
          filter: "warehouse",
          warehouse: value?.warehouse?.label,
        };
        console.log(query);
        getChamberMasterList(query);
      }
      if (name === "reservation") {
        // setBagWiseRateDetails([...contractCommodity]);
        // setReservationDetails([]);
        // if (value.reservation.value === "No") {
        //   //fetchBagWiseDetails
        //   console.log(getValues("warehouse"));
        //   console.log("warehousechamber !!!", warehousechamber);
        //   //  let commodity_id = getValues("warehouse")?.value;
        //   let commodity_id = warehousechamber[0]?.warehouse?.value;
        //   console.log("commodity_id", commodity_id);
        //   console.log(warehousechamber);
        //   if (commodity_id) {
        //     fetchAllBagWiseDetails(commodity_id);
        //   }
        // }
        // reset({ rate: "" });
      }
      if (name === "service_contract_start_date") {
        let end_date = calculateEndDate(value.service_contract_start_date);
        setValue("service_contract_end_date", end_date, {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setBagWiseRateDetails([...contractCommodity]);
    setReservationDetails([]);
    let warehouse_obj = getValues("reservation");
    console.log("ware --->", warehouse_obj);
    if (warehouse_obj?.value === "No") {
      console.log(getValues("warehouse"));
      console.log("warehousechamber !!!", warehousechamber);
      //  let commodity_id = getValues("warehouse")?.value;

      let commodity_id = warehousechamber[0]?.warehouse?.value;
      console.log("commodity_id", commodity_id);
      console.log(warehousechamber);
      if (commodity_id) {
        fetchAllBagWiseDetails(commodity_id);
      }
    }
  }, [getValues("reservation")]);

  console.log("errors -->", errors);
  // console.log("getAllValues --->", getValues());

  useEffect(() => {
    // set breadcrumbArray
    const breadcrumbArray = [
      {
        title: "Service Contract(PWH)",
        link: "/service-contract-pwh",
      },
      // {
      //   title: "Region Master",
      //   link: "/manage-location/region-master",
      // },
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

  // Input disable Logic Start

  const InputDisableFunction = () => {
    const result =
      pageView ||
      details?.status?.status_code === 1 ||
      details?.status?.status_code === 3 ||
      details?.status?.status_code === 4 ||
      details?.status?.status_code === 6 ||
      details?.status?.status_code === 7
        ? true
        : false;

    return result;
  };

  // Input disable Logic End

  // Reject Logic Start

  const [rejectReason, setRejectReason] = useState("");

  const [
    UpdateAssignServiceMaster,
    { isLoading: updateAssignServiceMasterApiIsLoading },
  ] = useAssignServiceContractMutation();

  const assignToMeFunction = async () => {
    const data = {
      id: details.id,
      status: "assigned",
      reasons: "",
    };

    try {
      const response = await UpdateAssignServiceMaster(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        toasterAlert({
          message: "Service Contract Assign Successfully.",
          status: 200,
        });
        navigate("/service-contract-pwh");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data || error?.data?.message || "Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }

    console.log(data, "data");
  };

  const approvedToMeFunction = async () => {
    const data = {
      id: details.id,
      status: "approved",
      reasons: "",
    };

    try {
      const response = await UpdateAssignServiceMaster(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        toasterAlert({
          message: "Service Contract Approved Successfully.",
          status: 200,
        });
        navigate("/service-contract-pwh");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data || error?.data?.message || "Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }

    console.log(data, "data");
  };

  const rejectedToMeFunction = async () => {
    const data = {
      id: details.id,
      status: "rejected",
      reasons: rejectReason || "reject",
    };

    try {
      const response = await UpdateAssignServiceMaster(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        toasterAlert({
          message: "Service Contract Rejected Successfully.",
          status: 200,
        });
        navigate("/service-contract-pwh");
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data || error?.data?.message || "Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }

    console.log(data, "data");
  };

  // Reject Logic Start

  function renderRows(reservationType, reservations) {
    return reservations.map((data, index) => (
      <Tr style={{ color: "#000" }} key={index}>
        {index === 0 && (
          <Td rowSpan={reservations.length}>{reservationType}</Td>
        )}
        {/* <Td>{data.reservation_type.label}</Td> */}
        <Td>{data.reservation_storage_rate_mt}</Td>
        <Td>{data.reservation_bag_size?.label || "-"}</Td>
        <Td>{data.reserved_no_of_bags || "-"}</Td>
        <Td>{data.reservation_start_date}</Td>
        <Td>{data.reservation_end_date}</Td>
        <Td>{data.reservation_pbpm_rate}</Td>
        <Td>{data.reservation_rate}</Td>
        {/* <Td>{data.reservation_billing_cycle.label}</Td> */}
        <Td>{reservationBillingCycle?.[reservationType]}</Td>
        <Td>
          <Box display="flex" alignItems="center" gap="3">
            <Flex gap="20px" justifyContent="center">
              <Box color={"primary.700"}>
                <BiEditAlt
                  fontSize="26px"
                  cursor="pointer"
                  onClick={() => reservationDetailsOnEdit(data, index)}
                />
              </Box>
              <Box color="red">
                <AiOutlineDelete
                  cursor="pointer"
                  fontSize="26px"
                  onClick={() =>
                    deleteReservationDetails(reservationType, index)
                  }
                />
              </Box>
            </Flex>
          </Box>
        </Td>
      </Tr>
    ));
  }

  function ReservationTable({ data }) {
    return (
      <Table variant="simple">
        <Thead>
          <Tr style={{ color: "#000" }}>
            {tableHeaders.map((header, index) => (
              <Th style={{ color: "#000" }} key={index}>
                {header}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(data).map((reservationType) =>
            renderRows(reservationType, data[reservationType])
          )}
        </Tbody>
      </Table>
    );
  }

  return (
    <>
      <Box bgColor={"White"} borderRadius={"md"} p={2}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box
              w={{
                base: "100%",
                sm: "100%",
                md: "100%",
                lg: "100%",
                xl: "100%",
              }}
            >
              {/*Client name   */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Client name<span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      name="client"
                      value={selectedDropDownValue?.selectedClient}
                      onChange={(val) => {
                        dropDownOnChange(val, "selectedClient", "client");
                      }}
                      options={clientOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.client ? "red" : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Region  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Region<span style={{ color: "red" }}>*</span>{" "}
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
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
                      isDisabled={InputDisableFunction()}
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
              {/* State  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    {" "}
                    State <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>

                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
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
                      isDisabled={InputDisableFunction()}
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
              {/*  Sub states  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Sub state<span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactCustomSelect
                      name="substate"
                      label=""
                      isDisabled={InputDisableFunction()}
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
              {/*  District  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    District<span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
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
                      isDisabled={InputDisableFunction()}
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
              {/*  Area  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Area<span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
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
                      isDisabled={InputDisableFunction()}
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

              {/* Chamber details* start    */}
              <Box id="chamber-details">
                <Box>
                  <Box
                    mt="10"
                    bgColor={"#DBFFF5"}
                    padding="20px"
                    borderRadius="10px"
                  >
                    <Heading as="h5" fontSize="lg" textAlign="left">
                      Chamber details*
                    </Heading>

                    <>
                      <Box pt="10px">
                        <Grid
                          alignItems="center"
                          my="3"
                          templateColumns="repeat(3, 1fr)"
                          gap={5}
                        >
                          {/* --------------  Warehouse name* -------------- */}
                          <Box>
                            <Text my={1}>
                              Warehouse name
                              <span style={{ color: "red" }}>*</span>
                            </Text>{" "}
                            <Box>
                              <FormControl style={{ w: commonWidth.w }}>
                                <ReactSelect
                                  value={
                                    selectedDropDownValue?.selectedWarehouseName
                                  }
                                  name="warehouse"
                                  isDisabled={InputDisableFunction()}
                                  onChange={(val) =>
                                    dropDownOnChange(
                                      val,
                                      "selectedWarehouseName",
                                      "warehouse"
                                    )
                                  }
                                  options={warehouseOptions}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: errors?.warehouse
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),

                                    ...reactSelectStyle,
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </Box>
                          {/* ------ Chamber no------------- */}
                          <Box>
                            <Text my={1}>
                              Chamber no<span style={{ color: "red" }}>*</span>
                            </Text>{" "}
                            <Box>
                              <FormControl style={{ w: commonWidth.w }}>
                                <ReactSelect
                                  value={selectedDropDownValue?.selectedChamber}
                                  onChange={(val) =>
                                    dropDownOnChange(
                                      val,
                                      "selectedChamber",
                                      "chamber"
                                    )
                                  }
                                  options={chamberOptions}
                                  isDisabled={InputDisableFunction()}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor: errors?.chamber
                                        ? "red"
                                        : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </Box>
                        </Grid>
                      </Box>

                      {/* ----------------- save button -----------  */}

                      <Flex gap="10px" justifyContent="end" alignItems="center">
                        <Button
                          bg="#A6CE39"
                          _hover={{}}
                          color="white"
                          padding="0px 20px"
                          borderRadius={"50px"}
                          type="button"
                          onClick={() => {
                            addUpdateChamber();
                          }}
                        >
                          {isChamberDetailsEditState.isEdit ? "Update" : "Add"}
                        </Button>
                      </Flex>
                    </>
                  </Box>
                </Box>
                {/* Chamber details end    */}
                {/* show warehouse owner details table start */}
                <TableContainer mt="4">
                  <Table color="#000">
                    <Thead bg="#dbfff5" border="1px" borderColor="#000">
                      <Tr style={{ color: "#000" }}>
                        <Th color="#000">Sr no</Th>
                        <Th color="#000">Warehouse name</Th>
                        <Th color="#000">Chamber no</Th>

                        <Th color="#000">Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {warehousechamber && warehousechamber.length > 0 ? (
                        warehousechamber?.map((item, i) => (
                          <Tr
                            key={`chamber_${i}`}
                            textAlign="center"
                            bg="white"
                            border="1px"
                            borderColor="#000"
                          >
                            <Td>{i + 1}</Td>
                            <Td>{item?.warehouse?.label} </Td>
                            <Td>{item?.chamber?.label} </Td>
                            <Td>
                              <Box display="flex" alignItems="center" gap="3">
                                <Flex gap="20px" justifyContent="center">
                                  <Box color={"primary.700"}>
                                    <BiEditAlt
                                      // color="#A6CE39"
                                      fontSize="26px"
                                      cursor="pointer"
                                      onClick={() =>
                                        chamberDetailsOnEdit(item, i)
                                      }
                                    />
                                  </Box>
                                  <Box color="red">
                                    <AiOutlineDelete
                                      cursor="pointer"
                                      fontSize="26px"
                                      onClick={() => {
                                        deleteChamberDetails(i);
                                      }}
                                    />
                                  </Box>
                                </Flex>
                              </Box>
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr textAlign="center">
                          <Td textAlign="center" colSpan={5} color="#000">
                            No record found
                          </Td>
                        </Tr>
                      )}

                      {/* )} */}
                    </Tbody>
                  </Table>
                </TableContainer>
                {/* show client table end */}
              </Box>

              {/*Commodity name   */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Commodity name<span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedCommodity}
                      onChange={(val) =>
                        dropDownOnChange(val, "selectedCommodity", "commodity")
                      }
                      options={commodityOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.commodity ? "red" : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Fumigation by go green */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Fumigation by go green
                    <span style={{ color: "red" }}>*</span>{" "}
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedFumigation}
                      onChange={(val) =>
                        dropDownOnChange(
                          val,
                          "selectedFumigation",
                          "fumigation_by_gogreen"
                        )
                      }
                      options={fumigationOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.fumigation_by_gogreen
                            ? "red"
                            : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* insurance by  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    {" "}
                    insurance by <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>

                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedInsurance}
                      onChange={(val) =>
                        dropDownOnChange(
                          val,
                          "selectedInsurance",
                          "insurance_by"
                        )
                      }
                      options={insuranceByOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.insurance_by ? "red" : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Bank name */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Bank name <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedBank}
                      onChange={(val) =>
                        dropDownOnChange(val, "selectedBank", "bank")
                      }
                      options={banksList || []}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.bank ? "red" : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Billing details :  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right" color={"#212121"}>
                    Billing details :{" "}
                  </Text>{" "}
                </GridItem>
              </Grid>

              {/*  QC charges by go green  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    QC charges by go green
                    <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedQcCharges}
                      onChange={(val) =>
                        dropDownOnChange(
                          val,
                          "selectedQcCharges",
                          "qc_charges_by_gogreen"
                        )
                      }
                      options={qcChargesOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.qc_charges_by_gogreen
                            ? "red"
                            : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* Normal Billing Cycle  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    {" "}
                    Normal Billing Cycle<span style={{ color: "red" }}>
                      *
                    </span>{" "}
                  </Text>{" "}
                </GridItem>

                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedExcessBillingCycle}
                      onChange={(val) =>
                        dropDownOnChange(
                          val,
                          "selectedExcessBillingCycle",
                          "excess_billing_cycle"
                        )
                      }
                      options={excessBillingCycleOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.excess_billing_cycle
                            ? "red"
                            : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/* Storage rate on  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    {" "}
                    Storage rate on<span style={{ color: "red" }}>*</span>{" "}
                  </Text>{" "}
                </GridItem>

                <GridItem colSpan={{ base: 1 }}>
                  <FormControl
                    style={{ w: commonWidth.w }}
                    isInvalid={errors?.storage_rate_on}
                  >
                    <ReactSelect
                      name="storage_rate_on"
                      /// {...register("storage_rate_on")}
                      value={selectedDropDownValue?.selectedStorageRate}
                      onChange={(val) => {
                        console.log(val);
                        setBagWiseDetailsArray([]);
                        setGroupReservationDetails({});
                        clearBagWiseRateDetailsForm();
                        dropDownOnChange(
                          val,
                          "selectedStorageRate",
                          "storage_rate_on"
                        );
                      }}
                      options={storageOnRateOptions}
                      isDisabled={InputDisableFunction()}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.storage_rate_on
                            ? "red"
                            : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              {/*  Reservation  */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Reservation <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl style={{ w: commonWidth.w }}>
                    <ReactSelect
                      value={selectedDropDownValue?.selectedReservation}
                      name="reservation"
                      isDisabled={InputDisableFunction()}
                      onChange={(val) => {
                        setValue("expected_quantity", "", {
                          shouldValidate: false,
                        });
                        setValue("expected_no_of_bags", "", {
                          shouldValidate: false,
                        });

                        dropDownOnChange(
                          val,
                          "selectedReservation",
                          "reservation"
                        );
                      }}
                      options={reservationOptions}
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                          borderColor: errors?.reservation ? "red" : "#c3c3c3",

                          padding: "1px",
                          textAlign: "left",
                        }),
                        ...reactSelectStyle,
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {selectedDropDownValue?.selectedStorageRate?.value ===
                "On MT" && (
                <>
                  {/*  Storage rate / MT   */}
                  <Grid
                    textAlign="right"
                    alignItems="center"
                    my="3"
                    templateColumns={templateColumns}
                    gap={5}
                  >
                    <GridItem colSpan={{ base: 1, lg: 0 }}>
                      <Text textAlign="right">
                        Storage rate / MT<span style={{ color: "red" }}>*</span>{" "}
                      </Text>{" "}
                    </GridItem>
                    <GridItem colSpan={{ base: 1 }}>
                      <FormControl
                        isInvalid={errors?.storage_rate_per_mt}
                        style={{ w: commonWidth.w }}
                      >
                        <Input
                          type="number"
                          name="storage_rate_per_mt"
                          isDisabled={InputDisableFunction()}
                          step="0.01"
                          {...register("storage_rate_per_mt")}
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
                          placeholder="Bag size"
                        />
                      </FormControl>

                      {errors && errors?.storage_rate_per_mt?.message && (
                        <Text textAlign="left" color="red">
                          {errors?.storage_rate_per_mt?.message}
                        </Text>
                      )}
                    </GridItem>
                    <GridItem textAlign="left">PBPM Rate: 77.5</GridItem>
                  </Grid>
                </>
              )}

              {selectedDropDownValue?.selectedStorageRate?.value ===
                "On No of bags" && (
                <>
                  {/* Bag wise rate details* start*/}
                  <Box>
                    <Box
                      mt="10"
                      bgColor={"#DBFFF5"}
                      padding="20px"
                      borderRadius="10px"
                    >
                      <Heading as="h5" fontSize="lg" textAlign="left">
                        Bag wise rate details*
                      </Heading>

                      <>
                        <Box pt="10px">
                          {
                            // bagWiseRateDetails &&
                            // bagWiseRateDetails.length > 0 ? (
                            //   bagWiseRateDetails.map((item, index) => (
                            <Grid
                              //  key={`bag_size_${index}`}
                              alignItems="center"
                              my="3"
                              templateColumns="repeat(4, 1fr)"
                              gap={5}
                            >
                              <GridItem>
                                {/* --------------  Bag size-------------- */}
                                <Box>
                                  <Text my={1}>Bag size</Text>{" "}
                                  <Box>
                                    <FormControl
                                      style={{ w: commonWidth.w }}
                                      isInvalid={errors?.bag_size}
                                    >
                                      <ReactSelect
                                        name="bag_size"
                                        // value={
                                        //   selectedDropDownValue?.selectedClient
                                        // }

                                        onChange={(val) => {
                                          setValue("bag_size", val, {
                                            shouldValidate: true,
                                          });
                                        }}
                                        options={bagSizeList}
                                        isDisabled={InputDisableFunction()}
                                        styles={{
                                          control: (base, state) => ({
                                            ...base,
                                            backgroundColor: "#fff",
                                            borderRadius: "6px",
                                            borderColor: errors?.client
                                              ? "red"
                                              : "#c3c3c3",

                                            padding: "1px",
                                            textAlign: "left",
                                          }),
                                          ...reactSelectStyle,
                                        }}
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                              </GridItem>
                              <GridItem>
                                {/* --------------  PBPM rate-------------- */}
                                <Box>
                                  <Text my={1}>
                                    PBPM rate
                                    <span style={{ color: "red" }}>*</span>
                                  </Text>{" "}
                                  <Box position="relative">
                                    <FormControl
                                      style={{ w: commonWidth.w }}
                                      isInvalid={errors?.pbpm_rate}
                                    >
                                      <Input
                                        type="number"
                                        name="pbpm_rate"
                                        {...register("pbpm_rate")}
                                        border="1px"
                                        borderColor="gray.10"
                                        backgroundColor={"white"}
                                        height={"15px "}
                                        borderRadius={"lg"}
                                        //  value={item?.pbpm_rate}
                                        isDisabled={true}
                                        _placeholder={commonStyle._placeholder}
                                        _hover={commonStyle._hover}
                                        _focus={commonStyle._focus}
                                        p={{ base: "4" }}
                                        fontWeight={{ base: "normal" }}
                                        fontStyle={"normal"}
                                        placeholder="PBPM rate"
                                      />
                                    </FormControl>
                                    {errors && errors?.pbpm_rate?.message && (
                                      <Text
                                        as="small"
                                        position="absolute"
                                        // display="block"
                                        textAlign="left"
                                        color="red"
                                      >
                                        {errors?.pbpm_rate?.message}
                                      </Text>
                                    )}
                                  </Box>
                                </Box>
                              </GridItem>
                              <GridItem>
                                {/* --------------  rate-------------- */}
                                <Box>
                                  <Text my={1}>
                                    rate<span style={{ color: "red" }}>*</span>
                                  </Text>{" "}
                                  <Box>
                                    <FormControl
                                      style={{ w: commonWidth.w }}
                                      isInvalid={errors?.rate}
                                      //isInvalid={errors?.[`rate[${index}]`]}
                                    >
                                      <Input
                                        type="number"
                                        step="0.01"
                                        name="rate"
                                        {...register("rate")}
                                        border="1px"
                                        borderColor="gray.10"
                                        backgroundColor={"white"}
                                        height={"15px"}
                                        borderRadius={"lg"}
                                        // value={
                                        //   getValues(`rate[${index}]`) || item.rate
                                        // }
                                        onChange={(e) => {
                                          console.log(e.target.value);
                                        }}
                                        isDisabled={false}
                                        _placeholder={commonStyle._placeholder}
                                        _hover={commonStyle._hover}
                                        _focus={commonStyle._focus}
                                        p={{ base: "4" }}
                                        fontWeight={{ base: "normal" }}
                                        fontStyle={"normal"}
                                        placeholder="rate"
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                              </GridItem>
                              <GridItem>
                                <Box display="flex" gap="2">
                                  {/* --------------  Check PBPM Button -------------- */}
                                  <Box mt="6">
                                    <Button
                                      type="button"
                                      // isDisabled={pageView}
                                      backgroundColor={"primary.700"}
                                      _hover={{
                                        backgroundColor: "primary.700",
                                      }}
                                      color={"white"}
                                      borderRadius={"full"}
                                      // my={"4"}
                                      px={"10"}
                                      onClick={() => checkPbpm()}
                                    >
                                      Check PBPM
                                    </Button>
                                  </Box>
                                  {/* --------------  Add | Update Button -------------- */}
                                  <Box textAlign="left" mt="6">
                                    <Button
                                      type="button"
                                      // isDisabled={pageView}
                                      backgroundColor={"primary.700"}
                                      _hover={{
                                        backgroundColor: "primary.700",
                                      }}
                                      color={"white"}
                                      borderRadius={"full"}
                                      // my={"4"}
                                      px={"10"}
                                      onClick={() => addUpdateBagWiseRate()}
                                    >
                                      {isBagWiseDetailsEditState?.isEdit
                                        ? "Update"
                                        : "Add"}
                                    </Button>
                                  </Box>
                                </Box>
                              </GridItem>
                            </Grid>
                            // ))
                            //)
                            // : (
                            //   <Box>No data found</Box>
                            // )
                          }
                        </Box>
                      </>
                    </Box>
                  </Box>
                  {/* Bag wise rate details*  end    */}
                  {/* bagWise details table start */}
                  <TableContainer mt="4">
                    <Table color="#000">
                      <Thead bg="#dbfff5" border="1px" borderColor="#000">
                        <Tr style={{ color: "#000" }}>
                          <Th color="#000">Sr no</Th>
                          <Th color="#000">Bag Size</Th>
                          <Th color="#000">PBPM Rate</Th>
                          <Th color="#000">Rate</Th>
                          <Th color="#000">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {bagWiseDetailsArray &&
                          bagWiseDetailsArray?.map((item, i) => (
                            <Tr
                              key={`bag_wise_details_${i}`}
                              textAlign="center"
                              bg="white"
                              border="1px"
                              borderColor="#000"
                            >
                              <Td>{i + 1} </Td>
                              <Td>{item?.bag_size?.label} </Td>

                              <Td>{item?.pbpm_rate} </Td>
                              <Td>{item?.rate}</Td>

                              <Td>
                                <Box display="flex" alignItems="center" gap="3">
                                  <Flex gap="20px" justifyContent="center">
                                    <Box color={"primary.700"}>
                                      <BiEditAlt
                                        // color="#A6CE39"
                                        fontSize="26px"
                                        cursor="pointer"
                                        onClick={() =>
                                          bagWiseRateDetailsOnEdit(item, i)
                                        }
                                      />
                                    </Box>
                                    <Box color="red">
                                      <AiOutlineDelete
                                        cursor="pointer"
                                        fontSize="26px"
                                        onClick={() => {
                                          deleteBagWiseRateDetails(i);
                                        }}
                                      />
                                    </Box>
                                  </Flex>
                                </Box>
                              </Td>
                            </Tr>
                          ))}
                        {bagWiseDetailsArray.length === 0 && (
                          <Tr
                            textAlign="center"
                            bg="white"
                            border="1px"
                            borderColor="#000"
                          >
                            <Td textAlign="center" colSpan={4}>
                              No record found.
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                  {/*bagWise Details details table end */}
                </>
              )}

              {selectedDropDownValue?.selectedReservation?.value === "Yes" && (
                <>
                  {/* Reservation details*  starts*/}
                  <Box>
                    <Box
                      mt="10"
                      bgColor={"#DBFFF5"}
                      padding="20px"
                      borderRadius="10px"
                    >
                      <Heading as="h5" fontSize="lg" textAlign="left">
                        Reservation details*
                      </Heading>

                      <>
                        <Box pt="10px">
                          <Grid
                            alignItems="center"
                            my="3"
                            templateColumns="repeat(3, 1fr)"
                            gap={5}
                          >
                            {/* -------------- Post Reservation / Reservation  -------------- */}
                            <Box>
                              <Text my={1}>
                                Reservation Type{" "}
                                <span style={{ color: "red" }}>*</span>{" "}
                              </Text>{" "}
                              <FormControl style={{ w: commonWidth.w }}>
                                <ReactSelect
                                  name="reservation_type"
                                  value={
                                    selectedDropDownValue?.selected_reservation_type
                                  }
                                  onChange={(val) => {
                                    setSelectedDropDownValue((prev) => ({
                                      ...prev,
                                      selected_reservation_type: val,
                                    }));
                                    setValue("reservation_type", val, {
                                      shouldValidate: true,
                                    });
                                  }}
                                  options={[
                                    {
                                      label: "Post Reservation",
                                      value: "Post Reservation",
                                    },
                                    {
                                      label: "Reservation",
                                      value: "Reservation",
                                    },
                                  ]}
                                  //isDisabled={true}
                                  isDisabled={
                                    InputDisableFunction() ||
                                    isDisabledReservationType
                                  }
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor:
                                        errors?.reservation_type ||
                                        errors?.reservation_type?.label
                                          ? "red"
                                          : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </FormControl>
                            </Box>

                            {selectedDropDownValue?.selectedStorageRate
                              ?.value === "On No of bags" ? (
                              <>
                                {/* -------------- Reservation Bag size -------------- */}
                                <Box>
                                  <Text my={1}>
                                    Reservation Bag size{" "}
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </Text>{" "}
                                  <FormControl
                                    style={{ w: commonWidth.w }}
                                    // isInvalid={errors?.reservation_bag_size}
                                  >
                                    <ReactSelect
                                      name="reservation_bag_size"
                                      value={
                                        selectedDropDownValue?.selected_reservation_bag_size
                                      }
                                      onChange={(val) => {
                                        setSelectedDropDownValue((prev) => ({
                                          ...prev,
                                          selected_reservation_bag_size: val,
                                        }));
                                        setValue("reservation_bag_size", val, {
                                          shouldValidate: true,
                                        });
                                      }}
                                      options={bagSizeList}
                                      isDisabled={InputDisableFunction()}
                                      styles={{
                                        control: (base, state) => ({
                                          ...base,
                                          backgroundColor: "#fff",
                                          borderRadius: "6px",
                                          borderColor:
                                            errors?.reservation_bag_size
                                              ? "red"
                                              : "#c3c3c3",

                                          padding: "1px",
                                          textAlign: "left",
                                        }),
                                        ...reactSelectStyle,
                                      }}
                                    />
                                  </FormControl>
                                </Box>
                                {/* --------------  Reserved no of bags-------------- */}
                                <Box>
                                  {/* Reserved no of bags  */}
                                  <Text my={1}>
                                    Reserved no of bags{" "}
                                    <span style={{ color: "red" }}>*</span>{" "}
                                  </Text>{" "}
                                  <FormControl
                                    style={{ w: commonWidth.w }}
                                    isInvalid={errors?.reserved_no_of_bags}
                                  >
                                    <Input
                                      type="number"
                                      name="reserved_no_of_bags"
                                      {...register("reserved_no_of_bags")}
                                      border="1px"
                                      isDisabled={InputDisableFunction()}
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
                                      placeholder="Reserved No Of Bags"
                                    />
                                  </FormControl>
                                </Box>
                              </>
                            ) : (
                              <>
                                {/* --------------  Reservation MT-------------- */}
                                <Box>
                                  <Text my={1}>
                                    Reservation MT
                                    <span style={{ color: "red" }}>*</span>
                                  </Text>{" "}
                                  <Box>
                                    <FormControl
                                      style={{ w: commonWidth.w }}
                                      isInvalid={
                                        errors?.reservation_storage_rate_mt
                                      }
                                    >
                                      <Input
                                        type="number"
                                        name="reservation_storage_rate_mt"
                                        {...register(
                                          "reservation_storage_rate_mt"
                                        )}
                                        border="1px"
                                        borderColor="gray.10"
                                        backgroundColor={"white"}
                                        isDisabled={InputDisableFunction()}
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
                                        placeholder="Reservation storage rate mt"
                                      />
                                    </FormControl>
                                  </Box>
                                </Box>
                              </>
                            )}

                            {/* --------------  Start date-------------- */}
                            <Box>
                              <Text my={1}>
                                Start date
                                <span style={{ color: "red" }}>*</span>
                              </Text>{" "}
                              <Box>
                                <FormControl
                                  style={{ w: commonWidth.w }}
                                  isInvalid={errors?.reservation_start_date}
                                >
                                  <Input
                                    type="date"
                                    // minDate={lastEndDate}
                                    min={reservationDates.endDate}
                                    id="reservation_start_date"
                                    name="reservation_start_date"
                                    {...register("reservation_start_date")}
                                    border="1px"
                                    borderColor="gray.10"
                                    backgroundColor={"white"}
                                    isDisabled={InputDisableFunction()}
                                    onChange={(e) => {
                                      setReservationDates((prev) => ({
                                        ...prev,
                                        startDate: e?.target?.value,
                                      }));
                                    }}
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
                                    placeholder="Start date"
                                  />
                                </FormControl>
                              </Box>
                            </Box>
                            {/* --------------  End date-------------- */}
                            <Box>
                              <Text my={1}>
                                End date<span style={{ color: "red" }}>*</span>
                              </Text>{" "}
                              <Box>
                                <FormControl
                                  style={{ w: commonWidth.w }}
                                  isInvalid={errors?.reservation_end_date}
                                >
                                  <Input
                                    type="date"
                                    name="reservation_end_date"
                                    {...register("reservation_end_date")}
                                    border="1px"
                                    min={reservationDates.startDate}
                                    borderColor="gray.10"
                                    isDisabled={InputDisableFunction()}
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
                                    placeholder="End date"
                                  />
                                </FormControl>
                              </Box>
                            </Box>
                            {/* --------------  PBPM rate-------------- */}
                            <Box>
                              <Text my={1}>
                                PBPM rate{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Text>{" "}
                              <Box>
                                <FormControl
                                  style={{ w: commonWidth.w }}
                                  isInvalid={errors?.reservation_pbpm_rate}
                                >
                                  <Input
                                    type="number"
                                    name="reservation_pbpm_rate"
                                    step="0.001"
                                    {...register("reservation_pbpm_rate")}
                                    border="1px"
                                    borderColor="gray.10"
                                    isDisabled={InputDisableFunction()}
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
                                    placeholder="PBPM rate"
                                  />
                                </FormControl>
                                {errors && errors?.pbpm_rate?.message && (
                                  <Text textAlign="left" color="red">
                                    {errors?.pbpm_rate?.message}
                                  </Text>
                                )}
                              </Box>
                            </Box>
                            {/* --------------  Reservation rate-------------- */}
                            <Box>
                              <Text my={1}>
                                Reservation rate
                                <span style={{ color: "red" }}>*</span>
                              </Text>{" "}
                              <Box>
                                <FormControl
                                  style={{ w: commonWidth.w }}
                                  isInvalid={errors?.reservation_rate}
                                >
                                  <Input
                                    type="number"
                                    name="reservation_rate"
                                    {...register("reservation_rate")}
                                    step="0.01"
                                    border="1px"
                                    borderColor="gray.10"
                                    backgroundColor={"white"}
                                    height={"15px "}
                                    borderRadius={"lg"}
                                    isDisabled={InputDisableFunction()}
                                    //value={inputValue}
                                    //  onChange={onChange}
                                    _placeholder={commonStyle._placeholder}
                                    _hover={commonStyle._hover}
                                    _focus={commonStyle._focus}
                                    //  isDisabled={true}
                                    p={{ base: "4" }}
                                    fontWeight={{ base: "normal" }}
                                    fontStyle={"normal"}
                                    placeholder="Reservation rate"
                                  />
                                </FormControl>
                                {errors && errors?.rate?.message && (
                                  <Text textAlign="left" color="red">
                                    {errors?.rate?.message}
                                  </Text>
                                )}
                              </Box>
                            </Box>

                            {/* --------------  Billing Cycle-------------- */}
                            <Box>
                              <Text my={1}>
                                Billing Cycle{" "}
                                <span style={{ color: "red" }}>*</span>
                              </Text>{" "}
                              <FormControl
                                style={{ w: commonWidth.w }}
                                // isInvalid={errors?.reservation_billing_cycle}
                              >
                                <ReactSelect
                                  value={
                                    selectedDropDownValue?.selectedReservationBillingCycle
                                  }
                                  onChange={(val) =>
                                    dropDownOnChange(
                                      val,
                                      "selectedReservationBillingCycle",
                                      "reservation_billing_cycle"
                                    )
                                  }
                                  options={reservationBillingCycleOptions}
                                  isDisabled={InputDisableFunction()}
                                  styles={{
                                    control: (base, state) => ({
                                      ...base,
                                      backgroundColor: "#fff",
                                      borderRadius: "6px",
                                      borderColor:
                                        errors?.reservation_billing_cycle
                                          ? "red"
                                          : "#c3c3c3",

                                      padding: "1px",
                                      textAlign: "left",
                                    }),
                                    ...reactSelectStyle,
                                  }}
                                />
                              </FormControl>
                            </Box>
                          </Grid>
                          <Flex
                            gap="10px"
                            justifyContent="end"
                            alignItems="center"
                          >
                            <Button
                              bg="#A6CE39"
                              _hover={{}}
                              color="white"
                              padding="0px 20px"
                              borderRadius={"50px"}
                              type="button"
                              onClick={() => {
                                addUpdateReservation();
                              }}
                            >
                              {isReservationDetailsEditState?.isEdit
                                ? "Update"
                                : "Add"}
                            </Button>
                          </Flex>
                        </Box>
                      </>
                    </Box>
                  </Box>

                  {/* Reservation details table start */}

                  <TableContainer mt="4">
                    <Table variant="simple">
                      <Thead>
                        <Tr style={{ color: "#000" }}>
                          {tableHeaders.map((header, index) => (
                            <Th style={{ color: "#000" }} key={index}>
                              {header}
                            </Th>
                          ))}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {groupedReservationDetails &&
                          Object.keys(groupedReservationDetails).map(
                            (reservationType) =>
                              renderRows(
                                reservationType,
                                groupedReservationDetails[reservationType]
                              )
                          )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {/* <TableContainer mt="4">
                    <Table color="#000">
                      <Thead bg="#dbfff5" border="1px" borderColor="#000">
                        <Tr style={{ color: "#000" }}>
                          <Th color="#000">Sr no</Th>
                          <Th color="#000">Reservation Type</Th>
                          <Th color="#000">Reservation MT</Th>
                          <Th color="#000">Reservation Size</Th>
                          <Th color="#000">Reserved no of bags</Th>

                          <Th color="#000">Start date</Th>
                          <Th color="#000">End date</Th>
                          <Th color="#000">pbpm rate</Th>
                          <Th color="#000">Reservation Rate</Th>
                          <Th color="#000">Billing cycle</Th>

                          <Th color="#000">Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.entries(groupedReservationDetails).map(
                          ([type, data], index) => (
                            <React.Fragment key={index}>
                              <Tr>
                                <Td colSpan="7">{type}</Td>
                              </Tr>
                              {data.map((item, i) => (
                                <Tr key={i}>
                                  <Td></Td>
                                  <Td>{item.reservation_storage_rate_mt}</Td>
                                  <Td>
                                    {item?.reservation_bag_size?.label || "-"}{" "}
                                  </Td>
                                  <Td>{item?.reserved_no_of_bags || "-"} </Td>
                                  <Td>{item.reservation_start_date}</Td>
                                  <Td>{item.reservation_end_date}</Td>
                                  <Td>{item.reservation_pbpm_rate}</Td>
                                  <Td>{item.reservation_rate}</Td>
                                  <Td>
                                    {item.reservation_billing_cycle.label}
                                  </Td>
                                  <Td>
                                    <Box
                                      display="flex"
                                      alignItems="center"
                                      gap="3"
                                    >
                                      <Flex gap="20px" justifyContent="center">
                                        <Box color={"primary.700"}>
                                          <BiEditAlt
                                            // color="#A6CE39"
                                            fontSize="26px"
                                            cursor="pointer"
                                            onClick={() =>
                                              reservationDetailsOnEdit(item, i)
                                            }
                                          />
                                        </Box>
                                        <Box color="red">
                                          <AiOutlineDelete
                                            cursor="pointer"
                                            fontSize="26px"
                                            onClick={() => {
                                              deleteReservationDetails(i);
                                            }}
                                          />
                                        </Box>
                                      </Flex>
                                    </Box>
                                  </Td>
                                </Tr>
                              ))}
                            </React.Fragment>
                          )
                        )}

                        {reservationDetails.length === 0 && (
                          <Tr
                            textAlign="center"
                            bg="white"
                            border="1px"
                            borderColor="#000"
                          >
                            <Td textAlign="center" colSpan={7}>
                              No record found.
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer> */}
                  {/*Reservation details table end */}
                </>
              )}

              {/* If Reservation is select No */}

              {selectedDropDownValue?.selectedReservation?.value === "No" && (
                <>
                  <Grid
                    textAlign="right"
                    alignItems="center"
                    my="3"
                    templateColumns={templateColumns}
                    gap={5}
                  >
                    {/* --------------  Expected quantity(MT) -------------- */}
                    <GridItem colSpan={{ base: 1, lg: 0 }}>
                      <Text textAlign="right">
                        Expected quantity(MT){" "}
                        <span style={{ color: "red" }}>*</span>
                      </Text>{" "}
                    </GridItem>
                    <GridItem colSpan={{ base: 1 }}>
                      <FormControl
                        style={{ w: commonWidth.w }}
                        isInvalid={errors?.expected_quantity}
                      >
                        <Input
                          type="number"
                          step="0.01"
                          name="expected_quantity"
                          {...register("expected_quantity")}
                          border="1px"
                          borderColor="gray.10"
                          backgroundColor={"white"}
                          height={"15px "}
                          borderRadius={"lg"}
                          // value={
                          //   getValues(`rate[${index}]`) ||
                          //   item.rate
                          // }
                          onChange={(e) => {
                            console.log(e.target.value);
                            let num = parseFloat(e.target.value || 0);

                            if (num > 0 || num === 0) {
                              const updatedArr = [...bagWiseRateDetails];
                              // updatedArr[index] = {
                              //   ...item,
                              //   rate: num,
                              // };

                              // setValue(`rate[${index}]`, num, {
                              //   shouldValidate: true,
                              // });
                              // setBagWiseRateDetails([
                              //   ...updatedArr,
                              // ]);
                            } else {
                              // setError(`rate[${index}]`, {
                              //   type: "manual",
                              //   message: "",
                              // });
                            }
                          }}
                          isDisabled={false}
                          _placeholder={commonStyle._placeholder}
                          _hover={commonStyle._hover}
                          _focus={commonStyle._focus}
                          p={{ base: "4" }}
                          fontWeight={{ base: "normal" }}
                          fontStyle={"normal"}
                          placeholder="Expected quantity(MT)"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid
                    textAlign="right"
                    alignItems="center"
                    my="3"
                    templateColumns={templateColumns}
                    gap={5}
                  >
                    {/* --------------  Expected no of bags-------------- */}
                    <GridItem colSpan={{ base: 1, lg: 0 }}>
                      <Text textAlign="right">
                        Expected no of bags{" "}
                        <span style={{ color: "red" }}>*</span>
                      </Text>{" "}
                    </GridItem>
                    <GridItem colSpan={{ base: 1 }}>
                      <FormControl
                        style={{ w: commonWidth.w }}
                        isInvalid={errors?.expected_no_of_bags}
                      >
                        <Input
                          type="number"
                          step="0.01"
                          name="expected_no_of_bags"
                          {...register("expected_no_of_bags")}
                          border="1px"
                          borderColor="gray.10"
                          backgroundColor={"white"}
                          height={"15px "}
                          borderRadius={"lg"}
                          // value={
                          //   getValues(`rate[${index}]`) ||
                          //   item.rate
                          // }
                          onChange={(e) => {
                            console.log(e.target.value);
                            let num = parseFloat(e.target.value || 0);

                            if (num > 0 || num === 0) {
                              const updatedArr = [...bagWiseRateDetails];
                              // updatedArr[index] = {
                              //   ...item,
                              //   rate: num,
                              // };

                              // setValue(`rate[${index}]`, num, {
                              //   shouldValidate: true,
                              // });
                              // setBagWiseRateDetails([
                              //   ...updatedArr,
                              // ]);
                            } else {
                              // setError(`rate[${index}]`, {
                              //   type: "manual",
                              //   message: "",
                              // });
                            }
                          }}
                          isDisabled={false}
                          _placeholder={commonStyle._placeholder}
                          _hover={commonStyle._hover}
                          _focus={commonStyle._focus}
                          p={{ base: "4" }}
                          fontWeight={{ base: "normal" }}
                          fontStyle={"normal"}
                          placeholder="Expected no of bags"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </>
              )}

              {/* Agreement details :  :   */}
              <Grid
                textAlign="right"
                alignItems="center"
                my={3}
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right" color={"#212121"}>
                    Agreement details :
                  </Text>{" "}
                </GridItem>
              </Grid>

              {/* ------SERVICE CONTRACT START DATE------------- */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Service Contract Start Date
                    <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl
                    isInvalid={errors?.service_contract_start_date}
                    style={{ w: commonWidth.w }}
                  >
                    <Input
                      type="date"
                      name="service_contract_start_date"
                      {...register("service_contract_start_date")}
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      isDisabled={InputDisableFunction()}
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
                      placeholder="Service Contract Start Date"
                    />
                  </FormControl>
                </GridItem>
              </Grid>

              {/* ------ SERVICE CONTRACT END DATE------------- */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Service Contract End Date
                    <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FormControl
                    isInvalid={errors?.service_contract_end_date}
                    style={{ w: commonWidth.w }}
                  >
                    <Input
                      type="date"
                      name="service_contract_end_date"
                      {...register("service_contract_end_date")}
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
                      isDisabled={InputDisableFunction()}
                      //  isDisabled={true}
                      p={{ base: "4" }}
                      onChange={(e) => handleEndDateChange(e)}
                      fontWeight={{ base: "normal" }}
                      fontStyle={"normal"}
                      placeholder="Service Contract End Date"
                    />
                  </FormControl>

                  {errors && errors?.service_contract_end_date && (
                    <Box textAlign="left">
                      <Text as="small" color="red.500">
                        {errors?.service_contract_end_date?.message}
                      </Text>
                    </Box>
                  )}
                </GridItem>
              </Grid>

              {/* ------ Upload signed  Service Contract------------- */}
              <Grid
                textAlign="right"
                alignItems="center"
                my="3"
                templateColumns={templateColumns}
                gap={5}
              >
                <GridItem colSpan={{ base: 1, lg: 0 }}>
                  <Text textAlign="right">
                    Upload signed Service Contract
                    <span style={{ color: "red" }}>*</span>
                  </Text>{" "}
                </GridItem>
                <GridItem colSpan={{ base: 1 }}>
                  <FileUploadCmp
                    label=""
                    name="upload_signed_service_contract"
                    fileName={getValues("upload_signed_service_contract")}
                    isError={errors?.upload_signed_service_contract}
                    type="application/pdf, image/jpeg, image/png, image/jpg"
                    placeholder="Choose a file"
                    allowedTypes={[
                      "application/pdf",
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                    ]}
                    isMultipalUpload={false}
                    isDisabled={InputDisableFunction()}
                    //  clearFileName={clearFileName}
                    maxFileSize={1024 * 1024} // For example, 1MB (1024 bytes * 1024 bytes)
                    onChange={(url) =>
                      handleFileChange(url, "upload_signed_service_contract")
                    }
                  />
                </GridItem>
              </Grid>

              <Box>
                {Number(details?.status?.status_code || 0) > 0 ? (
                  <>
                    <Grid
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">
                          Maker name<span style={{ color: "red" }}>*</span>
                        </Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l1_user?.employee_name || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                    <Grid
                      textAlign="right"
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Maker mobile no</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l1_user?.phone || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {Number(details?.status?.status_code || 0) > 2 ? (
                  <>
                    <Grid
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Checker name</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l2_user?.employee_name || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                    <Grid
                      textAlign="right"
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Checker mobile no</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l2_user?.phone || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {Number(details?.status?.status_code || 0) > 5 ? (
                  <>
                    <Grid
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Reviewer name</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l3_user?.employee_name || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                    <Grid
                      textAlign="right"
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Reviewer mobile no</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            disabled={true}
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            value={details?.l3_user?.phone || ""}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {Number(details?.status?.status_code || 0) === 2 ||
                Number(details?.status?.status_code || 0) === 5 ? (
                  <Box>
                    <Grid
                      textAlign="right"
                      alignItems="center"
                      my="3"
                      templateColumns={templateColumns}
                      gap={5}
                    >
                      <GridItem colSpan={{ base: 1, lg: 0 }}>
                        <Text textAlign="right">Reason for rejection</Text>{" "}
                      </GridItem>

                      <GridItem colSpan={{ base: 1 }}>
                        <Box>
                          <Input
                            type="text"
                            border="1px"
                            borderColor="gray.10"
                            backgroundColor={"white"}
                            height={"15px "}
                            borderRadius={"lg"}
                            onChange={(e) => {
                              setRejectReason(e.target.value);
                            }}
                            isDisabled={InputDisableFunction()}
                            // _placeholder={commonStyle._placeholder}
                            // _hover={commonStyle._hover}
                            // _focus={commonStyle._focus}
                            //  isDisabled={true}
                            p={{ base: "4" }}
                            fontWeight={{ base: "normal" }}
                            fontStyle={"normal"}
                            placeholder="Reason for rejection"
                          />
                        </Box>
                      </GridItem>
                    </Grid>
                  </Box>
                ) : (
                  <></>
                )}
              </Box>

              {/* <Flex gap="10px" justifyContent="end" alignItems="center">
                <Button
                  bg="#A6CE39"
                  _hover={{}}
                  color="white"
                  isLoading={
                    addServiceContractDataApiIsLoading ||
                    updateServiceContractDataApiIsLoading
                  }
                  marginTop={"30px"}
                  padding="0px 30px"
                  borderRadius={"50px"}
                  type="submit"
                >
                  Submit
                </Button>
              </Flex> */}
              <Box
                display="flex"
                gap={2}
                justifyContent="flex-end"
                mt="10"
                px="0"
              >
                {Number(details?.status?.status_code || 0) === 1 ||
                Number(details?.status?.status_code || 0) === 3 ? (
                  <Button
                    type="button"
                    backgroundColor={"primary.700"}
                    _hover={{ backgroundColor: "primary.700" }}
                    color={"white"}
                    borderRadius={"full"}
                    isDisabled={pageView}
                    // isDisabled={view}
                    isLoading={updateAssignServiceMasterApiIsLoading}
                    onClick={() => {
                      assignToMeFunction();
                    }}
                    px={"10"}
                  >
                    Assign to me
                  </Button>
                ) : (
                  <></>
                )}
                {Number(details?.status?.status_code || 0) === 2 ||
                Number(details?.status?.status_code || 0) === 5 ? (
                  <>
                    <Button
                      type="button"
                      // type="submit"
                      //w="full"
                      isDisabled={pageView}
                      backgroundColor={"white"}
                      _hover={{ backgroundColor: "white" }}
                      color={"#F82F2F"}
                      borderRadius={"full"}
                      border="1px solid #F82F2F"
                      onClick={() => {
                        rejectedToMeFunction({ status: "rejected" });
                      }}
                      // isDisabled={rejectReason || !view ? false : true}
                      isLoading={updateAssignServiceMasterApiIsLoading}
                      px={"10"}
                    >
                      Reject
                    </Button>
                    <Button
                      type="submit"
                      // onClick={() => {
                      //   ApproveRejectFunction({ status: "approved" });
                      // }}
                      backgroundColor={"primary.700"}
                      _hover={{ backgroundColor: "primary.700" }}
                      color={"white"}
                      isDisabled={pageView}
                      borderRadius={"full"}
                      // isDisabled={view ? true : false}
                      isLoading={
                        updateAssignServiceMasterApiIsLoading ||
                        updateServiceContractDataApiIsLoading
                      }
                      px={"10"}
                    >
                      Approve
                    </Button>
                  </>
                ) : (
                  <></>
                )}
                {Number(details?.status?.status_code || 0) < 1 ? (
                  <Button
                    type="submit"
                    //w="full"
                    isLoading={
                      addServiceContractDataApiIsLoading ||
                      updateServiceContractDataApiIsLoading
                    }
                    isDisabled={pageView}
                    backgroundColor={"primary.700"}
                    _hover={{ backgroundColor: "primary.700" }}
                    color={"white"}
                    borderRadius={"full"}
                    // my={"4"}
                    px={"10"}
                  >
                    Submit
                  </Button>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddEditServiceContractPwh;

const toValidateChamberDetailsSchema = (formData) => {
  const schema = chamberDetailsSchema;

  try {
    schema.validateSync(formData, { abortEarly: false });
  } catch (errors) {
    const validationErrors = {};

    errors.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });

    throw validationErrors;
  }
};

const toValidateContractCommodity_Bag_size_Schema = (formData) => {
  const schema = contractCommodity_Bag_size_Schema;

  try {
    schema.validateSync(formData, { abortEarly: false });
  } catch (errors) {
    console.log("schema validation failed -->", errors);
    const validationErrors = {};

    errors.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });

    throw validationErrors;
  }
};

const toValidateReservationDetailsSchema = (formData) => {
  console.log("form data --> ", formData);
  const schema = validateReservationDetailsFormData(formData);

  try {
    schema.validateSync(formData, { abortEarly: false });
  } catch (errors) {
    const validationErrors = {};

    errors.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });

    throw validationErrors;
  }
};

// const toasterAlert = (obj) => {
//   if (!obj) {
//     console.error("Invalid input object: ", obj);
//     return;
//   }
//   console.log(obj);
//   const { status, message, data } = obj?.data;

//   if (status && message) {
//     showToastByStatusCode(status, message);
//   } else {
//     console.error("Invalid status or message:", status, message);
//   }

//   if (data && typeof data === "object") {
//     const errorMessages = [];

//     for (const key in data) {
//       if (data.hasOwnProperty(key) && Array.isArray(data[key])) {
//         data[key].forEach((message) => {
//           errorMessages.push(`${key} : ${message}`);
//         });
//       }
//     }

//     if (errorMessages.length > 0) {
//       showToastByStatusCode(status || 400, errorMessages.join("\n"));
//     }
//   }
// };

function validateBagWiseRateDetailsFormData(formData) {
  const validationSchema = yup.object().shape({
    bag_size: yup
      .object()
      .shape({
        label: yup.string().required(() => null),
        value: yup.string().required(() => null),
      })
      .required(() => null),
    pbpm_rate: yup
      .number()
      .typeError("")
      .required(() => null),
    rate: yup
      .number()
      .typeError("")
      .required(() => null),
  });

  try {
    return validationSchema.validateSync(formData, { abortEarly: false });
  } catch (errors) {
    const validationErrors = {};

    errors.inner.forEach((error) => {
      validationErrors[error.path] = error?.message;
    });

    throw validationErrors;
  }
}

function validateReservationDetailsFormData(formData) {
  console.log(formData);
  const validationSchema = yup.object().shape({
    reservation_type: yup
      .object()
      .shape({
        label: yup.string().required(() => null),
        value: yup.string().required(() => null),
      })
      .required(() => null),

    // reservation_storage_rate_mt: yup
    //   .string()
    //   .when(["reservation_type", "storage_rate_on"], {
    //     is: (reservation_type, storage_rate_on) => {
    //       console.log("reservation_type --> ", reservation_type);
    //       console.log("storage_rate_on --> ", storage_rate_on);
    //       return (
    //         reservation_type?.value === "Reservation"
    //       );
    //     },
    //     then: () => yup.number().typeError(""), // not required
    //     otherwise: () => {
    //       return yup
    //         .number()
    //         .positive("Reservation MT must be a positive number")
    //         .integer("Reservation MT must be an integer")
    //         .required("Reservation MT is required");
    //     },
    //   }),

    // reservation_bag_size: yup.string().when("reservation_type", {
    //   is: (value) => value?.value === "Post Reservation",
    //   then: () =>
    //     yup.object().shape({
    //       label: yup.string().required(() => null),
    //       value: yup.string().required(() => null),
    //     }),
    //   otherwise: () =>
    //     yup
    //       .object()
    //       .shape({
    //         label: yup.string().required(() => null),
    //         value: yup.string().required(() => null),
    //       })
    //       .required(() => null),
    // }),

    // reserved_no_of_bags: yup.string().when("reservation_type", {
    //   is: (value) => value?.value === "Post Reservation",
    //   then: () => yup.number().nullable(),
    //   otherwise: () =>
    //     yup
    //       .number()
    //       .typeError("")
    //       .required(() => null),
    // }),

    reservation_start_date: yup
      .date()
      .typeError("Start date must be a valid date")
      .required(() => null),
    reservation_end_date: yup
      .date()
      .typeError("End date must be a valid date")
      .required(() => null),

    reservation_pbpm_rate: yup
      .number()
      .positive("PBPM rate must be a positive number")
      .typeError()
      .required(() => null),

    reservation_rate: yup
      .number()
      .positive("Storage rate must be a positive number")
      .typeError("")
      .required(() => null),

    reservation_billing_cycle: yup
      .object()
      .shape({
        label: yup.string().required(() => null),
        value: yup.string().required(() => null),
      })
      .required(() => null),
  });

  try {
    return validationSchema.validateSync(formData, { abortEarly: false });
  } catch (errors) {
    const validationErrors = {};

    errors.inner.forEach((error) => {
      validationErrors[error.path] = error.message;
    });

    throw validationErrors;
  }
}

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

// ==================================================

// import React, { useState } from "react";

// const AddEditReservation = ({ isReservationDetailsEditState }) => {
//   const { index, isEdit } = isReservationDetailsEditState;

//   const [groupReservationDetails, setGroupReservationDetails] = useState({
//     Reservation: [
//       // ...existing reservation data
//     ],
//     "Post Reservation": [
//       // ...existing post-reservation data
//     ],
//   });

//   const initialReservation = {
//     reservation_type: { label: "Reservation", value: "Reservation" },
//     reservation_start_date: "",
//     reservation_end_date: "",
//     reservation_pbpm_rate: 0,
//     reservation_rate: 0,
//     reservation_billing_cycle: { value: "Monthly", label: "Monthly" },
//     reservation_storage_rate_mt: "",
//     reservation_bag_size: { label: 30, value: 113 },
//     reserved_no_of_bags: "",
//   };

//   const [formData, setFormData] = useState({ ...initialReservation });

//   const handleEditClick = (group, reservationIndex) => {
//     const selectedReservation = groupReservationDetails[group][reservationIndex];
//     setFormData({ ...selectedReservation });
//   };

//   const handleSave = (group, reservationIndex) => {
//     const updatedGroupDetails = { ...groupReservationDetails };
//     if (isEdit) {
//       updatedGroupDetails[group][reservationIndex] = formData; // Editing existing reservation
//     } else {
//       updatedGroupDetails[group].push(formData); // Adding a new reservation
//     }
//     setGroupReservationDetails(updatedGroupDetails);
//     setFormData({ ...initialReservation }); // Reset formData
//   };

//   const handleCancel = () => {
//     setFormData({ ...initialReservation }); // Reset formData
//   };

//   return (
//     <div>
//       <h2>{isEdit ? "Edit Reservation" : "Add Reservation"}</h2>
//       <form>
//         {/* Add input fields to edit or add reservation data */}
//         <button onClick={() => handleSave(group, index)}>
//           {isEdit ? "Save" : "Add"}
//         </button>
//         <button onClick={handleCancel}>Cancel</button>
//       </form>

//       {/* Display the list of reservations */}
//       {Object.keys(groupReservationDetails).map((group) => (
//         <div key={group}>
//           <h2>{group}</h2>
//           <ul>
//             {groupReservationDetails[group].map((reservation, reservationIndex) => (
//               <li key={reservationIndex}>
//                 {reservation.reservation_type.label}
//                 <button onClick={() => handleEditClick(group, reservationIndex)}>Edit</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AddEditReservation;
