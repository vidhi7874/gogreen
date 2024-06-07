import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/TestingTable";
import React, { useEffect, useMemo, useState } from "react";
import { useGetDistrictMasterMutation } from "../../features/master-api-slice";
import HandleError from "../../services/handleError";
// import AccessWebcamWithLocation from "../../components/AccessWebcamWithLocation/AccessWebcamWithLocation";
import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";

const Dashboard = () => {
  const columnHelper = createColumnHelper();
  const [filter, setFilter] = useState({
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 25, totalFilter:0 , total:0
  });

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "SR. NO",
    }),
    columnHelper.accessor("district_name", {
      cell: (info) => info.getValue(),
      header: "DISTRICT NAME",
    }),
    columnHelper.accessor("state.zone.zone_name", {
      cell: (info) => info.getValue(),
      header: "ZONE NAME",
    }),
    columnHelper.accessor("state.state_code", {
      cell: (info) => info.getValue(),
      header: "STATE CODE",
    }),
    columnHelper.accessor("state.tin_no", {
      cell: (info) => info.getValue(),
      header: "TIN NO",
    }),
    columnHelper.accessor("state.gstn", {
      cell: (info) => info.getValue(),
      header: "GSTN",
    }),
    columnHelper.accessor("state.nav_code", {
      cell: (info) => info.getValue(),
      header: "NAV CODE",
    }),
    columnHelper.accessor("state.state_india_office_addr", {
      cell: (info) => info.getValue(),
      header: "OFFICE ADDRESS",
    }),
    columnHelper.accessor("active", {
      // header: "ACTIVE",
      header: () => <Text id="active_col" fontWeight="800">Active</Text>,
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            // id="active_row"
            // isReadOnly
            // isChecked={flexRender(
            //   cell.column.columnDef.cell,
            //   cell.getContext()
            // )}
          />
        </Box>
      ),
      id: "active",
      accessorFn: (row) => row.active,
    }),
    columnHelper.accessor("update", {
      // header: "UPDATE",
      header: () => <Text id="update_col" fontWeight="800">UPDATE</Text>,
      cell: (info) => (
        <Flex justifyContent="center" color="primary.700" id="update_row">
          <BiEditAlt
            // color="#A6CE39"
            fontSize="26px"
            cursor="pointer"
          />
        </Flex>
      ),
      id: "update_col",
      accessorFn: (row) => row.update_col,
    }),
  ];

  const filterFields = [
    {
      "STATE NAME": "state__state_name",
      isActiveFilter: false,
    },
    {
      "DISTRICT NAME": "district_name",
      isActiveFilter: false,
    },
  ];

  const [data, setData] = useState([]);

  let paramString = "";

  const [
    getDistrictMaster,
    {
      error: getDistrictMasterApiErr,
      isLoading: getDistrictMasterApiIsLoading,
    },
  ] = useGetDistrictMasterMutation();

  const getData = async () => {
    //params filter
    if (filter.filter.length || filter.search) {
      paramString = Object.entries(filter)
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return value
              .map((item) => `${key}=${encodeURIComponent(item)}`)
              .join("&");
          }
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join("&");
    }

    try {
      const response = await getDistrictMaster(paramString).unwrap();

      console.log("Success:", response);
      setData(response?.results || []);
      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
total: response?.total_data,
totalFilter: response?.total
      }));
    } catch (error) {
      console.error("Error:", error);
      HandleError({ msg: error?.data?.detail }, error.status);
    }
  };

  useEffect(() => {
    getData();
  }, [filter.limit, filter.page]);

  useMemo(() => {
    if (filter.search !== null) {
      getData();
    }
  }, [filter.search]);

  return (
    <div>
      <FunctionalTable
        filter={filter}
        filterFields={filterFields}
        setFilter={setFilter}
        columns={columns}
        data={data}
        loading={getDistrictMasterApiIsLoading}
      />

      {/* <AccessWebcamWithLocation /> */}
    </div>
  );
};

export default Dashboard;
