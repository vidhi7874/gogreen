import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";
import { useAddInspectionMasterMutation } from "../../features/master-api-slice";

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

const DacoitProne = [
  { label: "Peaceful", value: "Peaceful" },
  { label: "Disturb", value: "Disturb" },
];

const IntegrityOfPeople = [
  { label: "Good", value: "Good" },
  { label: "Average", value: "Average" },
  { label: "Bad", value: "Bad" },
];

const floorTypeOptions = [
  { label: "Cemented ", value: "Cemented" },
  { label: "Bricks ", value: "Bricks" },
  { label: "Cota-Stone", value: "Cota-Stone" },
  { label: "Kachcha", value: "Kachcha" },
  { label: "Other", value: "Other" },
];

const shutterTypeOptions = [
  { label: " Rolling Shutters", value: "Rolling" },
  { label: "Iron Door", value: "Iron" },
  { label: "Sliding Door", value: "Sliding" },
  { label: "Wooden Door", value: "Wooden" },
];

const roofTypeOptions = [
  { label: "Cemented", value: "Cemented" },
  { label: "Tin Sheet", value: "Tin" },
  { label: "Cemented Sheet", value: "Cemented Sheet" },
  { label: "Other", value: "Other" },
];

const wallTypeOptions = [
  { label: "Cemented", value: "Cemented" },
  { label: "Tin Sheet", value: "Tin" },
  { label: "Other", value: "Other" },
];

const roadTypeOptions = [
  { label: " Kachcha", value: "Kachcha" },
  { label: "Pakka", value: "Pakka" },
];

const dunnageTypeOptions = [
  { label: " Polythene", value: "Polythene" },
  { label: " Plastic", value: "Plastic" },
  { label: "Other", value: "Other" },
];

