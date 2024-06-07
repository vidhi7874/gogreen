import { Navigate } from "react-router-dom";
import Login from "../view/Auth/Login";
import { Suspense } from "react";
import Dashboard from "../view/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";
import StateMaster from "../view/StateMaster/StateMaster";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";
import AreaMaster from "../view/AreaMaster/AreaMaster";
import { localStorageService } from "../services/localStorge.service";
import ForgotPassword from "../view/Auth/ForgotPassword";
import ChangePassword from "../view/Auth/ChangePassword";
import BankMaster from "../view/BankMaster/BankMaster";
import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";
import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CircleComponent from "../view/Circlecomponent";
import NotFound from "../view/NotFound/NotFound";
import PageMaster from "../view/PageMaster/PageMaster";
import UserMaster from "../view/UserMaster/UserMaster";
import RoleMaster from "../view/Role Master/RoleMaster";
import RolePageAssignmentMaster from "../view/RolePageAssignmentMaster/RolePageAssignmentMaster";
import CommodityVariety from "../view/CommodityVarietyMaster/CommodityVariety";
import WareHouseSubType from "../view/WareHouseSubTypeMaster/WareHouseSubType";
import RegionMaster from "../view/RegionMaster/RegionMaster";
import InsuranceCompanyMaster from "../view/InsuranceCompanyMaster/InsuranceCompanyMaster";
import EarthquakeZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/EarthquakeZoneTypeMaster";

import SecurityAgencyMaster from "../view/SecurityAgencyMaster/SecurityAgencyMaster";
import SecurityGuardMaster from "../view/SecurityGuardMaster/SecurityGuardMaster";
import WarehouseTypeMaster from "../view/WarehouseTypeMaster/WarehouseTypeMaster";
import FormDesign from "../view/FormDesign";
import AddEditFormCommodityMaster from "../view/CommodityMaster/AddEditFormCommodityMaster";
import AddEditFormCommodityType from "../view/CommodityTypeMaster/AddEditFormCommodityType";
import AddEditZoneMaster from "../view/ZoneMaster/AddEditZoneMaster";
import AddEditFormCommodityGrade from "../view/CommodityGrade/AddEditCommodityGrade";
import AddEditFormCommodityVariety from "../view/CommodityVarietyMaster/AddEditFormCommodityVariety";
import AddEditFormArea from "../view/AreaMaster/AddEditAreaMaster";
import AddEditFormRegionMaster from "../view/RegionMaster/AddEditFormRegionMaster";
import AddEditFormDistrictMaster from "../view/DistrictMaster/AddEditDistrictMaster";
import AddEditFormInsuranceCompanyMaster from "../view/InsuranceCompanyMaster/AddEditFormInsuranceCompanyMaster";
import AddEditFormSecurityAgencyMaster from "../view/SecurityAgencyMaster/AddEditFormSecurityAgencyMaster";
import AddEditSecurityGuardMaster from "../view/SecurityGuardMaster/AddEditSecurityGuardMaster";
import AddEditFormEarthQuackZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/AddEditFormEarthQuackZoneTypeMaster";
import AddEditPageMaster from "../view/PageMaster/AddEditPageMaster";
import AddEditFormBankMaster from "../view/BankMaster/AddEditFormBankMaster";
import AddEditFormBankBranchMaster from "../view/BankBranchMaster/AddEditFormBankBranchMaster";
import AddEditFormWareHouseTypeMaster from "../view/WarehouseTypeMaster/AddEditFormWareHouseTypeMaster";
import AddEditFormWareHouseSubTypeMaster from "../view/WareHouseSubTypeMaster/AddEditFormWareHouseSubTypeMaster";
import AddEditFormUserMaster from "../view/UserMaster/AddEditFormUserMaster";
import AddEditFormStateMaster from "../view/StateMaster/AddEditFormStateMaster";
import BankCMLocationMaster from "../view/BankCMLocationMaster/BankCMLocationMaster";
import EmployeeMaster from "../view/EmployeeMaster/EmployeeMaster";
import DepartmentMaster from "../view/DepartmentMaster/DepartmentMaster";
import HiringProposalMaster from "../view/HiringProposalMaster/HiringProposalMaster";
import CommodityBagMaster from "../view/CommodityBagMaster/CommodityBagMaster";
import HsnMaster from "../view/HsnMaster/HsnMaster";
import WarehouseProposal from "../view/WarehouseProposal/WarehouseProposal";
import { Box } from "@chakra-ui/react";
import AddEditFormHiringProposalMaster from "../view/HiringProposalMaster/AddEditFormHiringProposalMaster";
import AddEditFormEmployeeMaster from "../view/EmployeeMaster/AddEditFormEmployeeMaster";
import AddEditFormDepartmentMaster from "../view/DepartmentMaster/AddEditFormDepartmentMaster";
import AddEditRoleMaster from "../view/Role Master/AddEditRoleMaster";
import AddEditBankCmLocationMaster from "../view/BankCMLocationMaster/AddEditBankCmLocationMaster";
import ClientMaster from "../view/ClientMaster/ClientMaster";
import AddEditClientMaster from "../view/ClientMaster/AddEditClientMaster";
import WareHouseOwnerMaster from "../view/WareHouseOwnerMaster/WareHouseOwnerMaster";
import AddEditWareHouseOwnerMaster from "../view/WareHouseOwnerMaster/AddEditWareHouseOwnerMaster";
import AddEditHsnMaster from "../view/HsnMaster/AddEditHsnMaster";
import InsurancePolicyMaster from "../view/InsurancePolicyMaster/InsurancePolicyMaster";
import AddEditInsurancePolicy from "../view/InsurancePolicyMaster/AddEditInsurancePolicy";
import AddEditCommodityBagMaster from "../view/CommodityBagMaster/AddEditCommodityBagMaster";
import ChangeCurrentPassword from "../view/Auth/ChangeCurrentPassword";
import WarehouseInspection from "../view/warehouseInspection/WarehouseInspection";

