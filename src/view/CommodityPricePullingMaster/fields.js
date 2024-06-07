import { createColumnHelper } from "@tanstack/react-table";
import { Box, Switch, Text } from "@chakra-ui/react";

const columnHelper = createColumnHelper();

const filterFields = [
  {
    "Commodity Type":
      "commodity_variety__commodity_id__commodity_type__commodity_type",
    isActiveFilter: false,

    label: "Commodity Type ",
    name: "commodity_variety__commodity_id__commodity_type__commodity_type",
    placeholder: "Commodity Type ",
    type: "text",
  },
  {
    " Commodity Name": "commodity_variety__commodity_id__commodity_name",
    isActiveFilter: false,

    label: "Commodity Name",
    name: "commodity_variety__commodity_id__commodity_name",
    placeholder: "Commodity Name ",
    type: "text",
  },
  {
    "Commodity Verity ": "commodity_variety__commodity_variety",
    isActiveFilter: false,

    label: "Commodity Verity ",
    name: "commodity_variety__commodity_variety",
    placeholder: "Commodity Verity",
    type: "text",
  },

  {
    "Commodity verity Rate(Rs/mt)": "commodity_rate",
    isActiveFilter: false,

    label: "Commodity verity Rate(Rs/mt) ",
    name: "commodity_rate",
    placeholder: "Commodity verity Rate(Rs/mt)  ",
    type: "number",
  },

  {
    "LAST UPDATED DATE": "updated_at",
    isActiveFilter: false,
    label: "Last Updated Date Range",
    name: "updated_at",
    placeholder: "LAST UPDATED DATE",
    type: "date_from_to",
  },

  // {
  //   "LAST UPDATED ACTIVE": "ACTIVE",
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

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "Sr. No",
  }),
  columnHelper.accessor(
    "commodity_variety.commodity_id.commodity_type.commodity_type",
    {
      cell: (info) => info.getValue(),
      header: " Commodity type",
    }
  ),
  columnHelper.accessor("commodity_variety.commodity_id.commodity_name", {
    cell: (info) => info.getValue(),
    header: "Commodity name",
  }),
  columnHelper.accessor("commodity_variety.commodity_variety", {
    cell: (info) => info.getValue(),
    header: "Commodity verity",
  }),
  columnHelper.accessor("commodity_rate", {
    cell: (info) => info.getValue(),
    header: "Commodity verity Rate(Rs/mt) ",
  }),
  columnHelper.accessor("state.state_name", {
    cell: (info) => info.getValue(),
    header: "Download historical Rates",
  }),

  columnHelper.accessor("last_updated_date", {
    cell: (info) => info.getValue(),
    header: "Last Updated Date",
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
  //   id: "is_active",
  //   accessorFn: (row) => row.active,
  // }),
];

export { filterFields, columns };
