import * as yup from "yup";
import validation from "../../utils/validation";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { BsEye } from "react-icons/bs";

const columnHelper = createColumnHelper();
const filterFields = [
  {
    "CIR No": "CIR No",
    isActiveFilter: false,

    label: "CIR No",
    name: "CIR No",
    placeholder: "CIR No",
    type: "text",
  },

  {
    "Warehouse name": "Warehouse name",
    isActiveFilter: false,

    label: "Warehouse name",
    name: "Warehouse name",
    placeholder: "Warehouse name",
    type: "text",
  },
  {
    "Client name": "Client name",
    isActiveFilter: false,

    label: "Client name",
    name: "Client name",
    placeholder: "Client name",
    type: "text",
  },
  {
    "Chamber No": "Chamber No",
    isActiveFilter: false,

    label: "Chamber No",
    name: "Chamber No",
    placeholder: "Chamber No",
    type: "text",
  },
  {
    "Commodity name": "Commodity name",
    isActiveFilter: false,

    label: "Commodity name",
    name: "Commodity name",
    placeholder: "Commodity name",
    type: "text",
  },
  {
    "Commodity variety": "Commodity variety",
    isActiveFilter: false,

    label: "Commodity variety",
    name: "Commodity variety",
    placeholder: "Commodity variety",
    type: "text",
  },

  {
    "Create Qc report": "Create Qc report",
    isActiveFilter: false,

    label: "Create Qc report",
    name: "Create Qc report",
    placeholder: "Create Qc report",
    type: "text",
  },
  {
    "QCR status": "QCR status",
    isActiveFilter: false,

    label: "QCR status",
    name: "QCR status",
    placeholder: "QCR status",
    type: "text",
  },
  {
    "QCR L 1 user": "QCR L 1 user",
    isActiveFilter: false,

    label: "QCR L 1 user",
    name: "QCR L 1 user",
    placeholder: "QCR L 1 user",
    type: "text",
  },
  {
    "Qcr L 2 user": "Qcr L 2 user",
    isActiveFilter: false,

    label: "Qcr L 2 user",
    name: "Qcr L 2 user",
    placeholder: "Qcr L 2 user",
    type: "text",
  },

  {
    "QCR Creation date": "created_at",
    isActiveFilter: false,
    label: "QCR Creation date",
    name: "created_at",
    placeholder: "QCR Creation date",
    type: "date_from_to",
    max: new Date().toISOString().split("T")[0],
  },
  {
    "QCR Last updated date": "updated_at",
    isActiveFilter: false,
    label: "QCR Last updated date",
    name: "updated_at",
    placeholder: "QCR Last updated date",
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
        label: "ACTIVE",
        value: "True",
      },
      {
        label: "DeActive",
        value: "False",
      },
    ],
  },
  // {
  //   "MINIMUM BAG SIZE": "minimum_bag_size",
  //   isActiveFilter: false,
  // },
  // {
  //   "MAXIMUM BAG SIZE": "maximum_bag_size",
  //   isActiveFilter: false,
  // },
  // {
  //   "RENT ON BAG M/T": "rent_on_bag",
  //   isActiveFilter: false,
  // },
];

const addEditFormFields = [
  // {
  //   name: "hiring_proposal_id.id",
  //   label: "Hiring Proposal ID",
  //   placeholder: "Hiring Proposal ID",
  //   type: "select",
  // },
  {
    name: "warehouse_owner_name",
    label: "Owner Name",
    placeholder: "Owner Name",
    type: "text",
  },
  {
    name: "warehouse_owner_contact_no",
    label: "Owner ContactNo",
    placeholder: "Owner ContactNo",
    type: "text",
  },
  {
    name: "warehouse_owner_address",
    label: "Owner Address",
    placeholder: "Owner Address",
    type: "text",
  },
  {
    name: "rent_amount",
    label: "Rent Amt",
    placeholder: "Rent Amt",
    type: "number",
  },
  {
    name: "revenue_sharing_ratio",
    label: "Revenue Sharing Ratio",
    placeholder: "Revenue Sharing Ratio",
    type: "number",
  },

  //   {
  //     label: "Active",
  //     name: "is_active",
  //     type: "switch",
  //   },
];

