import * as yup from "yup";
import validation from "../../utils/validation";
import { Box, Button, Flex, Switch, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { BsEye } from "react-icons/bs";

const columnHelper = createColumnHelper();
const handleCir = () => {
  console.log("craete cir button");
};

const filterFields = [
  {
    "CIR No": "CIR No",
    isActiveFilter: false,

    label: "CIR No",
    name: "CIR No",
    placeholder: "Enter CIR No",
    type: "text",
  },
  {
    "WHR No": "WHR No",
    isActiveFilter: false,

    label: "WHR No",
    name: "WHR No",
    placeholder: "Enter WHR No",
    type: "text",
  },
  {
    Region: "Region",
    isActiveFilter: false,

    label: "Region",
    name: "Region",
    placeholder: "Enter Region",
    type: "text",
  },
  {
    State: "State",
    isActiveFilter: false,

    label: "State",
    name: "State",
    placeholder: "Enter State",
    type: "text",
  },
  {
    "Sub state": "Sub state",
    isActiveFilter: false,

    label: "Sub state",
    name: "Sub state",
    placeholder: "Enter Sub state",
    type: "text",
  },
  {
    District: "District",
    isActiveFilter: false,

    label: "District",
    name: "District",
    placeholder: "Enter District",
    type: "text",
  },
  {
    area: "Area",
    isActiveFilter: false,

    label: "Area",
    name: "area",
    placeholder: "Enter Area",
    type: "text",
  },
  {
    "Warehouse name": "Warehouse name",
    isActiveFilter: false,

    label: "Warehouse name",
    name: "Warehouse name",
    placeholder: "Enter Warehouse name",
    type: "text",
  },
  {
    "Chamber No": "Chamber No",
    isActiveFilter: false,

    label: "Chamber No",
    name: "Chamber No",
    placeholder: "Enter Chamber No",
    type: "text",
  },
  {
    "Client name": "Client name",
    isActiveFilter: false,

    label: "Client name",
    name: "Client name",
    placeholder: "Enter Client name",
    type: "text",
  },

  {
    "Commodity name": "Commodity name",
    isActiveFilter: false,

    label: "Commodity name",
    name: "Commodity name",
    placeholder: "Enter Commodity name",
    type: "text",
  },
  {
    "Commodity variety": "Commodity variety",
    isActiveFilter: false,

    label: "Commodity variety",
    name: "Commodity variety",
    placeholder: "Enter Commodity variety",
    type: "text",
  },
  {
    "Bag Size ": "Bag Size  ",
    isActiveFilter: false,

    label: "Bag Size  ",
    name: "Bag Size  ",
    placeholder: "Enter Bag Size  ",
    type: "text",
  },
  {
    "gatepass creation date": "gatepass creation date",
    isActiveFilter: false,

    label: "gatepass creation date",
    name: "gatepass creation date",
    placeholder: "gatepass creation date",
    type: "text",
  },
  {
    "cir status": "cir status",
    isActiveFilter: false,

    label: "cir status",
    name: "cir status",
    placeholder: "cir status",
    type: "text",
  },
  {
    "CIR L 1 user": "CIR L 1 user",
    isActiveFilter: false,

    label: "CIR L 1 user",
    name: "CIR L 1 user",
    placeholder: "CIR L 1 user",
    type: "text",
  },
  {
    "CIR L 2 user": "CIR L 2 user",
    isActiveFilter: false,

    label: "CIR L 2 user",
    name: "CIR L 2 user",
    placeholder: "CIR L 2 user",
    type: "text",
  },
  {
    "cIR L 3 user": "CIR L 3 user",
    isActiveFilter: false,

    label: "CIR L 3 user",
    name: "CIR L 3 user",
    placeholder: "CIR L 3 user",
    type: "text",
  },
  // {
  //   "Pending gate pass count": "Pending gate pass count",
  //   isActiveFilter: false,

  //   label: "Pending gate pass count",
  //   name: "Pending gate pass count",
  //   placeholder: "Pending gate pass count",
  //   type: "text",
  // },
  // {
  //   "Create cir": "Create cir",
  //   isActiveFilter: false,

  //   label: "Create cir",
  //   name: "Create cir",
  //   placeholder: "Create cir",
  //   type: "text",
  // },

  {
    "QA report status": "QA report status",
    isActiveFilter: false,

    label: "QA report status",
    name: "QA report status",
    placeholder: "QA report status",
    type: "text",
  },

  {
    "CIR Creation date ": "created_at",
    isActiveFilter: false,
    label: "CIR Creation date",
    name: "created_at",
    placeholder: "Enter Creation date",
    type: "date_from_to",
    max: new Date().toISOString().split("T")[0],
  },
  {
    "CIR Last updated date": "updated_at",
    isActiveFilter: false,
    label: "CIR Last updated date",
    name: "updated_at",
    placeholder: "Enter Last updated date",
    type: "date_from_to",
    max: new Date().toISOString().split("T")[0],
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
  //       label: "ACTIVE",
  //       value: "True",
  //     },
  //     {
  //       label: "DeActive",
  //       value: "False",
  //     },
  //   ],
  // },
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
  // columnHelper.accessor("Region", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "Region",
  // }),
  // columnHelper.accessor("State", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "State",
  // }),
  // columnHelper.accessor("Sub state", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "Sub state",
  // }),
  // columnHelper.accessor("District", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "District",
  // }),
  // columnHelper.accessor("area", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "area",
  // }),
  columnHelper.accessor("Warehouse name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Warehouse name",
  }),
  columnHelper.accessor("Chamber No", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Chamber No",
  }),
  columnHelper.accessor("Client name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Client name",
  }),

  columnHelper.accessor("Commodity name", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Commodity name",
  }),
  columnHelper.accessor("Commodity variety", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Commodity variety     ",
  }),
  columnHelper.accessor("Storage rate type", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Storage rate type",
  }),
  columnHelper.accessor("Bag size ", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Bag size ",
  }),
  columnHelper.accessor("AVG Bag size ", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "AVG Bag size ",
  }),
  columnHelper.accessor("gatepass creation date", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "gatepass creation date",
  }),
  columnHelper.accessor("Pending gate pass count", {
    cell: (info) => info.getValue() ?? "N/A",
    header: "Pending gate pass count",
  }),
  columnHelper.accessor("Create cir", {
    // cell: (info) => info.getValue() ?? "N/A",
    cell: (info) => (
      <Flex justifyContent="center" color="primary.700">
        <Button onClick={() => handleCir(info)} cursor={"pointer"}>
          hii
        </Button>
      </Flex>
    ),
    header: "Create cir",
  }),

  // columnHelper.accessor("cir status", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "cir status",
  // }),
  // columnHelper.accessor("cIR L 1 user", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "cIR L 1 user",
  // }),
  // columnHelper.accessor("cIR L 2 user", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "cIR L 2 user ",
  // }),
  // columnHelper.accessor("cIR L 3 user", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "cIR L 3 user",
  // }),
  // columnHelper.accessor("QA report status ", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "QA report status",
  // }),
  // columnHelper.accessor("CIR Creation date", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "CIR Creation date",
  // }),
  // columnHelper.accessor("CIR Last updated date", {
  //   cell: (info) => info.getValue() ?? "N/A",
  //   header: "CIR Last updated date",
  // }),
  // columnHelper.accessor("view", {
  //   header: () => (
  //     <Text id="view_col" fontWeight="800">
  //       View
  //     </Text>
  //   ),
  //   cell: (info) => (
  //     <Flex justifyContent="center" color="primary.700" id="view_row">
  //       <BsEye
  //         fontSize="26px"
  //         cursor="pointer"
  //         // onClick={() => viewForm(info)}
  //       />
  //     </Flex>
  //   ),
  //   id: "view_col",
  //   accessorFn: (row) => row.view_col,
  // }),

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