const OtherDetails = ({
  mainFormsMethod,
  other_details_form_schema,
  saveFunction,
}) => {
  let { register, setValue, getValues, watch, handleSubmit, setError, errors } =
    mainFormsMethod;

  const toasterAlert = (obj) => {
    let msg = obj?.message;
    let status = obj?.status;
    console.log("toasterAlert", obj);
    if (status === 400) {
      const errorData = obj?.data || obj?.data?.data;
      let errorMessage = "";

      Object.keys(errorData)?.forEach((key) => {
        const messages = errorData[key];
        console.log("messages --> ", messages);
        if (typeof messages === "object") {
          messages &&
            messages?.forEach((message) => {
              errorMessage += `${key} : ${message} \n`;
            });
        } else {
          showToastByStatusCode(status, msg);
        }
      });
      showToastByStatusCode(status, errorMessage);
      return false;
    } else if (status === 410) {
      showToastByStatusCode(status, msg);
    }
    showToastByStatusCode(status, msg);
  };

  const [AddInspectionMaster, { isLoading: addInspectionMasterApiIsLoading }] =
    useAddInspectionMasterMutation();

  const saveAsDraftFunction = async () => {
    const data = {
      id: getValues("id"),
      is_draft: true,
      other_details: {
        [other_details_form_schema?.dacroit_prone]: getValues(
          other_details_form_schema?.dacroit_prone
        ),
        [other_details_form_schema?.riots_prone]: getValues(
          other_details_form_schema?.riots_prone
        ),
        [other_details_form_schema?.earthquake_prone]: getValues(
          other_details_form_schema?.earthquake_prone
        ),
        [other_details_form_schema?.flood_prone]: getValues(
          other_details_form_schema?.flood_prone
        ),
        [other_details_form_schema?.main_center_distance]:
          getValues(other_details_form_schema?.main_center_distance) === null ||
          getValues(other_details_form_schema?.main_center_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.main_center_distance),
        [other_details_form_schema?.police_station_distance]:
          getValues(other_details_form_schema?.police_station_distance) ===
            null ||
          getValues(other_details_form_schema?.police_station_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.police_station_distance),
        [other_details_form_schema?.fire_station_distance]:
          getValues(other_details_form_schema?.fire_station_distance) ===
            null ||
          getValues(other_details_form_schema?.fire_station_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.fire_station_distance),
        [other_details_form_schema?.mandi_distance]:
          getValues(other_details_form_schema?.mandi_distance) === null ||
          getValues(other_details_form_schema?.mandi_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.mandi_distance),
        [other_details_form_schema?.goodshed_distance]:
          getValues(other_details_form_schema?.goodshed_distance) === null ||
          getValues(other_details_form_schema?.goodshed_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.goodshed_distance),
        [other_details_form_schema?.fire_extinguishers]: getValues(
          other_details_form_schema?.fire_extinguishers
        ),
        [other_details_form_schema?.fire_extinguisher_count]:
          getValues(other_details_form_schema?.fire_extinguisher_count) ===
            null ||
          getValues(other_details_form_schema?.fire_extinguisher_count) === ""
            ? 0
            : getValues(other_details_form_schema?.fire_extinguisher_count),
        [other_details_form_schema?.fire_buckets]: getValues(
          other_details_form_schema?.fire_buckets
        ),
        [other_details_form_schema?.fire_bucket_count]:
          getValues(other_details_form_schema?.fire_bucket_count) === null ||
          getValues(other_details_form_schema?.fire_bucket_count) === ""
            ? 0
            : getValues(other_details_form_schema?.fire_bucket_count),
        [other_details_form_schema?.other_equipment]: getValues(
          other_details_form_schema?.other_equipment
        ),
        [other_details_form_schema?.other_equipment_count]:
          getValues(other_details_form_schema?.other_equipment_count) ===
            null ||
          getValues(other_details_form_schema?.other_equipment_count) === ""
            ? 0
            : getValues(other_details_form_schema?.other_equipment_count),
        [other_details_form_schema?.other_equipment_remarks]: getValues(
          other_details_form_schema?.other_equipment_remarks
        ),
        [other_details_form_schema?.storage_worthy]: getValues(
          other_details_form_schema?.storage_worthy
        ),
        [other_details_form_schema?.floor_type]: getValues(
          other_details_form_schema?.floor_type
        ),
        [other_details_form_schema?.floor_remarks]: getValues(
          other_details_form_schema?.floor_remarks
        ),
        [other_details_form_schema?.shutters]: getValues(
          other_details_form_schema?.shutters
        ),
        [other_details_form_schema?.shutter_door_count]:
          getValues(other_details_form_schema?.shutter_door_count) === null ||
          getValues(other_details_form_schema?.shutter_door_count) === ""
            ? 0
            : getValues(other_details_form_schema?.shutter_door_count) ===
                null ||
              getValues(other_details_form_schema?.shutter_door_count) === ""
            ? 0
            : getValues(other_details_form_schema?.shutter_door_count),
        [other_details_form_schema?.roof_type]: getValues(
          other_details_form_schema?.roof_type
        ),
        [other_details_form_schema?.other_roof_remarks]: getValues(
          other_details_form_schema?.other_roof_remarks
        ),
        [other_details_form_schema?.air_roof_fan_available]: getValues(
          other_details_form_schema?.air_roof_fan_available
        ),
        [other_details_form_schema?.air_roof_count]:
          getValues(other_details_form_schema?.air_roof_count) === null ||
          getValues(other_details_form_schema?.air_roof_count) === ""
            ? 0
            : getValues(other_details_form_schema?.air_roof_count),
        [other_details_form_schema?.wall_type]: getValues(
          other_details_form_schema?.wall_type
        ),
        [other_details_form_schema?.other_wall_remarks]: getValues(
          other_details_form_schema?.other_wall_remarks
        ),
        [other_details_form_schema?.plinth_height]:
          getValues(other_details_form_schema?.plinth_height) === null ||
          getValues(other_details_form_schema?.plinth_height) === ""
            ? 0
            : getValues(other_details_form_schema?.plinth_height),
        [other_details_form_schema?.approach_road_type]: getValues(
          other_details_form_schema?.approach_road_type
        ),
        [other_details_form_schema?.ventilators]: getValues(
          other_details_form_schema?.ventilators
        ),
        [other_details_form_schema?.ventilators_count]: getValues(
          other_details_form_schema?.ventilators_count
        ),
        [other_details_form_schema?.window]: getValues(
          other_details_form_schema?.window
        ),
        [other_details_form_schema?.window_count]:
          getValues(other_details_form_schema?.goodshed_distance) === null ||
          getValues(other_details_form_schema?.goodshed_distance) === ""
            ? 0
            : getValues(other_details_form_schema?.window_count),
        [other_details_form_schema?.gate]: getValues(
          other_details_form_schema?.gate
        ),
        [other_details_form_schema?.gate_count]:
          getValues(other_details_form_schema?.gate_count) === null ||
          getValues(other_details_form_schema?.gate_count) === ""
            ? 0
            : getValues(other_details_form_schema?.gate_count),
        [other_details_form_schema?.fencing]: getValues(
          other_details_form_schema?.fencing
        ),
        [other_details_form_schema?.compoundwall]: getValues(
          other_details_form_schema?.compoundwall
        ),
        [other_details_form_schema?.drainage]: getValues(
          other_details_form_schema?.drainage
        ),
        [other_details_form_schema?.water]: getValues(
          other_details_form_schema?.water
        ),
        [other_details_form_schema?.electricity]: getValues(
          other_details_form_schema?.electricity
        ),
        [other_details_form_schema?.live_wires_in_wh]: getValues(
          other_details_form_schema?.live_wires_in_wh
        ),
        [other_details_form_schema?.telephone_facility]: getValues(
          other_details_form_schema?.telephone_facility
        ),
        [other_details_form_schema?.telephone_no]: getValues(
          other_details_form_schema?.telephone_no
        ),
        [other_details_form_schema?.dunnage]: getValues(
          other_details_form_schema?.dunnage
        ),
        [other_details_form_schema?.dunnage_type]: getValues(
          other_details_form_schema?.dunnage_type
        ),
        [other_details_form_schema?.other_dunnage_remarks]: getValues(
          other_details_form_schema?.other_dunnage_remarks
        ),
        [other_details_form_schema?.people_integrity_in_area]: getValues(
          other_details_form_schema?.people_integrity_in_area
        ),
        [other_details_form_schema?.theft_incidence_in_three_years]: getValues(
          other_details_form_schema?.theft_incidence_in_three_years
        ),
        [other_details_form_schema?.theft_remarks]: getValues(
          other_details_form_schema?.theft_remarks
        ),
        [other_details_form_schema?.damanget_incidence_in_three_years]:
          getValues(
            other_details_form_schema?.damanget_incidence_in_three_years
          ),
        [other_details_form_schema?.damage_remarks]: getValues(
          other_details_form_schema?.damage_remarks
        ),
        [other_details_form_schema?.flood_incidence_in_three_years]: getValues(
          other_details_form_schema?.flood_incidence_in_three_years
        ),
        [other_details_form_schema?.flood_remarks]: getValues(
          other_details_form_schema?.flood_remarks
        ),
      },
    };

    try {
      const response = await AddInspectionMaster(data).unwrap();
      console.log("saveAsDraftData - Success:", response);
      if (response.status === 200) {
        console.log("response --> ", response);
        toasterAlert({
          message: "Form Inspection Drafted Successfully.",
          status: 200,
        });
        FillFormData(response?.data);
      }
    } catch (error) {
      let errorMessage =
        error?.data?.data || error?.data?.message || "Save As Daft Failed";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
      console.error("Error:", error);
    }

    console.log(data, "data");
  };

  function FillFormData() {}
  console.log("error sub details", errors);

  return (
    <Box>
      <Box
        w={{
          base: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        }}
      >
        {/* -------------- Dacoit prone------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  Dacoit prone -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Dacoit prone
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                options={DacoitProne || []}
                isDisabled={getValues("form_edit")}
                value={
                  DacoitProne?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.dacroit_prone)
                  )[0] || null
                }
                {...register(other_details_form_schema?.dacroit_prone)}
                onChange={(val) => {
                  setValue(
                    other_details_form_schema.dacroit_prone,
                    val?.value,
                    {
                      shouldValidate: true,
                    }
                  );
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[
                      other_details_form_schema.dacroit_prone
                    ]?.message
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

        {/* -------------- Riots prone------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Riots prone
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.riots_prone]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.riots_prone) || "false"
                  }
                  name={other_details_form_schema.riots_prone}
                  onChange={(e) => {
                    setValue(other_details_form_schema.riots_prone, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Earthquake prone------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Earthquake prone
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.earthquake_prone]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.earthquake_prone) ||
                    "false"
                  }
                  name={other_details_form_schema.earthquake_prone}
                  onChange={(e) => {
                    setValue(other_details_form_schema.earthquake_prone, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Flood prone radio button------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Flood prone
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.flood_prone]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.flood_prone) || "false"
                  }
                  name={other_details_form_schema.flood_prone}
                  onChange={(e) => {
                    setValue(other_details_form_schema.flood_prone, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Distance of warehouse from main center ( Village/Town) (KM)------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Distance of warehouse from main center ( Village/Town) (KM)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.main_center_distance]
                  ?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.main_center_distance)}
                border="1px"
                step={0.01}
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Distance of warehouse from Police Station(KM) ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Distance of warehouse from Police Station(KM)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.police_station_distance]
                  ?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.police_station_distance)}
                border="1px"
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
                backgroundColor={"white"}
                height={"15px "}
                step={0.01}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Distance of warehouse from Fire station(KM) ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Distance of warehouse from Fire station(KM)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.fire_station_distance]
                  ?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.fire_station_distance)}
                border="1px"
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
                step={0.01}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Distance of warehouse from Mandi (Km) ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Distance of warehouse from Mandi (Km)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.mandi_distance]?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.mandi_distance)}
                border="1px"
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
                backgroundColor={"white"}
                step={0.01}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Distance of warehouse from Goodshed (km.) ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Distance of warehouse from Goodshed (km.)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.goodshed_distance]?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.goodshed_distance)}
                border="1px"
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
                backgroundColor={"white"}
                step={0.01}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Fire extinguishers radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Fire extinguishers
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.fire_extinguishers]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.fire_extinguishers) ||
                    "false"
                  }
                  name={other_details_form_schema.fire_extinguishers}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(
                        other_details_form_schema.fire_extinguisher_count,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                    setValue(other_details_form_schema.fire_extinguishers, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.fire_extinguishers) === "true" ? (
          <>
            {/* -------------- Count of fire extinguisher ------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Count of fire extinguisher</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.fire_extinguisher_count]
                      ?.message
                  }
                >
                  <Input
                    type="number"
                    {...register(
                      other_details_form_schema.fire_extinguisher_count
                    )}
                    border="1px"
                    borderColor="gray.10"
                    isDisabled={getValues("form_edit")}
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
                    placeholder=""
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Fire buckets------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Fire buckets
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.fire_buckets]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.fire_buckets) || "false"
                  }
                  name={other_details_form_schema.fire_buckets}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(
                        other_details_form_schema.fire_bucket_count,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                    setValue(other_details_form_schema.fire_buckets, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.fire_buckets) === "true" ? (
          <>
            {/* -------------- Count of fire buckets ------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Count of fire buckets</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.fire_bucket_count]
                      ?.message
                  }
                >
                  <Input
                    type="number"
                    {...register(other_details_form_schema.fire_bucket_count)}
                    border="1px"
                    borderColor="gray.10"
                    isDisabled={getValues("form_edit")}
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
                    placeholder=""
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Other equipment------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Other equipment
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.other_equipment]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.other_equipment) ||
                    "false"
                  }
                  name={other_details_form_schema.other_equipment}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(
                        other_details_form_schema.other_equipment_count,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                    setValue(other_details_form_schema.other_equipment, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.other_equipment) === "true" ? (
          <>
            {/* -------------- Count of Other equipment ------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Count of Other equipment</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.other_equipment_count]
                      ?.message
                  }
                >
                  <Input
                    type="number"
                    {...register(
                      other_details_form_schema.other_equipment_count
                    )}
                    border="1px"
                    borderColor="gray.10"
                    isDisabled={getValues("form_edit")}
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
                    placeholder=""
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Remark ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">Remark</Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.other_equipment_remarks]
                  ?.message
              }
            >
              <Input
                type="number"
                {...register(other_details_form_schema.other_equipment_remarks)}
                border="1px"
                borderColor="gray.10"
                isDisabled={getValues("form_edit")}
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
                placeholder=""
              />
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Storage worthy radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Storage worthy{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.storage_worthy]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.storage_worthy) ||
                    "false"
                  }
                  name={other_details_form_schema.storage_worthy}
                  onChange={(e) => {
                    setValue(other_details_form_schema.storage_worthy, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Floor type select box------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Floor type
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={floorTypeOptions || []}
                value={
                  floorTypeOptions?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.floor_type)
                  )[0] || null
                }
                {...register(other_details_form_schema?.floor_type)}
                onChange={(val) => {
                  setValue(other_details_form_schema.floor_type, val?.value, {
                    shouldValidate: true,
                  });
                  setValue(other_details_form_schema.floor_remarks, null, {
                    shouldValidate: true,
                  });
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[other_details_form_schema?.floor_type]
                      ?.message
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

        {getValues(other_details_form_schema.floor_type) === "Other" ? (
          <>
            {/* -------------- remark------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              {/* --------------  remark -------------- */}
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                <Text textAlign="right">remark</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.floor_remarks]?.message
                  }
                >
                  <Box>
                    <Input
                      type="text"
                      {...register(other_details_form_schema.floor_remarks)}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder="remark"
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- shutters select box------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Shutters
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={shutterTypeOptions || []}
                value={
                  shutterTypeOptions?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.shutters)
                  )[0] || null
                }
                {...register(other_details_form_schema?.shutters)}
                onChange={(val) => {
                  setValue(other_details_form_schema.shutters, val?.value, {
                    shouldValidate: true,
                  });
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[other_details_form_schema?.shutters]
                      ?.message
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

        {/* -------------- Shutter / Door Count number------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  remark -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Shutter / Door Count
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.shutter_door_count]?.message
              }
            >
              <Box>
                <Input
                  type="text"
                  {...register(other_details_form_schema.shutter_door_count)}
                  border="1px"
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder=""
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Roof select box------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Roof
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={roofTypeOptions || []}
                value={
                  roofTypeOptions?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.roof_type)
                  )[0] || null
                }
                {...register(other_details_form_schema?.roof_type)}
                onChange={(val) => {
                  setValue(other_details_form_schema.roof_type, val?.value, {
                    shouldValidate: true,
                  });
                  setValue(other_details_form_schema.other_roof_remarks, null, {
                    shouldValidate: true,
                  });
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[other_details_form_schema?.roof_type]
                      ?.message
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

        {getValues(other_details_form_schema.roof_type) === "Other" ? (
          <>
            {/* -------------- remark------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              {/* --------------  remark -------------- */}
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                <Text textAlign="right">remark</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.other_roof_remarks]
                      ?.message
                  }
                >
                  <Box>
                    <Input
                      type="text"
                      {...register(
                        other_details_form_schema.other_roof_remarks
                      )}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder="remark"
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Air roof_type FAN available radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Air roof_type FAN available
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.air_roof_fan_available]
                  ?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(
                      other_details_form_schema.air_roof_fan_available
                    ) || "false"
                  }
                  name={other_details_form_schema.air_roof_fan_available}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(other_details_form_schema.air_roof_count, null, {
                        shouldValidate: true,
                      });
                    }
                    setValue(
                      other_details_form_schema.air_roof_fan_available,
                      e,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.air_roof_fan_available) ===
        "true" ? (
          <>
            {/* -------------- Air roof_type count number------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              {/* --------------  remark -------------- */}
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Air roof_type count</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.air_roof_count]?.message
                  }
                >
                  <Box>
                    <Input
                      type="number"
                      {...register(other_details_form_schema.air_roof_count)}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder=""
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Walls select box------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Walls
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={wallTypeOptions || []}
                value={
                  wallTypeOptions?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.wall_type)
                  )[0] || null
                }
                {...register(other_details_form_schema?.wall_type)}
                onChange={(val) => {
                  setValue(other_details_form_schema.wall_type, val?.value, {
                    shouldValidate: true,
                  });
                  setValue(other_details_form_schema.other_wall_remarks, null, {
                    shouldValidate: true,
                  });
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[other_details_form_schema?.wall_type]
                      ?.message
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

        {getValues(other_details_form_schema.wall_type) === "Other" ? (
          <>
            {/* -------------- remark------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              {/* --------------  remark -------------- */}
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                <Text textAlign="right">remark</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.other_wall_remarks]
                      ?.message
                  }
                >
                  <Box>
                    <Input
                      type="text"
                      {...register(
                        other_details_form_schema.other_wall_remarks
                      )}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder="remark"
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Plinth Height (ft) number ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Plinth Height (ft)
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.plinth_height]?.message
              }
            >
              <Box>
                <Input
                  type="number"
                  {...register(other_details_form_schema.plinth_height)}
                  border="1px"
                  step={0.01}
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder="Plinth Height (ft)"
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Approach Road select box ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Approach Road
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>
          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={roadTypeOptions || []}
                value={
                  roadTypeOptions?.filter(
                    (item) =>
                      item.value ===
                      getValues(other_details_form_schema.approach_road_type)
                  )[0] || null
                }
                {...register(other_details_form_schema?.approach_road_type)}
                onChange={(val) => {
                  setValue(
                    other_details_form_schema.approach_road_type,
                    val?.value,
                    {
                      shouldValidate: true,
                    }
                  );
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[
                      other_details_form_schema?.approach_road_type
                    ]?.message
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

        {/* -------------- Ventilators radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Ventilators{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.ventilators]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  defaultValue={"false"}
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.ventilators) || "false"
                  }
                  name={other_details_form_schema.ventilators}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(
                        other_details_form_schema.ventilators_count,
                        null,
                        {
                          shouldValidate: true,
                        }
                      );
                    }
                    setValue(other_details_form_schema.ventilators, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.ventilators) === "true" ? (
          <>
            {/* -------------- Ventilators count number------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              {/* --------------  remark -------------- */}
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Ventilators count</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.ventilators_count]
                      ?.message
                  }
                >
                  <Box>
                    <Input
                      type="number"
                      {...register(other_details_form_schema.ventilators_count)}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder=""
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Window radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Window
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>{" "}
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.window]?.message}
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={getValues(other_details_form_schema.window) || "false"}
                  name={other_details_form_schema.window}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(other_details_form_schema.window_count, null, {
                        shouldValidate: true,
                      });
                    }
                    setValue(other_details_form_schema.window, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.window) === "true" ? (
          <>
            {/* -------------- Windows count number------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Windows count</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.window_count]?.message
                  }
                >
                  <Box>
                    <Input
                      type="number"
                      {...register(other_details_form_schema.window_count)}
                      border="1px"
                      borderColor="gray.10"
                      backgroundColor={"white"}
                      height={"15px "}
                      isDisabled={getValues("form_edit")}
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
                      placeholder=""
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Gate radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Gate
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>{" "}
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.gate]?.message}
            >
              <Box>
                <RadioGroup
                  p="0"
                  value={getValues(other_details_form_schema.gate) || "false"}
                  isDisabled={getValues("form_edit")}
                  name={other_details_form_schema.gate}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(other_details_form_schema.gate_count, null, {
                        shouldValidate: true,
                      });
                    }
                    setValue(other_details_form_schema.gate, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.gate) === "true" ? (
          <>
            {/* -------------- Gate count number------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                {" "}
                <Text textAlign="right">Gate count</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.gate_count]?.message
                  }
                >
                  <Box>
                    <Input
                      type="number"
                      {...register(other_details_form_schema.gate_count)}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
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
                      placeholder=""
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Fencing radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Fencing{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.fencing]?.message}
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.fencing) || "false"
                  }
                  name={other_details_form_schema.fencing}
                  onChange={(e) => {
                    setValue(other_details_form_schema.fencing, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Compound wall radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Compound wall
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>{" "}
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.compoundwall]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.compoundwall) || "false"
                  }
                  name={other_details_form_schema.compoundwall}
                  onChange={(e) => {
                    setValue(other_details_form_schema.compoundwall, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Drainage radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Drainage
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>{" "}
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.drainage]?.message}
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.drainage) || "false"
                  }
                  name={other_details_form_schema.drainage}
                  onChange={(e) => {
                    setValue(other_details_form_schema.drainage, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Water radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Water{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.water]?.message}
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={getValues(other_details_form_schema.water) || "false"}
                  name={other_details_form_schema.water}
                  onChange={(e) => {
                    setValue(other_details_form_schema.water, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Electricity radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Electricity{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.electricity]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(other_details_form_schema.electricity) || "false"
                  }
                  name={other_details_form_schema.electricity}
                  onChange={(e) => {
                    setValue(other_details_form_schema.electricity, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- live wires inside the Warehouse  radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              live wires inside the Warehouse
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>{" "}
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.live_wires_in_wh]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(other_details_form_schema.live_wires_in_wh) ||
                    "false"
                  }
                  name={other_details_form_schema.live_wires_in_wh}
                  onChange={(e) => {
                    setValue(other_details_form_schema.live_wires_in_wh, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- Telephone  radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Telephone{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.telephone_facility]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  value={
                    getValues(other_details_form_schema.telephone_facility) ||
                    "false"
                  }
                  isDisabled={getValues("form_edit")}
                  name={other_details_form_schema.telephone_facility}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(other_details_form_schema.telephone_no, null, {
                        shouldValidate: true,
                      });
                    }
                    setValue(other_details_form_schema.telephone_facility, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.telephone_facility) === "true" ? (
          <>
            {/* -------------- Telephone No number------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                <Text textAlign="right">Telephone No</Text>{" "}
              </GridItem>

              <GridItem colSpan={{ base: 1 }}>
                <FormControl
                  style={{ w: commonWidth.w }}
                  isInvalid={
                    errors?.[other_details_form_schema.telephone_no]?.message
                  }
                >
                  <Box>
                    <Input
                      type="text"
                      // {...register(other_details_form_schema.telephone_no)}
                      border="1px"
                      borderColor="gray.10"
                      isDisabled={getValues("form_edit")}
                      backgroundColor={"white"}
                      height={"15px "}
                      value={
                        getValues(
                          other_details_form_schema.telephone_no
                        )?.split("+91")[1]
                          ? Number(
                              getValues(
                                other_details_form_schema.telephone_no
                              )?.split("+91")[1] || ""
                            )
                          : ""
                      }
                      onChange={(e) => {
                        setValue(
                          other_details_form_schema.telephone_no,
                          "+91" + e.target.value,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
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
                      placeholder=""
                    />
                  </Box>
                </FormControl>
              </GridItem>
            </Grid>
          </>
        ) : (
          <></>
        )}

        {/* -------------- Dunnage  radio ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            {" "}
            <Text textAlign="right">
              Dunnage{" "}
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={errors?.[other_details_form_schema.dunnage]?.message}
            >
              <Box>
                <RadioGroup
                  p="0"
                  value={
                    getValues(other_details_form_schema.dunnage) || "false"
                  }
                  isDisabled={getValues("form_edit")}
                  name={other_details_form_schema.dunnage}
                  onChange={(e) => {
                    if (e === "false") {
                      setValue(other_details_form_schema.dunnage_type, null, {
                        shouldValidate: true,
                      });
                    }
                    setValue(other_details_form_schema.dunnage, e, {
                      shouldValidate: true,
                    });
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues(other_details_form_schema.dunnage) === "true" ? (
          <>
            {/* -------------- Dunnage Material select box ------------- */}
            <Grid
              textAlign="right"
              alignItems="center"
              my="3"
              templateColumns={templateColumns}
              gap={5}
            >
              <GridItem colSpan={{ base: 1, lg: 0 }}>
                <Text textAlign="right">Dunnage Material</Text>{" "}
              </GridItem>
              <GridItem colSpan={{ base: 1 }}>
                <FormControl style={{ w: commonWidth.w }}>
                  <ReactSelect
                    isDisabled={getValues("form_edit")}
                    options={dunnageTypeOptions || []}
                    value={
                      dunnageTypeOptions?.filter(
                        (item) =>
                          item.value ===
                          getValues(other_details_form_schema.dunnage_type)
                      )[0] || null
                    }
                    {...register(other_details_form_schema?.dunnage_type)}
                    onChange={(val) => {
                      setValue(
                        other_details_form_schema.dunnage_type,
                        val?.value,
                        {
                          shouldValidate: true,
                        }
                      );
                    }}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: "#fff",
                        borderRadius: "6px",
                        borderColor: errors?.[
                          other_details_form_schema?.dunnage_type
                        ]?.message
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
          </>
        ) : (
          <></>
        )}

        {/* -------------- remark------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  remark -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">remark</Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.other_dunnage_remarks]
                  ?.message
              }
            >
              <Box>
                <Input
                  type="text"
                  {...register(other_details_form_schema.other_dunnage_remarks)}
                  border="1px"
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder="remark"
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- General Integrity of people in the area ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  General Integrity of people in the area  -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              General Integrity of people in the area{" "}
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

          <GridItem colSpan={{ base: 1 }}>
            <FormControl style={{ w: commonWidth.w }}>
              <ReactSelect
                isDisabled={getValues("form_edit")}
                options={IntegrityOfPeople || []}
                value={
                  IntegrityOfPeople?.filter(
                    (item) =>
                      item.value ===
                      getValues(
                        other_details_form_schema.people_integrity_in_area
                      )
                  )[0] || null
                }
                {...register(
                  other_details_form_schema?.people_integrity_in_area
                )}
                onChange={(val) => {
                  setValue(
                    other_details_form_schema.people_integrity_in_area,
                    val?.value,
                    {
                      shouldValidate: true,
                    }
                  );
                }}
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    borderColor: errors?.[
                      other_details_form_schema?.people_integrity_in_area
                    ]?.message
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

        {/* -------------- theft_incidence_in_three_years ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  theft_incidence_in_three_years -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Incidence of theft during last 3 years
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[
                  other_details_form_schema.theft_incidence_in_three_years
                ]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(
                      other_details_form_schema.theft_incidence_in_three_years
                    ) || "false"
                  }
                  name={
                    other_details_form_schema.theft_incidence_in_three_years
                  }
                  onChange={(e) => {
                    setValue(
                      other_details_form_schema.theft_incidence_in_three_years,
                      e,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- theft_remarks ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  theft_remarks -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">Remarks</Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.theft_remarks]?.message
              }
            >
              <Box>
                <Input
                  type="text"
                  {...register(other_details_form_schema.theft_remarks)}
                  border="1px"
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder="theft remarks"
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- damanget_incidence_in_three_years ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  damanget_incidence_in_three_years -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Incidence of damage to stock during last 3 years
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[
                  other_details_form_schema.damanget_incidence_in_three_years
                ]?.message
              }
            >
              <Box>
                <RadioGroup
                  isDisabled={getValues("form_edit")}
                  p="0"
                  value={
                    getValues(
                      other_details_form_schema.damanget_incidence_in_three_years
                    ) || "false"
                  }
                  name={
                    other_details_form_schema.damanget_incidence_in_three_years
                  }
                  onChange={(e) => {
                    setValue(
                      other_details_form_schema.damanget_incidence_in_three_years,
                      e,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- damage_remarks ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  damage_remarks -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">Remarks</Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.damage_remarks]?.message
              }
            >
              <Box>
                <Input
                  type="text"
                  {...register(other_details_form_schema.damage_remarks)}
                  border="1px"
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder="damage remarks"
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- flood_incidence_in_three_years ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  flood_incidence_in_three_years -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">
              Incidence of floods during last 3 years
              <span
                style={{
                  color: "red",
                  marginLeft: "4px",
                }}
              >
                *
              </span>
            </Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[
                  other_details_form_schema.flood_incidence_in_three_years
                ]?.message
              }
            >
              <Box>
                <RadioGroup
                  p="0"
                  isDisabled={getValues("form_edit")}
                  value={
                    getValues(
                      other_details_form_schema.flood_incidence_in_three_years
                    ) || "false"
                  }
                  name={
                    other_details_form_schema.flood_incidence_in_three_years
                  }
                  onChange={(e) => {
                    setValue(
                      other_details_form_schema.flood_incidence_in_three_years,
                      e,
                      {
                        shouldValidate: true,
                      }
                    );
                  }}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="radioBoxPrimary" value={"true"}>
                      Yes
                    </Radio>
                    <Radio colorScheme="radioBoxPrimary" value={"false"}>
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {/* -------------- flood_remarks ------------- */}
        <Grid
          textAlign="right"
          alignItems="center"
          my="3"
          templateColumns={templateColumns}
          gap={5}
        >
          {/* --------------  flood_remarks -------------- */}
          <GridItem colSpan={{ base: 1, lg: 0 }}>
            <Text textAlign="right">Remarks</Text>{" "}
          </GridItem>

          <GridItem colSpan={{ base: 1 }}>
            <FormControl
              style={{ w: commonWidth.w }}
              isInvalid={
                errors?.[other_details_form_schema.flood_remarks]?.message
              }
            >
              <Box>
                <Input
                  type="text"
                  {...register(other_details_form_schema.flood_remarks)}
                  border="1px"
                  borderColor="gray.10"
                  isDisabled={getValues("form_edit")}
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
                  placeholder="flood remarks"
                />
              </Box>
            </FormControl>
          </GridItem>
        </Grid>

        {getValues("is_draftable") ? (
          <Flex gap="10px" justifyContent="end" alignItems="center">
            <Button
              bg="#A6CE39"
              _hover={{}}
              color="white"
              marginTop={"30px"}
              padding="0px 30px"
              borderRadius={"50px"}
              type="button"
              onClick={() => {
                saveFunction();
              }}
            >
              Save As Draft
            </Button>
          </Flex>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default OtherDetails;
