/* eslint-disable react-hooks/exhaustive-deps */
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";
import { useGetCommodityVarietyMutation } from "../../features/master-api-slice";
import { Flex, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { columns, filterFields } from "./fields";
import { useNavigate } from "react-router-dom";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";

const CommodityVariety = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    filter: [],
    search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    add: false,
    modal: "CommodityVariety",
    excelDownload: "CommodityVariety",
  });
  const [viewColumns, setViewColumns] = useState(columns);

  const [data, setData] = useState([]);

  let paramString = "";

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  // Add form link start
  const addForm = () => {
    navigate(`/commodity-master/add/commodity-variety/`);
  };
  // Add form link end

  // Edit Form Link Navigation Start
  const editForm = (info) => {
    let editedFormId = info.row.original.id;

    navigate(`/commodity-master/edit/commodity-variety/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  // Edit Form Link Navigation End

  // Get Commodity Variety Master API Calling Start
  const [getCommodityVariety, { isLoading: getCommodityVarietyApiIsLoading }] =
    useGetCommodityVarietyMutation();

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

      const response = await getCommodityVariety(query).unwrap();

      console.log("Success:", response);
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
                  onClick={() => editForm(info)}
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
      console.error("Error:", error);
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

  // Get Commodity Variety Master Api Calling End

  return (
    <>
      <div>
        {pagePerm?.view ? (
          <FunctionalTable
            filter={filter}
            filterFields={filterFields}
            setFilter={setFilter}
            columns={viewColumns}
            data={data}
            loading={getCommodityVarietyApiIsLoading}
            addForm={() => addForm()}
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
    </>
  );
};

export default CommodityVariety;
