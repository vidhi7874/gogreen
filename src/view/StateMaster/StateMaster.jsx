/* eslint-disable react-hooks/exhaustive-deps */
import { createColumnHelper } from "@tanstack/react-table";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import React, { useEffect, useState } from "react";
import { useGetStateMasterMutation } from "../../features/master-api-slice";
import { Flex, Text } from "@chakra-ui/react";
import { BiEditAlt } from "react-icons/bi";
import { setUpFilterFields } from "../../features/filter.slice";
import { useDispatch, useSelector } from "react-redux";
import { filterFields, columns } from "./fields";
import { useNavigate } from "react-router-dom";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";

const StateMaster = () => {
  const navigation = useNavigate();
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
    page: 1,
    totalPage: 1,
    limit: 25,
    totalFilter: 0,
    total: 0,
    add: false,
    modal: "State",
    excelDownload: "State",
  });

  const [viewColumns, setViewColumns] = useState(columns);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [data, setData] = useState([]);
  // Add Form Link Function Start
  const addForm = () => {
    navigation(`/manage-location/add/state-master`);
  };
  // Add Form Link Function End

  // Edit Form Link Function Start
  const editForm = (info) => {
    navigation(`/manage-location/edit/state-master/${info.row.original.id}`, {
      state: { details: info.row.original },
    });
  };
  // Edit Form Link Function End

  // State Master Get Api Start
  const [getStateMaster, { isLoading: getStateMasterApiIsLoading }] =
    useGetStateMasterMutation();
  const getData = async () => {
    let paramString = "";

    // Check if filterQuery is an object
    if (typeof filterQuery === "object") {
      // Convert filterQuery object to a string
      const filterQueryStr = Object.entries(filterQuery)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

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

      paramString += `&${filterQueryStr}`; // Append the filterQuery string to the paramString
    } else {
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
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getStateMaster(query).unwrap();
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
  // State Master Get Api End
  return (
    <div>
      {pagePerm?.view ? (
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={viewColumns}
          data={data}
          loading={getStateMasterApiIsLoading}
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
  );
};

export default StateMaster;
