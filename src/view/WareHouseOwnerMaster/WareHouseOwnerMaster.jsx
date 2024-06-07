/* eslint-disable react-hooks/exhaustive-deps */
import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetWareHouseOwnerTypeMutation } from "../../features/master-api-slice";
import { BiEditAlt } from "react-icons/bi";
import { Flex, Text } from "@chakra-ui/react";
import { columns, filterFields } from "./fields";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { setUpFilterFields } from "../../features/filter.slice";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";

const WareHouseOwnerMaster = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const columnHelper = createColumnHelper();

  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );
  console.log("Warehouse Owner Type Master", filterQuery);
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
    add: false,
    total: 0,
    modal: "WarehouseOwner",
    excelDownload: "WarehouseOwner",
  });

  const [viewColumns, setViewColumns] = useState(columns);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };
  const [data, setData] = useState([]);

  let paramString = "";

  // Edit Form Link Function Start
  const editForm = (info) => {
    const editedFormId = info.row.original.id;
    navigate(`/warehouse-master/edit/warehouse-owner-master/${editedFormId}`, {
      state: { details: info.row.original },
    });
  };
  // Edit Form Link Function End

  // Add Form Link Function Start
  const addForm = () => {
    navigate(`/warehouse-master/add/warehouse-owner-master`);
  };
  // Add Form Link Function End

  // WareHouseOwner Master Get Api Start
  const [
    getWareHouseOwnerType,
    { isLoading: getWareHouseOwnerTypeApiIsLoading },
  ] = useGetWareHouseOwnerTypeMutation();

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
      const response = await getWareHouseOwnerType(query).unwrap();

      if (response.status === 200) {
        console.log("Success:", response?.view);

        let arr = response?.results.map((item, i) => {
          return {
            ...item,
          };
        });
        setData(arr || []);

        setPagePerm({
          view: response?.view || false,
          add: false,
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
                <Flex
                  justifyContent="center"
                  color="primary.700"
                  id="update_row"
                >
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
          add: false,
          excelDownload: filterQuery
            ? `${old.modal}&${filterQuery}`
            : old.modal,
        }));
      }
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
  // WareHouseOwner Master Get Api End

  return (
    <>
      {console.log(pagePerm)}
      <div>
        {pagePerm?.view ? (
          <FunctionalTable
            filter={filter}
            filterFields={filterFields}
            setFilter={setFilter}
            columns={viewColumns}
            data={data}
            loading={getWareHouseOwnerTypeApiIsLoading}
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

export default WareHouseOwnerMaster;
