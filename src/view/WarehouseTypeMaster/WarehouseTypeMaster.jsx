/* eslint-disable react-hooks/exhaustive-deps */
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";

import { Flex, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { useGetWarehouseTypeMasterMutation } from "../../features/master-api-slice";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { columns, filterFields } from "./fields";
import { useNavigate } from "react-router-dom";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";

const WarehouseTypeMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columnHelper = createColumnHelper();
  const [pagePerm, setPagePerm] = useState({
    view: true,
    edit: false,
    add: false,
  });
  const [viewColumns, setViewColumns] = useState(columns);
  const [data, setData] = useState([]);

  let paramString = "";

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

  const [filter, setFilter] = useState({
    // filter: [],
    // search: null,
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    add: false,
    total: 0,
    modal: "WareHouseType",
    excelDownload: "WareHouseType",
  });

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };
  //  Add form Navigation Logic Start
  const addForm = () => {
    navigate(`/warehouse-master/add/warehouse-type-master`);
  };
  // Add Form Navigation Logic End

  // Edit Form Navigation Logic Start
  const editForm = (info) => {
    const editedFormId = info.row.original.id;
    navigate(`/warehouse-master/edit/warehouse-type-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  // Edit Form Navigation Logic End

  //  Warehouse Type master Api calling start
  const [
    getWarehouseTypeMaster,
    { isLoading: getWarehouseTypeMasterApiIsLoading },
  ] = useGetWarehouseTypeMasterMutation();

  const getData = async () => {
    //params filter
    //filter.filter.length || filter.search
    // if (filterQuery) {
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
    // }

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getWarehouseTypeMaster(query).unwrap();

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

  // Warehouse Type master Api Calling End

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
            loading={getWarehouseTypeMasterApiIsLoading}
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

export default WarehouseTypeMaster;