import QualityMaster from "../view/QualityMaster/QualityMaster";
import AddEditQualityMaster from "../view/QualityMaster/AddEditQualityMaster";
import SecurityGuardTransfer from "../view/SecurityGuardTransfer/SecurityGuardTransfer";
import InspectionMaster from "../view/warehouseInspection/InspectionMaster";
import CommodityPricePullingMaster from "../view/CommodityPricePullingMaster/CommodityPricePullingMaster";
import WarehouseReInspection from "../view/WarehouseReInspection/WarehouseReInspection";
import WareHouseMaster from "../view/WareHouseMaster/WareHouseMaster";
import WarehouseAgreement from "../view/WareHouseMaster/WarehouseAgreement";
import ServiceContractWms from "../view/ServiceContractWms/ServiceContractWms";
import ServiceContractPwh from "../view/Service Contract/Service Contract Pwh/ServiceContractPwh";
import AddEditServiceContractPwh from "../view/Service Contract/Service Contract Pwh/AddEditServiceContractPwh";
import AddEditServiceContractWms from "../view/ServiceContractWms/AddEditServiceContractWms";
import ClientGstMaster from "../view/ClientGstMaster/ClientGstMaster";
import AddEditClientGstMaster from "../view/ClientGstMaster/AddEditClientGstMaster";
import WareHouseDetail from "../view/WareHouseMaster/WareHouseMasterDetail";
import WareHouseMasterDetail from "../view/WareHouseMaster/WareHouseMasterDetail";
import WarehouseSubDetail from "../view/WarehouseReInspection/WarehouseSubDetail";
import WarehousesubDetail from "../view/WareHouseMaster/WarehousesubDetail";
import FacilitiesAtWarehouse from "../view/WareHouseMaster/FacilitiesAtWarehouse";
import SupervisorAndSecurityGuardDetail from "../view/WareHouseMaster/SupervisorAndSecurityGuardDetail";
import OtherDetail from "../view/WareHouseMaster/OtherDetail";
import WareHouseClientMaster from "../view/WareHouseClientMaster/WareHouseClientMaster";
import AddEditWareHouseClientMaster from "../view/WareHouseClientMaster/AddEditWareHouseClientMaster";
import GatePass from "../view/GatePass/GatePass";
import AddEditGatePass from "../view/GatePass/AddEditGatePass";
import CommodityInwardReport from "../view/CommodityInwardReport/CommodityInwardReport";
import AddEditCommodityInwardReport from "../view/CommodityInwardReport/AddEditCommodityInwardReport";
import QualityControlReport from "../view/QualityControlReport/QualityControlReport";
import AddEditQualityControlReport from "../view/QualityControlReport/AddEditQualityControlReport";
import DeliveryOrder from "../view/DeliveryOrder/DeliveryOrder";
import AddEditDeliveryOrder from "../view/DeliveryOrder/AddEditDeliveryOrder";
import LeasedUtilation from "../view/Setting/LeasedUtilation";
import RevenueSharing from "../view/Setting/RevenueSharing";
import Setting from "../view/Setting/Setting";
import SupervisorHiringMaster from "../view/SupervisorHiringMaster/SupervisorHiringMaster";
import AddEditSupervisorHiringMaster from "../view/SupervisorHiringMaster/AddEditSupervisorHiringMaster";

