import * as yup from "yup";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BsEye } from "react-icons/bs";

const columnHelper = createColumnHelper();

const filterFields = [
  {
    "DO No ": "region_name",
    isActiveFilter: false,
    label: "DO No",
    name: "region_name",
    placeholder: "Enter DO No",
    type: "text",
  },
  {
    "Client name ": "region_name",
    isActiveFilter: false,
    label: "Client name",
    name: "region_name",
    placeholder: "Enter Client name",
    type: "text",
  },
  {
    "Warehouse name ": "region_name",
    isActiveFilter: false,
    label: "Warehouse name",
    name: "region_name",
    placeholder: "Enter Warehouse name ",
    type: "text",
  },
  {
    "REGION ": "region_name",
    isActiveFilter: false,
    label: "Region",
    name: "region_name",
    placeholder: " Enter Region",
    type: "text",
  },
  {
    "State ": "region_name",
    isActiveFilter: false,
    label: "State",
    name: "region_name",
    placeholder: "Enter State",
    type: "text",
  },
  {
    Substate: "region_name",
    isActiveFilter: false,
    label: "Substate",
    name: "region_name",
    placeholder: "Enter Substate",
    type: "text",
  },
  {
    "District ": "region_name",
    isActiveFilter: false,
    label: "District",
    name: "region_name",
    placeholder: "Enter District",
    type: "text",
  },
  {
    "Area ": "region_name",
    isActiveFilter: false,
    label: "Area",
    name: "region_name",
    placeholder: "Enter Area",
    type: "text",
  },
  {
    "Commodity name ": "region_name",
    isActiveFilter: false,
    label: "Commodity name",
    name: "region_name",
    placeholder: "Enter Commodity name",
    type: "text",
  },
  {
    "Commodity Variety ": "region_name",
    isActiveFilter: false,
    label: "Commodity Variety",
    name: "region_name",
    placeholder: "Enter Commodity Variety",
    type: "text",
  },
  {
    "DO status ": "region_name",
    isActiveFilter: false,
    label: "DO status",
    name: "region_name",
    placeholder: "Enter DO status",
    type: "text",
  },
  {
    "DO L1 user ": "region_name",
    isActiveFilter: false,
    label: "DO L1 user",
    name: "region_name",
    placeholder: "Enter DO L1 user",
    type: "text",
  },
  {
    "DO L2 user ": "region_name",
    isActiveFilter: false,
    label: "DO L2 user",
    name: "region_name",
    placeholder: "Enter DO L2 user",
    type: "text",
  },

  {
    "DO L3 user ": "region_name",
    isActiveFilter: false,
    label: "DO L3 user",
    name: "region_name",
    placeholder: "Enter DO L3 user",
    type: "text",
  },

  {
    "DO Creation date ": "created_at",
    isActiveFilter: false,
    label: "DO Creation date",
    name: "created_at",
    placeholder: "Creation Date ",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },

  {
    "DO Last updated date": "last_updated_date",
    isActiveFilter: false,
    label: "DO Last updated date",
    name: "last_updated_date",
    placeholder: "Last Updated Date",
    type: "date",
    max: new Date().toISOString().split("T")[0],
  },

  {
    "DO expiry date ": "region_name",
    isActiveFilter: false,
    label: "DO expiry date",
    name: "region_name",
    placeholder: "Enter DO expiry date",
    type: "text",
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
  {
    label: "Region ",
    name: "region_name",
    placeholder: "Region ",
    type: "text",
  },
  {
    label: "Active",
    name: "is_active",
    type: "switch",
  },
];

const schema = yup.object().shape({
  is_active: yup.string(),

  region_name: yup
    .string()
    .trim()
    .required(() => null),
  warehouse_name: yup
    .string()
    .trim()
    .required(() => null),
});

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "SR. NO",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Do no",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Client Name",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Warehouse Name",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Chamber no",
  }),

  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Commodity name",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Commodity varity",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Do Status",
  }),

  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Do L1 user",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Do L2 user",
  }),
  columnHelper.accessor("region_name", {
    cell: (info) => info.getValue(),
    header: "Do L3 user",
  }),

  columnHelper.accessor("created_at", {
    cell: (info) => info.getValue(),
    header: "Do Creation date",
  }),
  columnHelper.accessor("last_updated_date", {
    cell: (info) => info.getValue(),
    header: "Do Last Updated Date",
  }),
  columnHelper.accessor("last_updated_date", {
    cell: (info) => info.getValue(),
    header: "DO Expiry date",
  }),
  columnHelper.accessor("view", {
    header: () => (
      <Text id="update_col" fontWeight="800">
        View
      </Text>
    ),
    cell: (info) => (
      <Flex justifyContent="center" color="primary.700" id="update_row">
        <BsEye
          fontSize="26px"
          cursor="pointer"
          // onClick={() => viewForm(info)}
        />
      </Flex>
    ),
    id: "view_col",
    accessorFn: (row) => row.view_col,
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
