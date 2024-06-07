import * as yup from "yup";
import { createColumnHelper } from "@tanstack/react-table";
import { Flex } from "@chakra-ui/react";
import { BsEye } from "react-icons/bs";

const columnHelper = createColumnHelper();

const filterFields = [
  {
    "Chamber no ": "gate_pass_no",
    isActiveFilter: false,
    label: "Gatepass no",
    name: "gate_pass_no",
    placeholder: "Gatepass no",
    type: "text",
  },

  {
    Region: "region",
    isActiveFilter: false,

    label: "Region",
    name: "warehouse__region__region_name",
    placeholder: "Region",
    type: "text",
  },
  {
    State: "state",
    isActiveFilter: false,

    label: "State ",
    name: "warehouse__state__state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "Sub State ": "substate",
    isActiveFilter: false,

    label: "Sub State ",
    name: "warehouse__substate__substate_name",
    placeholder: "Sub State",
    type: "text",
  },
  {
    "District ": "district",
    isActiveFilter: false, 

    label: "District ",
    name: "warehouse__district__district_name",
    placeholder: "District",
    type: "text",
  },
  {
    "Area ": "area",
    isActiveFilter: false,

    label: "Area",
    name: "warehouse__area__area_name",
    placeholder: "Area",
    type: "text",
  },
  {
    label: "Warehouse Name",
    name: "warehouse__warehouse_name",
    placeholder: "Warehouse Name",
    type: "text",
  },
  {
    label: "Chamber Number",
    name: "chamber__chamber_number",
    placeholder: "Chamber Number",
    type: "text",
  },
  {
    label: "Client Name",
    name: "client__name_of_client",
    placeholder: "Client Name",
    type: "text",
  },
  {
    label: "Commodity Name",
    name: "commodity__commodity_name",
    placeholder: "Commodity Name",
    type: "text",
  },
  {
    label: "Commodity Variety",
    name: "commodity_variety",
    placeholder: "Commodity Variety",
    type: "text",
  },
  {
    label: "Gatepass Status",
    name: "gate_pass_status",
    placeholder: "Gatepass Status",
    type: "text",
  },

  {
    L1User: "l1_user",
    isActiveFilter: false,

    label: "L1User",
    name: "l1_user",
    placeholder: "L1User",
    type: "text",
  },
  

  {
    "CREATION DATE ": "created_at",
    isActiveFilter: false,
    label: "Creation Date Range",
    name: "created_at",
    placeholder: "Creation Date ",
    type: "date_from_to",
    max: new Date().toISOString().split("T")[0],
  },

  {
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,
    label: "Last Updated Date Range",
    name: "updated_at",
    placeholder: "Last Updated Date",
    type: "date_from_to",
    max: new Date().toISOString().split("T")[0],
  },
  // {
  //   "LAST UPDATED ACTIVE": "is_active",
  //   isActiveFilter: false,
  //   label: "Active",
  //   name: "is_active",
  //   placeholder: "Active",
  //   type: "select",
  //   multi: false,
  //   options: [
  //     {
  //       label: "Active",
  //       value: "True",
  //     },
  //     {
  //       label: "DeActive",
  //       value: "False",
  //     },
  //   ],
  // },
];

const addEditFormFields = [
  // {
  //   label: "Region ",
  //   name: "region_name",
  //   placeholder: "Region ",
  //   type: "text",
  // },
  // {
  //   label: "Active",
  //   name: "is_active",
  //   type: "switch",
  // },
];

