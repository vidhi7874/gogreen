/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { columns, filterFields } from "./fields";
import { setUpFilterFields } from "../../features/filter.slice";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { BiEditAlt } from "react-icons/bi";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";
import { useGetServiceContractMutation } from "../../features/service-contract-api.slice";
import { BsEye } from "react-icons/bs";

function ServiceContractWms() {
  const navigate = useNavigate();
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
    filter: "contract_type",
    contract_type: "wms",
    modal: "ServiceContract",
    excelDownload: "ServiceContract",
  });
  const [viewColumns, setViewColumns] = useState(columns);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  const [data, setData] = useState([]);

  let paramString = "";

  //Add Form Link Function Start
  const addForm = () => {
    navigate(`/add/service-contract-wms`);
  };
  //Add Form Link Function End

  //Edit Form Link Function Start
  const editForm = (info) => {
    navigation(`/edit/service-contract-wms/${info.row.original.id}`, {
      state: { details: info.row.original },
    });
  };

  //Edit Form Link Function End

  //View Form Link Function Start
  const viewForm = (info) => {
    navigation(`/edit/service-contract-wms/${info.row.original.id}`, {
      state: { details: info.row.original, view: true },
    });
  };

  //View Form Link Function End

  // ServiceContract Master Get Api Start

  const [getServiceContract, { isLoading: getServiceContractApiIsLoading }] =
    useGetServiceContractMutation();

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

      const response = await getServiceContract(query).unwrap();
      console.log("Success:", response);
      setData(response?.results || []);

      setPagePerm({
        view: response?.view || false,
        add: response?.add || false,
        edit: response?.edit || false,
      });

      const result = [
        ...columns,
        response?.view
          ? columnHelper.accessor("view", {
              header: () => (
                <Text id="view_col" fontWeight="800">
                  View
                </Text>
              ),
              cell: (info) => (
                <Flex justifyContent="center" color="primary.700" id="view_row">
                  <BsEye
                    fontSize="26px"
                    cursor="pointer"
                    onClick={() => viewForm(info)}
                  />
                </Flex>
              ),
              id: "view_col",
              accessorFn: (row) => row.view_col,
            })
          : null,
        response?.edit
          ? columnHelper.accessor("update", {
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
            })
          : null,
      ];

      setViewColumns([...result.filter((item) => item !== null)]);

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

  //ServiceContract master get Api End
  //region master get Api End

  return (
    <div>
      {pagePerm?.view ? (
        <FunctionalTable
          filter={filter}
          filterFields={filterFields}
          setFilter={setFilter}
          columns={viewColumns}
          data={data}
          loading={getServiceContractApiIsLoading}
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

export default ServiceContractWms;