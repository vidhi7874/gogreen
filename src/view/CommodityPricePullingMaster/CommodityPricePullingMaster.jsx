import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { columns, filterFields } from "./fields";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";
import { useGetCommodityPricePullingMutation } from "../../features/master-api-slice";
import { createColumnHelper } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { BiEditAlt } from "react-icons/bi";

function CommodityPricePullingMaster() {
  const dispatch = useDispatch();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

  const columnHelper = createColumnHelper();

  const [pagePerm, setPagePerm] = useState({
    view: true,
    edit: false,
    add: false,
  });

  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    add: false,
    modal: "CommodityCurrentPrice",
    excelDownload: "CommodityCurrentPrice",
  });

  const [viewColumns, setViewColumns] = useState(columns);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [data, setData] = useState([]);

  let paramString = "";

  //start calling get api of commodity price pulling
  const [
    getCommodityPricePulling,
    { isLoading: getCommodityPricePullingMasterApiIsLoading },
  ] = useGetCommodityPricePullingMutation();

  const getData = async () => {
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
    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;

      const response = await getCommodityPricePulling(query).unwrap();
      console.log("success", response);
      setData(response?.results || []);

      setPagePerm({
        view: response?.view || false,
        add: response?.add || false,
        edit: response?.edit || false,
      });

      if (response?.edit) {
        setViewColumns([
          ...columns,
          columnHelper.accessor("update", {
            header: () => (
              <Text id="update_col" fontWeight="800">
                UPDATE
              </Text>
            ),
            cell: (info) => (
              <Flex justifyContent="center" color="primary.700" id="update_row">
                <BiEditAlt
                  fontSize="26px"
                  cursor="pointer"
                  // onClick={() => editForm(info)}
                />
              </Flex>
            ),
            id: "update_col",
            accessorFn: (row) => row.update_col,
          }),
        ]);
      }

      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
        total: response?.total_data,
        totalFilter: response?.total,
        add: response?.add || false,
        excelDownload: filterQuery ? `${old.modal}&${filterQuery}` : old.modal,
      }));
    } catch (error) {
      console.log("error: " + error);
      setPagePerm({
        view: false,
        add: false,
        edit: false,
      });
    }
  };

  useEffect(() => {
    tableFilterSet();
    getData();
  }, [filter.limit, filter.page, filterQuery]);
  return (
    <div>
      {pagePerm?.view ? (
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={viewColumns}
          data={data}
          loading={getCommodityPricePullingMasterApiIsLoading}
        />
      ) : (
        <>
          <NotaccessImage />
          {/* <Text as="h3" color="black" fontWeight="800">
            You do not have access to this page{" "}
          </Text> */}
        </>
      )}
    </div>
  );
}

export default CommodityPricePullingMaster;