import React, { useEffect, useState } from "react";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";
import { columns, filterFields } from "./fields";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { useGetRegionMasterMutation } from "../../features/master-api-slice";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { BiEditAlt } from "react-icons/bi";
import { Flex, Text } from "@chakra-ui/react";

function DeliveryOrder() {
  const navigate = useNavigate();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

  const [data, setData] = useState([]);
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
    modal: "Region",
    excelDownload: "Region",
  });

  const [viewColumns, setViewColumns] = useState(columns);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  //Add Form Link Function Start
  const addForm = () => {
    navigate(`/add/delivery-order`);
  };
  //Add Form Link Function End

  //Edit Form Link Function Start
  const editForm = (info) => {
    navigation(`/edit/delivery-order/${info.row.original.id}`, {
      state: { details: info.row.original },
    });
  };

  //Delivery order get api start call

  const [getRegionMaster, { isLoading: getRegionMasterApiIsLoading }] =
    useGetRegionMasterMutation();
  let paramString = "";
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
      const response = await getRegionMaster(query).unwrap();
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

  //Delivery order get api end call

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
          loading={getRegionMasterApiIsLoading}
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
}

export default DeliveryOrder;
