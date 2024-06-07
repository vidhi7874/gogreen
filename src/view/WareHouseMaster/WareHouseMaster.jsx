/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import FunctionalTable from "../../components/Tables/FunctionalTable";
import { filterFields } from "./fields";
import { Flex, Text, Box, Switch } from "@chakra-ui/react";
import {
  useGetWareHouseMutation,
  useUpdateWareHouseAgreementRenewalByIdMutation,
} from "../../features/master-api-slice";
import { useDispatch, useSelector } from "react-redux";
import { setUpFilterFields } from "../../features/filter.slice";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { BsEye } from "react-icons/bs";
import NotaccessImage from "../../components/NotAccessImage/NotaccessImage";
import { EditIcon } from "@chakra-ui/icons";
import { useGetWarehouseProposalDetailsMutation } from "../../features/warehouse-proposal.slice";
import { showToastByStatusCode } from "../../services/showToastByStatusCode";

const columnHelper = createColumnHelper();

function WareHouseMaster() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterQuery = useSelector(
    (state) => state.dataTableFiltersReducer.filterQuery
  );

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),

      header: "SR. NO",
    }),
    columnHelper.accessor("warehouse_type.warehouse_type_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse type",
    }),
    columnHelper.accessor("warehouse_sub_type.warehouse_subtype", {
      cell: (info) => info.getValue(),
      header: "Warehosue Sub type ",
    }),
    columnHelper.accessor("warehouse_unit_type.warehouse_unit_type", {
      cell: (info) => info.getValue(),
      header: "Warehouse Unit type ",
    }),
    columnHelper.accessor("warehouse_name", {
      cell: (info) => info.getValue(),
      header: "Warehouse name ",
    }),
    columnHelper.accessor("region.region_name", {
      cell: (info) => info.getValue(),
      header: "Region",
    }),
    columnHelper.accessor("state.state_name", {
      cell: (info) => info.getValue(),
      header: " State",
    }),
    columnHelper.accessor("substate.substate_name", {
      cell: (info) => info.getValue(),
      header: "Sub state ",
    }),
    columnHelper.accessor("district.district_name", {
      cell: (info) => info.getValue(),
      header: " District",
    }),
    columnHelper.accessor("area.area_name", {
      cell: (info) => info.getValue(),
      header: "area ",
    }),
    columnHelper.accessor("warehouse_address", {
      cell: (info) => info.getValue(),
      header: "Address ",
    }),
    columnHelper.accessor("warehouse_pincode", {
      cell: (info) => info.getValue(),
      header: "Pin code ",
    }),
    columnHelper.accessor("is_kyc_completed", {
      cell: (info) => (info.getValue() ? "Yes" : "No"),
      header: " Owners Kyc completed",
    }),
    columnHelper.accessor("region_name", {
      cell: (info) => (
        <button
          style={{
            backgroundColor: info.row.original.is_agreement_done
              ? "#A6CE39"
              : "#D8D8D8",
            padding: "6px",
            borderRadius: "10px",
            color: "white",
          }}
          disabled={info.row.original.is_agreement_done ? false : true}
          onClick={() => {
            UpdateWarehouseAgreementRenewalFunction({
              id: info.row.original.id,
            });
          }}
        >
          Agreement Renewal
        </button>
      ),
      header: "Agreement renewal ",
    }),
    columnHelper.accessor("id", {
      cell: (info) => {
        console.log("info.row.original", info.row.original);
        return (
          <Flex justifyContent="center" color="primary.700" id="update_row">
            {info.row.original.is_kyc_completed ? (
              info.row.original.is_agreement_done ? (
                <BsEye
                  fontSize="26px"
                  cursor="pointer"
                  onClick={() => {
                    navigate("/warehouse-master/warehouse-master-agreement", {
                      state: {
                        id: info.row.original.id,
                        view: true,
                      },
                    });
                  }}
                />
              ) : (
                <EditIcon
                  fontSize="26px"
                  cursor="pointer"
                  onClick={() => {
                    navigate("/warehouse-master/warehouse-master-agreement", {
                      state: {
                        view: false,
                        id: info.row.original.id,
                      },
                    });
                  }}
                />
              )
            ) : (
              <>-</>
            )}
          </Flex>
        );
      },
      header: " View/Upload agreement",
    }),
    columnHelper.accessor("region_name", {
      cell: (info) => (
        <button
          style={{
            backgroundColor: "#A6CE39",
            padding: "6px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          Re-Inspection
        </button>
      ),
      header: "Re-Inspection ",
    }),

    columnHelper.accessor("is_active", {
      header: () => (
        <Text id="active_col" fontWeight="800">
          Active
        </Text>
      ),
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            isChecked={info.row.original.is_active}
          />
        </Box>
      ),
      id: "active",
      accessorFn: (row) => row.active,
    }),
    columnHelper.accessor("is_block", {
      header: "Block",
      cell: (info) => (
        <Box id="active_row">
          <Switch
            size="md"
            colorScheme="whatsapp"
            isReadOnly
            isChecked={info.row.original.is_block}
          />
        </Box>
      ),
    }),
  ];
  // const columnHelper = createColumnHelper();
  const [viewColumns, setViewColumns] = useState(columns);
  const [data, setData] = useState([]);

  const tableFilterSet = () => {
    dispatch(setUpFilterFields({ fields: filterFields }));
  };

  let paramString = "";

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
    modal: "Warehouse",
    excelDownload: "Warehouse",
  });

  // Warehouse master api calling
  const [getWarehouse] = useGetWareHouseMutation();

  //onclick of View icon details page open
  const viewForm = (info) => {
    const warehouseId = info.row.original.id;
    navigate(`/warehouse-master/view/warehouse-master-details/${warehouseId}`, {
      state: {
        warehouseId: info.row.original.id,
        // view: true,
      },
    });
    // navigate(`/warehouse-master/view/warehouse-master-details/${warehouseId}`);
  };

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

    console.log("paramString ---> ", paramString);

    try {
      let query = filterQuery ? `${paramString}&${filterQuery}` : paramString;
      const response = await getWarehouse(query).unwrap();
      console.log("Success:", response);
      setData(response?.results || []);

      if (response?.edit) {
        setViewColumns([...columns]);
      }

      if (response?.view) {
        setViewColumns([
          ...columns,
          columnHelper.accessor("view", {
            header: () => (
              <Text id="update_col" fontWeight="800">
                View
              </Text>
            ),
            cell: (info) => (
              <Flex justifyContent="center" color="primary.700" id="update_row">
                <BsEye
                  fontSize="26px"
                  cursor="pointer"
                  onClick={() => viewForm(info)}
                />
              </Flex>
            ),
            id: "view_col",
            accessorFn: (row) => row.view_col,
          }),
        ]);
      }

      setFilter((old) => ({
        ...old,
        totalPage: Math.ceil(response?.total / old.limit),
        total: response?.total_data,
        totalFilter: response?.total,
        add: false,
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

  // Warehouse master api calling end

  // Warehouse Renewal API call start

  const [UpdateWarehouseAgreementRenewal] =
    useUpdateWareHouseAgreementRenewalByIdMutation();

  const UpdateWarehouseAgreementRenewalFunction = async (id) => {
    try {
      const response = await UpdateWarehouseAgreementRenewal(id).unwrap();
      console.log("Success:", response);
      if (response?.status === 200) {
        console.log("response?.data --> ", response?.data);
        await fetchWarehouseProposalDetails({
          id: response?.data?.warehouse_hiring_proposal,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        error?.data ||
        "Renewal Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  const [getWarehouseProposalDetails] =
    useGetWarehouseProposalDetailsMutation();

  const fetchWarehouseProposalDetails = async (id) => {
    console.log(id, "gotenid");
    try {
      console.log(id, "id");

      const response = await getWarehouseProposalDetails(id.id).unwrap();
      console.log("Success:", response);
      if (response?.status === 200) {
        console.log("response?.data --> ", response?.data);
        navigate(`/warehouse-proposal`, {
          state: {
            details: {
              // view: true,
              id: response?.data?.id || 0,
              warehouse_type: response?.data?.warehouse_type?.id || 0,
              warehouse_subtype: response?.data?.warehouse_subtype?.id || 0,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage =
        error?.data?.data ||
        error?.data?.message ||
        error?.data ||
        "Renewal Request Failed.";
      console.log("Error:", errorMessage);
      toasterAlert({
        message: JSON.stringify(errorMessage),
        status: 440,
      });
    }
  };

  const toasterAlert = (obj) => {
    let msg = obj?.message;
    let status = obj?.status;
    console.log("toasterAlert", obj);
    if (status === 400) {
      const errorData = obj?.data || obj?.data?.data;
      let errorMessage = "";

      Object.keys(errorData)?.forEach((key) => {
        const messages = errorData[key];
        console.log("messages --> ", messages);
        if (typeof messages === "object") {
          messages &&
            messages?.forEach((message) => {
              errorMessage += `${key} : ${message} \n`;
            });
        } else {
          showToastByStatusCode(status, msg);
        }
      });
      showToastByStatusCode(status, errorMessage);
      return false;
    } else if (status === 410) {
      showToastByStatusCode(status, msg);
    }
    showToastByStatusCode(status, msg);
  };

  // Warehouse Renewal API call end

  useEffect(() => {
    tableFilterSet();
    getData();
  }, [filter.limit, filter.page, filterQuery]);

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
            // loading={getCommodityTypeMasterApiIsLoading}
            // addForm={() => addForm()}
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
}

export default WareHouseMaster;
