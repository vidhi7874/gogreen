import * as yup from "yup";
import { gstNumber } from "../../services/validation.service";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Switch, Text } from "@chakra-ui/react";

const filterFields = [
  {
    "REGION ": "region",
    isActiveFilter: false,
    label: "Region",
    name: "region",
    placeholder: "Region",
    type: "text",
  },
  {
    "STATE ": "state_name",
    isActiveFilter: false,
    label: "State ",
    name: "state_name",
    placeholder: "State",
    type: "text",
  },
  {
    "STATE CODE": "state_code",
    isActiveFilter: false,
    label: "State Code",
    name: "state_code",
    placeholder: "State Code",
    type: "text",
  },
  // {
  //   "TIN NO": "tin_no",
  //   isActiveFilter: false,
  //   label: "Tin No",
  //   name: "tin_no",
  //   placeholder: "Tin No",
  //   type: "text",
  // },
  {
    GSTN: "gstn",
    isActiveFilter: false,
    label: "GSTN",
    name: "gstn",
    placeholder: "GSTN",
    type: "text",
  },
  // {
  //   "NAV CODE": "nav_code",
  //   isActiveFilter: false,
  //   label: "Nav Code",
  //   name: "nav_code",
  //   placeholder: "Nav Code",
  //   type: "number",
  // },
  {
    ho_overhead: "ho_overhead",
    isActiveFilter: false,
    label: "HO Overhead",
    name: "ho_overhead",
    placeholder: "HO overhead",
    type: "text",
  },
  {
    state_overhead: "state_overhead",
    isActiveFilter: false,
    label: "State Overhead",
    name: "state_overhead",
    placeholder: "State Overhead",
    type: "text",
  },
  {
    "OFFICE ADDRESS": "state_india_office_addr",
    isActiveFilter: false,
    label: "Office Address",
    name: "state_india_office_addr",
    placeholder: "Office Address",
    type: "text",
  },
  {
    "CREATION DATE": "created_at",
    isActiveFilter: false,
    label: "Creation Date Range",
    name: "created_at",
    placeholder: "Creation Date",
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
  {
    "LAST UPDATED ACTIVE": "ACTIVE",
    isActiveFilter: false,
    label: "Active",
    name: "is_active",
    placeholder: "Active",
    type: "select",
    multi: false,
    options: [
      {
        label: "Active",
        value: "True",
      },
      {
        label: "DeActive",
        value: "False",
      },
    ],
  },
];

const columnHelper = createColumnHelper();

const addEditFormFields = [
  {
    name: "state_name",
    label: "State ",
    placeholder: "State ",
    type: "text",
  },
  {
    name: "state_code",
    label: "State Code",
    placeholder: "State Code",
    type: "text",
  },
  {
    name: "tin_no",
    label: "TIN No",
    placeholder: "TIN No",
    type: "number",
  },
  {
    name: "gstn",
    label: "GSTN",
    placeholder: "GSTN",
    type: "text",
  },
  {
    name: "nav_code",
    label: "Nav Code",
    placeholder: "Nav Code",
    type: "number",
  },
  {
    name: "ho_overhead",
    label: "HO Overhead",
    placeholder: "HO Overhead",
    type: "number",
  },
  {
    name: "state_overhead",
    label: "State Overhead",
    placeholder: "State Overhead",
    type: "number",
  },

  {
    name: "state_india_office_addr",
    label: "Office Address",
    placeholder: "Office Address",
    type: "textArea",
  },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "SR. NO",
  }),
  columnHelper.accessor("region.region_name", {
    cell: (info) => info.getValue(),
    header: "REGION ",
  }),
  columnHelper.accessor("state_name", {
    cell: (info) => info.getValue(),
    header: "STATE ",
  }),
  columnHelper.accessor("state_code", {
    cell: (info) => info.getValue(),
    header: "STATE CODE",
  }),
  columnHelper.accessor("tin_no", {
    cell: (info) => info.getValue(),
    header: "TIN NO",
  }),
  columnHelper.accessor("gstn", {
    cell: (info) => info.getValue(),
    header: "GSTN",
  }),
  columnHelper.accessor("nav_code", {
    cell: (info) => info.getValue(),
    header: "NAV CODE",
  }),
  columnHelper.accessor("state_overhead", {
    cell: (info) => info.getValue(),
    header: "State overhead",
  }),
  columnHelper.accessor("ho_overhead", {
    cell: (info) => info.getValue(),
    header: "HO overhead",
  }),

  columnHelper.accessor("state_india_office_addr", {
    cell: (info) => info.getValue(),
    header: "Office Address",
  }),
  columnHelper.accessor("created_at", {
    cell: (info) => info.getValue(),
    header: "Creation Date",
  }),
  columnHelper.accessor("updated_at", {
    cell: (info) => info.getValue(),
    header: "Last Updated Date",
  }),
  columnHelper.accessor("is_active", {
    header: () => (
      <Text id="active_col" fontWeight="800">
        Active
      </Text>
    ),
    cell: (info) => (
      <Box id="active_row">
        <Switch
          size="md"
          colorScheme="whatsapp"
          isChecked={info.row.original.is_active}
        />
      </Box>
    ),
    id: "active",
    accessorFn: (row) => row.active,
  }),
];

const schema = yup.object().shape({
  state_name: yup
    .string()
    .trim()
    .required(() => null),
  state_code: yup
    .string()
    .trim()
    .max(2)
    .required(() => null),
  // tin_no: yup
  //   .string()
  //   .trim()
  //   .test("tinNumber", "Invalid TIN number", (value) => tinNumber(value))
  //   .required(() => null),
  gstn: yup
    .string()
    .uppercase()
    .trim()
    .test("gst", "Invalid GST Number", function (value) {
      if (!value) {
        return this.createError({ message: () => null });
      }
      return gstNumber(value.toUpperCase());
    })
    .nullable(),

  // nav_code: yup
  //   .number()
  //   .min(0)
  //   .required(() => null),
  state_india_office_addr: yup
    .string()
    .trim()
    .required(() => null),
  is_active: yup.string(),
  state_overhead: yup
    .number()
    .min(0)
    .required(() => null)
    .typeError(""),
  ho_overhead: yup
    .number()
    .min(0)
    .required(() => null)
    .typeError(""),
  region: yup
    .string()
    .trim()
    .required(() => null),
});

export { filterFields, addEditFormFields, schema, columns };