const isAuth = localStorageService.get("GG_ADMIN")?.userDetails?.token.access;
// const isAuth =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2ODk0MzQ5MjEsImlhdCI6MTY4ODU3MDkyMX0.D3w1CLY-htm6l9Sx8pf43PwM9XkDsiOuMYP5BSeEeBk";

/// let isAuth = localStorageService.get("GG_ADMIN"); d

const headerType = "absolute";

const GuestRoute = ({ children }) => {
  return isAuth ? (
    <Navigate to={{ pathname: "/", state: { from: "" } }} />
  ) : (
    children
  );
};

const ProtectedRoutes = ({ children }) => {
  return isAuth ? (
    children
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: "" } }} />
  );
};

const routes = [
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPassword />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/change-current-password",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangeCurrentPassword />
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/change-password",
    element: (
      <GuestRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <ChangePassword />
        </Suspense>
      </GuestRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Dashboard"}>
            {/* <Dashboard /> */}
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/warehouse-proposal/:id",
    element: (
      <ProtectedRoutes>
        <Suspense
          fallback={
            <Box
              color="red"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
            >
              Loading...
            </Box>
          }
        >
          <Layout variant={headerType} title={"warehouseProposal"}>
            <WarehouseProposal />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/warehouse-proposal",
    element: (
      <ProtectedRoutes>
        <Suspense
          fallback={
            <Box
              color="red"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
            >
              Loading...
            </Box>
          }
        >
          <Layout variant={headerType} title={"warehouseProposal"}>
            <WarehouseProposal />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/manage-location",
    children: [
      // zone master get add update start
      {
        path: "sub-state-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Sub State Master"}>
                <ZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/sub-state-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Sub State Master"}>
                <AddEditZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/sub-state-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Sub State Master"}>
                <AddEditZoneMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // zone master get add update end

      // region-master get add update start
      {
        path: "region-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <RegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/region-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <AddEditFormRegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/region-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Region Master"}>
                <AddEditFormRegionMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // region-master get add update end

      //  state-master get add update start
      {
        path: "state-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"State Master"}>
                <StateMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/state-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"State Master"}>
                <AddEditFormStateMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/state-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"State Master"}>
                <AddEditFormStateMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      //  state-master get add update end
      // {
      //   path: "state-master",
      //   element: (
      //     <ProtectedRoutes>
      //       <Suspense fallback={<div>Loading...</div>}>
      //         <Layout variant={headerType} title={"State Master"}>
      //           <StateMaster />
      //         </Layout>
      //       </Suspense>
      //     </ProtectedRoutes>
      //   ),
      // },
      //  state-master get add update end
      {
        path: "district-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <DistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/district-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <AddEditFormDistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/district-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"District Master"}>
                <AddEditFormDistrictMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // {
      //   path: "area-master",
      //   element: (
      //     <ProtectedRoutes>
      //       <Suspense fallback={<div>Loading...</div>}>
      //         <Layout variant={headerType} title={"Area Master"}>
      //           <AreaMaster />
      //         </Layout>
      //       </Suspense>
      //     </ProtectedRoutes>
      //   ),
      // },
      {
        path: "area-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AreaMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/area-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AddEditFormArea />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/area-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Area Master"}>
                <AddEditFormArea />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/manage-users",
    children: [
      {
        path: "user-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"User Master"}>
                <UserMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "add/user-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"User Master"}>
                <AddEditFormUserMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/user-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"User master"}>
                <AddEditFormUserMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "supervisor-hiring-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Supervisor Hiring Master"}>
                <SupervisorHiringMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/supervisor-hiring-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Supervisor Hiring Master "}>
                <AddEditSupervisorHiringMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/supervisor-hiring-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Supervisor Hiring Master"}>
                <AddEditSupervisorHiringMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "page-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Module Master"}>
                <PageMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/page-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Module Master"}>
                <AddEditPageMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/page-master/",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Module Master"}>
                <AddEditPageMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "role-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Role Master"}>
                <RoleMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/role-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Role Master"}>
                <AddEditRoleMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/role-master/",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Role Master"}>
                <AddEditRoleMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "role-page-assignment-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Role Page Assignment Master"}
              >
                <RolePageAssignmentMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/manage-client",
    children: [
      {
        path: "client-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client-master"}>
                <ClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/client-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client-master"}>
                <AddEditClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/client-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client-master"}>
                <AddEditClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "client-gst-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client GST Master"}>
                <ClientGstMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/client-gst-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client GST Master"}>
                <AddEditClientGstMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/client-gst-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Client GST Master"}>
                <AddEditClientGstMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/warehouse-master",
    children: [
      {
        path: "warehouse-sub-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse sub type master"}>
                <WareHouseSubType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-sub-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse sub type Master"}>
                <AddEditFormWareHouseSubTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-sub-type-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse sub type Master"}>
                <AddEditFormWareHouseSubTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <WarehouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-type-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Type Master"}>
                <AddEditFormWareHouseTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-owner-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Owner Master"}>
                <WareHouseOwnerMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-owner-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Owner Master"}>
                <AddEditWareHouseOwnerMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-owner-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Owner Master"}>
                <AddEditWareHouseOwnerMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // Warehouse client master routes start

      {
        path: "warehouse-client-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Client Master"}>
                <WareHouseClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/warehouse-client-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Client Master"}>
                <AddEditWareHouseClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/warehouse-client-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Client Master"}>
                <AddEditWareHouseClientMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      // Warehouse client master routes end

      {
        path: "warehouse-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Master"}>
                <WareHouseMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "view/warehouse-master-details/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Details"}>
                <WareHouseMasterDetail />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-master-details",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Master"}>
                <WarehousesubDetail />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-master-facilitiesatwarehouse",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Master"}>
                <FacilitiesAtWarehouse />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-master-supervisorandsecurityguard",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Master"}>
                <SupervisorAndSecurityGuardDetail />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "warehouse-master-otherdetails",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Warehouse Master"}>
                <OtherDetail />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "warehouse-master-agreement",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Warehouse Agreement Details"}
              >
                <WarehouseAgreement />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/employee-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Employee Master"}>
            <EmployeeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/employee-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Employee Master"}>
            <AddEditFormEmployeeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/employee-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Employee master"}>
            <AddEditFormEmployeeMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/department-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Department Master"}>
            <DepartmentMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/department-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Department Master"}>
            <AddEditFormDepartmentMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/department-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Department Master"}>
            <AddEditFormDepartmentMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/hiring-proposal-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Hiring Proposal Master"}>
            <HiringProposalMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "add/hiring-proposal-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Hiring Proposal Master"}>
            <AddEditFormHiringProposalMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/hiring-proposal-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Hiring Proposal  Master"}>
            <AddEditFormHiringProposalMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/bank-master",
    children: [
      {
        path: "bank-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank Master"}>
                <BankMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/bank-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank Master"}>
                <AddEditFormBankMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/bank-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank master"}>
                <AddEditFormBankMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "bank-branch-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank Branch Master"}>
                <BankBranchMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "add/bank-branch-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank Branch Master"}>
                <AddEditFormBankBranchMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/bank-branch-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank Branch Master"}>
                <AddEditFormBankBranchMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // bank-cm-location Routes start
      {
        path: "bank-cm-location-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank CM Location Master"}>
                <BankCMLocationMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/bank-cm-location-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank CM Location Master"}>
                <AddEditBankCmLocationMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/bank-cm-location-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Bank CM Location Master"}>
                <AddEditBankCmLocationMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      //Bank cm location Routes End
    ],
  },
  {
    path: "/manage-insurance",
    children: [
      // insurance company master get add update start
      {
        path: "insurance-company-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Company Master"}>
                <InsuranceCompanyMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/insurance-company-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Company Master"}>
                <AddEditFormInsuranceCompanyMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/insurance-company-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Company Master"}>
                <AddEditFormInsuranceCompanyMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "insurance-policy-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Policy Master"}>
                <InsurancePolicyMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/insurance-policy-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Policy Master"}>
                <AddEditInsurancePolicy />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/insurance-policy-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Insurance Policy Master"}>
                <AddEditInsurancePolicy />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // insurance company master get add update end

      // earthQuack zone type master get add update start
      {
        path: "earthquake-zone-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Earthquake Zone Type Master"}
              >
                <EarthquakeZoneTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/earthquake-zone-type-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Earthquake Zone Type Master"}
              >
                <AddEditFormEarthQuackZoneTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/earthquake-zone-type-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Earthquake Zone Type Master"}
              >
                <AddEditFormEarthQuackZoneTypeMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // earthQuackZone type master get add update end
    ],
  },

  {
    path: "/commodity-master",
    children: [
      {
        path: "commodity-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <CommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <AddEditFormCommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity master"}>
                <AddEditFormCommodityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "commodity-type",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <CommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      {
        path: "add/commodity-type",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <AddEditFormCommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-type/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Type Master"}>
                <AddEditFormCommodityType />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "commodity-grade",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade Master"}>
                <CommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-grade",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade Master"}>
                <AddEditFormCommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-grade/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Grade Master"}>
                <AddEditFormCommodityGrade />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "commodity-variety",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <CommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-variety",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <AddEditFormCommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-variety/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity variety master"}>
                <AddEditFormCommodityVariety />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "commodity-bag-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Bag Master"}>
                <CommodityBagMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/commodity-bag-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Bag master"}>
                <AddEditCommodityBagMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/commodity-bag-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Commodity Bag master"}>
                <AddEditCommodityBagMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "hsn-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"HSN Master"}>
                <HsnMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/hsn-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"HSN Master"}>
                <AddEditHsnMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/hsn-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"HSN Master"}>
                <AddEditHsnMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },

      // This is for the Quality master routes start
      {
        path: "quality-parameter-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Quality Parameter Master"}>
                <QualityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "add/quality-parameter-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Quality Parameter Master"}>
                <AddEditQualityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      {
        path: "edit/quality-parameter-master/:id",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout variant={headerType} title={"Quality Parameter Master"}>
                <AddEditQualityMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
      // The Quality master routes end

      {
        path: "price-pulling-master",
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<div>Loading...</div>}>
              <Layout
                variant={headerType}
                title={"Commodity Price Pulling Master"}
              >
                <CommodityPricePullingMaster />
              </Layout>
            </Suspense>
          </ProtectedRoutes>
        ),
      },
    ],
  },
  // routes for security agency add update edit started
  {
    path: "/security-agency-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Agency Master"}>
            <SecurityAgencyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-agency-master/edit/security-agency-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Agency Master"}>
            <AddEditFormSecurityAgencyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-agency-master/add/security-agency-master/",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Agency Master"}>
            <AddEditFormSecurityAgencyMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  // Security guard master routes update add edit
  {
    path: "/security-guard-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Master"}>
            <SecurityGuardMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-guard-master/edit/security-guard-master/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Master"}>
            <AddEditSecurityGuardMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-guard-master/add/security-guard-master/",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Master"}>
            <AddEditSecurityGuardMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/security-guard-transfer",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Security Guard Transfer"}>
            <SecurityGuardTransfer />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/inspection-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Warehouse Inspection Report"}>
            <InspectionMaster />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/re-inspection-master",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Warehouse Re-inspection report"}>
            <WarehouseReInspection />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  // Service Contract PWH Routes
  {
    path: "/service-contract-pwh",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service contract(PWH)"}>
            <ServiceContractPwh />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/service-contract-pwh",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service contract(PWH)"}>
            <AddEditServiceContractPwh />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/service-contract-pwh/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (PWH)"}>
            <AddEditServiceContractPwh />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/service-contract-pwh",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (PWH)"}>
            <AddEditServiceContractWms />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/service-contract-pwh/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (PWH)"}>
            <AddEditServiceContractWms />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/service-contract-wms",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (WMS) "}>
            <ServiceContractWms />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/service-contract-wms",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (WMS)"}>
            <AddEditServiceContractWms />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/service-contract-wms/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Service Contract (WMS)"}>
            <AddEditServiceContractWms />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/warehouse-inspection",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Warehouse Inspection "}>
            <WarehouseInspection />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  // for setting page
  {
    path: "/setting/",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Setting"}>
            <Setting />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  // {
  //   path:"/setting/revenue-sharing",
  //   element:(
  //     <ProtectedRoutes>
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <Layout variant={headerType} title={"Revenue Sharing"}>
  //           <RevenueSharing/>
  //         </Layout>
  //       </Suspense>
  //     </ProtectedRoutes>
  //   )
  // },

  // Commodity inward report routes strat
  {
    path: "/commodity-inward-report",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Commodity Inward Report"}>
            <CommodityInwardReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "/commodity-inward-report/add/commodity-inward-report",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Commodity Inward Report "}>
            <AddEditCommodityInwardReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/commodity-inward-report/edit/commodity-inward-report/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Commodity Inward Report "}>
            <AddEditCommodityInwardReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  // Commodity inward report routes end

  // Quality Control report routes strat
  {
    path: "/quality-control-report",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Quality Control Report"}>
            <QualityControlReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "add/quality-control-report",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Quality Control Report"}>
            <AddEditQualityControlReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/quality-control-report/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Quality Control Report"}>
            <AddEditQualityControlReport />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  // Quality Control report routes end

  //Delivery order routes start

  {
    path: "/delivery-order",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Delivery Order"}>
            <DeliveryOrder />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: "add/delivery-order",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Delivery Order"}>
            <AddEditDeliveryOrder />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/delivery-order/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Delivery Order"}>
            <AddEditDeliveryOrder />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  //Delivery order routes end

  // for gatepass page
  {
    path: "/gate-pass",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Gate Pass"}>
            <GatePass />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "add/gate-pass",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Gate Pass Details"}>
            <AddEditGatePass />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "edit/gate-pass/:id",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Gate Pass Details"}>
            <AddEditGatePass />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  // for tasting purpose only
  {
    path: "/testing",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Area Master"}>
            <CircleComponent />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
  {
    path: "*",
    element: (
      <ProtectedRoutes>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout variant={headerType} title={"Not Found"}>
            <NotFound />
          </Layout>
        </Suspense>
      </ProtectedRoutes>
    ),
  },
];

export default routes;