const schema = yup.object().shape({
  gate_pass_type: yup.string().required(""),
  gate_pass_no: yup.string(""),
  gate_pass_date_in: yup.string().required(""),
  gate_pass_date_out: yup.string().required(""),
  warehouse: yup.string().required(""),
  chamber: yup.string().required(""),
  client: yup.string().required(""),
  client_representative_name: yup.string().required(""),
  commodity: yup.string().required(""),
  commodity_variety: yup.string().required(""),
  truck_no: yup.string().required(""),
  truck_image: yup.array().min(2).required(""),
  driver_name: yup.string().required(""),
  upload_driver_photo: yup.string().required("Please Upload Driver Photo."),
  weighbridge_name: yup.string().required("").nullable(),
  upload_approval_email: yup.string().nullable(),
  new_weighbridge_name: yup.string().nullable(),
  weighbridge_slip_no: yup.string().required(""),
  weighbridge_slip_datetime: yup.string().required(""),
  upload_weighbridge_slip: yup
    .string()
    .required("Please Upload Weighbridge slip."),
  total_no_of_bags: yup.number().min(1).required(""),
  gross_weight_kg: yup.number().min(0).required(""),
  tare_weight: yup.number().min(0).required(""),
  net_weight: yup.number().min(0).required(""),
  sample_seal_no: yup.string().required(""),
  sampler_name: yup.string().required(""),
  remarks: yup.string().nullable(),
  gate_pass_stack_details: yup.array().min(1).required(""),
  gate_pass_commodity_quality: yup.array().min(1).required(""),
});

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "SR. NO",
  }),
  columnHelper.accessor("gate_pass_no", {
    cell: (info) => info.getValue(),
    header: "Gatepass no",
  }),
  // columnHelper.accessor("region_name", {
  //   cell: (info) => info.getValue(),
  //   header: "Region",
  // }),
  // columnHelper.accessor("region_name", {
  //   cell: (info) => info.getValue(),
  //   header: "State",
  // }),
  // columnHelper.accessor("region_name", {
  //   cell: (info) => info.getValue(),
  //   header: "Substate",
  // }),
  // columnHelper.accessor("region_name", {
  //   cell: (info) => info.getValue(),
  //   header: "District",
  // }),
  // columnHelper.accessor("region_name", {
  //   cell: (info) => info.getValue(),
  //   header: "Area",
  // }),
  columnHelper.accessor("warehouse.warehouse_name", {
    cell: (info) => info.getValue(),
    header: "Warehouse name",
  }),
  columnHelper.accessor("chamber.chamber_number", {
    cell: (info) => info.getValue(),
    header: "Chamber Name",
  }),
  columnHelper.accessor("client.name_of_client", {
    cell: (info) => info.getValue(),
    header: "Client name",
  }),
  columnHelper.accessor("commodity.commodity_name", {
    cell: (info) => info.getValue(),
    header: "Commodity Name",
  }),
  columnHelper.accessor("commodity_variety.commodity_variety", {
    cell: (info) => info.getValue(),
    header: "Commodity verity",
  }),
  columnHelper.accessor("gate_pass_status", {
    cell: (info) => info.getValue(),
    header: "Gatepass status",
  }),
  columnHelper.accessor("l1_user.employee_name", {
    cell: (info) => info.getValue(),
    header: "L1 user",
  }),

  columnHelper.accessor("created_at", {
    cell: (info) => info.getValue(),
    header: "Creation date",
  }),
  columnHelper.accessor("updated_at", {
    cell: (info) => info.getValue(),
    header: "  Last Updated Date",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => (
      <Flex justifyContent="center" color="primary.700" id="update_row">
        <BsEye
          fontSize="26px"
          cursor="pointer"
          // onClick={() => viewForm(info)}
        />
      </Flex>
    ),
    header: " View",
  }),

  // columnHelper.accessor("is_active", {
  //   header: () => (
  //     <Text id="active_col" fontWeight="800">
  //       Active
  //     </Text>
  //   ),
  //   cell: (info) => (
  //     <Box id="active_row">
  //       <Switch
  //         size="md"
  //         colorScheme="whatsapp"
  //         isChecked={info.row.original.is_active}
  //       />
  //     </Box>
  //   ),
  //   id: "active",
  //   accessorFn: (row) => row.active,
  // }),
];

export { filterFields, addEditFormFields, schema, columns };