const schema = yup.object().shape({
  // hiring_proposal_id: yup.string().trim().required("Hiring proposal id is required"),
  warehouse_owner_name: yup
    .string()
    .trim()
    .required(() => null),
  owner_type: yup.number().required(() => null),
  warehouse_owner_contact_no: yup
    .string()
    .trim()
    .matches(validation.phoneRegExp, "Contact number is not valid")
    .required(() => null),
  warehouse_owner_address: yup
    .string()
    .trim()
    .required(() => null),
  alternate_mobile_no: yup
    .string()
    .trim()
    .required(() => null),
  account_holder_name: yup
    .string()
    .trim()
    .required(() => null),
  account_number: yup
    .string()
    .trim()
    .required(() => null),
  ifsc_code: yup
    .string()
    .trim()
    .required(() => null),
  warehouse_name: yup
    .number()
    .required(() => null)
    .typeError(""),
  email_id: yup
    .string()
    .trim()
    .required(() => null),
  rent_amount: yup
    .number()
    .required(() => null)
    .typeError(""),
  revenue_sharing_ratio: yup
    .number()
    .required(() => null)
    .typeError(""),
  //   is_active: yup.string(),
});

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Sr. No",
  }),
  columnHelper.accessor("CIR No", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "CIR No",
  }),

  columnHelper.accessor("Warehouse name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Warehouse name",
  }),
  columnHelper.accessor("Client name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Client name",
  }),
  columnHelper.accessor("Chamber No", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Chamber No",
  }),
  columnHelper.accessor("Commodity name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Commodity name",
  }),
  columnHelper.accessor("Commodity variety", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Commodity variety     ",
  }),

  columnHelper.accessor("Create Qc report", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Create Qc report",
  }),

  columnHelper.accessor("QCR status", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "QCR status",
  }),
  columnHelper.accessor("QCR L 1 user", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "QCR L 1 user",
  }),
  columnHelper.accessor("Qcr L 2 user", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Qcr L 2 user ",
  }),

  columnHelper.accessor("QCR Creation date", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "QCR Creation date",
  }),
  columnHelper.accessor("QCR Last updated date", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "QCR Last updated date",
  }),
  columnHelper.accessor("view", {
    header: () => (
      <Text id="update_row" fontWeight="800">
        View
      </Text>
    ),
    cell: (info) => (
      <Flex justifyContent="center" color="primary.700" id="view_row">
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
  //   // header: "ACTIVE",
  //   header: () => <Text id="active_col" fontWeight="800">Active</Text>,
  //   cell: (info) => (
  //     <Box id="active_row">
  //       <Switch
  //         size="md"
  //         colorScheme="whatsapp"
  //         // onChange={(e) => handleActiveDeActive(e, info)}
  //         isChecked={info.row.original.is_active}
  //         // id="active_row"
  //         // isReadOnly
  //         // isChecked={flexRender(
  //         //   cell.column.columnDef.cell,
  //         //   cell.getContext()
  //         // )}
  //       />
  //     </Box>
  //   ),
  //   id: "active",
  //   accessorFn: (row) => row.active,
  // }),
  // columnHelper.accessor("update", {
  //   // header: "UPDATE",
  //   header: () => (
  //     <Text id="update_col" fontWeight="800">
  //       UPDATE
  //     </Text>
  //   ),
  //   cell: (info) => (
  //     <Flex justifyContent="center" color="primary.700" id="update_row">
  //       <BiEditAlt
  //         // color="#A6CE39"
  //         fontSize="26px"
  //         cursor="pointer"
  //         onClick={() => editForm(info)}
  //       />
  //     </Flex>
  //   ),
  //   id: "update_col",
  //   accessorFn: (row) => row.update_col,
  // }),
];

export { filterFields, addEditFormFields, schema, columns };
