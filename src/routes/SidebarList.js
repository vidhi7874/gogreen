import {
  BoxIcon,
  CommandIcon,
  CommunityIcon,
  HomeIcon,
  HouseIcon,
  MapIcon,
  PeopleIcon,
  TradingUpIcon,
  TrelloIcon,
  TwoPeopleIcon,
} from "../components/Icons/Icons";
import AreaMaster from "../view/AreaMaster/AreaMaster";

import BankBranchMaster from "../view/BankBranchMaster/BankBranchMaster";
import BankMaster from "../view/BankMaster/BankMaster";

import CommodityGrade from "../view/CommodityGrade/CommodityGrade";
import CommodityMaster from "../view/CommodityMaster/CommodityMaster";
import CommodityType from "../view/CommodityTypeMaster/CommodityType";
import CommodityVariety from "../view/CommodityVarietyMaster/CommodityVariety";

import Dashboard from "../view/Dashboard/Dashboard";
import DistrictMaster from "../view/DistrictMaster/DistrictMaster";

import SecurityAgencyMaster from "../view/SecurityAgencyMaster/SecurityAgencyMaster";
import SecurityGuardMaster from "../view/SecurityGuardMaster/SecurityGuardMaster";

// import PageMaster from "../view/PageMaster/PageMaster";
import RoleMaster from "../view/Role Master/RoleMaster";
// import RolePageAssignmentMaster from "../view/RolePageAssignmentMaster/RolePageAssignmentMaster";
import EarthquakeZoneTypeMaster from "../view/EarthquakeZoneTypeMaster/EarthquakeZoneTypeMaster";
// import InsuranceCompanyMaster from "../view/InsuranceCompanyMaster/InsuranceCompanyMaster";
import RegionMaster from "../view/RegionMaster/RegionMaster";

import StateMaster from "../view/StateMaster/StateMaster";
import UserMaster from "../view/UserMaster/UserMaster";
import WareHouseSubType from "../view/WareHouseSubTypeMaster/WareHouseSubType";
import ZoneMaster from "../view/ZoneMaster/ZoneMaster";
import WarehouseTypeMaster from "../view/WarehouseTypeMaster/WarehouseTypeMaster";
import BankCMLocationMaster from "../view/BankCMLocationMaster/BankCMLocationMaster";
// import EmployeeMaster from "../view/EmployeeMaster/EmployeeMaster";
// import DepartmentMaster from "../view/DepartmentMaster/DepartmentMaster";
import HiringProposalMaster from "../view/HiringProposalMaster/HiringProposalMaster";
import CommodityBagMaster from "../view/CommodityBagMaster/CommodityBagMaster";
import HsnMaster from "../view/HsnMaster/HsnMaster";
// import WarehouseProposal from "../view/WarehouseProposal/WarehouseProposal";
import ClientMaster from "../view/ClientMaster/ClientMaster";
import WareHouseOwnerMaster from "../view/WareHouseOwnerMaster/WareHouseOwnerMaster";
import InsurancePolicyMaster from "../view/InsurancePolicyMaster/InsurancePolicyMaster";
import WarehouseInspection from "../view/warehouseInspection/WarehouseInspection";

// import QualityMaster from "../view/QualityMaster/QualityMaster";
import SecurityGuardTransfer from "../view/SecurityGuardTransfer/SecurityGuardTransfer";
import CommodityPricePullingMaster from "../view/CommodityPricePullingMaster/CommodityPricePullingMaster";
import QualityMaster from "../view/QualityMaster/QualityMaster";
import WarehouseReInspection from "../view/WarehouseReInspection/WarehouseReInspection";
import WareHouseMaster from "../view/WareHouseMaster/WareHouseMaster";
import ServiceContractPwh from "../view/Service Contract/Service Contract Pwh/ServiceContractPwh";
import ServiceContractWms from "../view/ServiceContractWms/AddEditServiceContractWms";
import AddEditServiceContractWms from "../view/ServiceContractWms/AddEditServiceContractWms";
import ClientGstMaster from "../view/ClientGstMaster/ClientGstMaster";
import GatePass from "../view/GatePass/GatePass";

import WareHouseClientMaster from "../view/WareHouseClientMaster/WareHouseClientMaster";
import CommodityInwardReport from "../view/CommodityInwardReport/CommodityInwardReport";
import QualityControlReport from "../view/QualityControlReport/QualityControlReport";
import DeliveryOrder from "../view/DeliveryOrder/DeliveryOrder";
import LeasedUtilation from "../view/Setting/LeasedUtilation";
import RevenueSharing from "../view/Setting/RevenueSharing";
import Setting from "../view/Setting/Setting";
import SupervisorHiringMaster from "../view/SupervisorHiringMaster/SupervisorHiringMaster";

const SidebarList = [
  {
    path: "/",
    name: "Dashboard",
    secondaryNavbar: false,
    icon: <HouseIcon color="inherit" />,
    component: Dashboard,
  },
  {
    name: "All Masters",
    category: "masters",
    state: "pageCollapse",
    icon: <CommandIcon color="inherit" />,
    views: [
      {
        name: "Manage Locations",
        category: "location",
        state: "pageCollapse",
        icon: <MapIcon color="inherit" />,
        views: [
          {
            path: "/manage-location/region-master",
            name: "Region Master",
            secondaryNavbar: true,
            component: RegionMaster,
          },
          {
            path: "/manage-location/state-master",
            name: "State Master",
            secondaryNavbar: true,
            component: StateMaster,
          },
          {
            path: "/manage-location/sub-state-master",
            name: "Sub State Master",
            secondaryNavbar: true,
            component: ZoneMaster,
          },
          {
            path: "/manage-location/district-master",
            name: "District Master",
            secondaryNavbar: true,
            component: DistrictMaster,
          },
          {
            path: "/manage-location/area-master",
            name: "Area Master",
            secondaryNavbar: true,
            component: AreaMaster,
          },
        ],
      },
      {
        name: "Manage Users",
        category: "role",
        state: "pageCollapse",
        icon: <PeopleIcon color="inherit" />,
        views: [
          // {
          //   path: "/employee-master",
          //   name: "Employee Master",
          //   secondaryNavbar: true,
          //   component: EmployeeMaster,
          // },
          // {
          //   path: "/department-master",
          //   name: "Department Master",
          //   secondaryNavbar: true,
          //   component: DepartmentMaster,
          // },
          {
            path: "/manage-users/user-master",
            name: "User Master",
            secondaryNavbar: true,

            component: UserMaster,
          },
          {
            path: "/manage-users/supervisor-hiring-master",
            name: "Supervisor Hiring Master",
            secondaryNavbar: true,

            component: SupervisorHiringMaster,
          },
          {
            path: "/manage-users/role-master",
            name: "Role Master",
            secondaryNavbar: true,
            component: RoleMaster,
          },
          // {
          //   path: "/manage-users/page-master",
          //   name: "Module Master",
          //   secondaryNavbar: true,
          //   component: PageMaster,
          // },
          // {
          //   path: "/manage-users/role-page-assignment-ma",
          //   name: "Role Module Assignment",
          //   secondaryNavbar: true,
          //   component: RolePageAssignmentMaster,
          // },
        ],
      },
      {
        name: "Manage Banks",
        category: "bank",
        state: "pageCollapse",
        icon: <CommunityIcon color="inherit" />,
        views: [
          {
            path: "/bank-master/bank-master",
            name: "Bank Master",
            secondaryNavbar: true,
            icon: <HomeIcon color="inherit" />,
            component: BankMaster,
          },
          {
            path: "/bank-master/bank-branch-master",
            name: "Bank Branch Master",
            secondaryNavbar: true,
            icon: <HomeIcon color="inherit" />,
            component: BankBranchMaster,
          },
          // {
          //   path: "/bank-master/bank-cm-location-master",
          //   name: "Bank CM Location Master",
          //   secondaryNavbar: true,
          //   icon: <HomeIcon color="inherit" />,
          //   component: BankCMLocationMaster,
          // },
        ],
      },
      {
        name: "Manage Insurance",
        category: "insurance",
        state: "pageCollapse",
        icon: <TradingUpIcon color="inherit" />,
        views: [
          // {
          //   path: "/manage-insurance/insurance-company-master",
          //   name: "Insurance Company Master",
          //   secondaryNavbar: true,
          //   icon: <HomeIcon color="inherit" />,
          //   component: InsuranceCompanyMaster,
          // },
          {
            path: "/manage-insurance/insurance-policy-master",
            name: "Insurance Policy Master",
            secondaryNavbar: true,
            icon: <HomeIcon color="inherit" />,
            component: InsurancePolicyMaster,
          },
          {
            path: "/manage-insurance/earthquake-zone-type-master",
            name: "Earthquake Zone Type Master",
            secondaryNavbar: true,
            icon: <HomeIcon color="inherit" />,
            component: EarthquakeZoneTypeMaster,
          },
        ],
      },
      {
        name: "Manage Commodity",
        category: "commodity",
        state: "pageCollapse",
        icon: <TrelloIcon color="inherit" />,
        views: [
          {
            path: "/commodity-master/commodity-type",
            name: "Commodity Type Master",
            secondaryNavbar: true,
            component: CommodityType,
          },
          {
            path: "/commodity-master/commodity-master",
            name: "Commodity Master",
            secondaryNavbar: true,
            component: CommodityMaster,
          },

          {
            path: "/commodity-master/commodity-variety",
            name: "Commodity Variety Master",
            secondaryNavbar: true,
            component: CommodityVariety,
          },
          // {
          //   path: "/commodity-master/commodity-grade",
          //   name: "Commodity Grade Master",
          //   secondaryNavbar: true,
          //   component: CommodityGrade,
          // },
          {
            path: "/commodity-master/commodity-bag-master",
            name: "Commodity Bag Master",
            secondaryNavbar: true,
            component: CommodityBagMaster,
          },
          {
            path: "/commodity-master/hsn-master",
            name: "HSN Master",
            secondaryNavbar: true,
            component: HsnMaster,
          },
          // {
          //   path: "/commodity-master/quality-parameter-master",
          //   name: "Quality Parameter Master",
          //   secondaryNavbar: true,
          //   component: QualityMaster,
          // },
          {
            path: "/commodity-master/price-pulling-master",
            name: "Commodity Price Pulling Master",
            secondaryNavbar: true,
            component: CommodityPricePullingMaster,
          },
          {
            path: "/commodity-master/quality-parameter-master",
            name: "Quality Parameter Master",
            secondaryNavbar: true,
            component: QualityMaster,
          },
        ],
      },

      {
        name: "Manage Warehouse",
        category: "warehouse",
        state: "pageCollapse",
        icon: <BoxIcon color="inherit" />,
        views: [
          {
            path: "/warehouse-master/warehouse-type-master",
            name: "Warehouse Type Master",
            secondaryNavbar: true,
            component: WarehouseTypeMaster,
          },
          {
            path: "/warehouse-master/warehouse-sub-type-master",
            name: "Warehouse Sub Type Master",
            secondaryNavbar: true,
            component: WareHouseSubType,
          },
          {
            path: "/warehouse-master/warehouse-master",
            name: "Warehouse Master",
            secondaryNavbar: true,
            component: WareHouseMaster,
          },
          // {
          //   path: "/hiring-proposal-master",
          //   name: "Hiring Proposal Master",
          //   secondaryNavbar: true,

          //   component: HiringProposalMaster,
          // },
          {
            path: "/warehouse-master/warehouse-owner-master",
            name: "Warehouse Owner Master",
            secondaryNavbar: true,
            component: WareHouseOwnerMaster,
          },
        ],
      },
      // {
      //   name: "Manage Employee",
      //   category: "employee",
      //   state: "pageCollapse",
      //   icon: <TwoPeopleIcon color="inherit" />,
      //   views: [
      //     // {
      //     //   path: "/employee-master",
      //     //   name: "Employee Master",
      //     //   secondaryNavbar: true,
      //     //   component: EmployeeMaster,
      //     // },
      //     // {
      //     //   path: "/department-master",
      //     //   name: "Department Master",
      //     //   secondaryNavbar: true,
      //     //   component: DepartmentMaster,
      //     // },
      //   ],
      // },
      {
        name: "Manage Client",
        category: "client",
        state: "pageCollapse",
        icon: <PeopleIcon color="inherit" />,
        views: [
          // {
          //   path: "/manage-client/client-master",
          //   name: "Client Master",
          //   secondaryNavbar: true,
          //   component: ClientMaster,
          // },
          {
            path: "/warehouse-master/warehouse-client-master",
            name: "Warehouse Client Master",
            secondaryNavbar: true,
            component: WareHouseClientMaster,
          },
          // {
          //   path: "/manage-client/client-gst-master",
          //   name: "Client GST Master",
          //   secondaryNavbar: true,
          //   component: ClientGstMaster,
          // },
        ],
      },

      // {
      //   path: "/user-master",
      //   name: "User Master",
      //   secondaryNavbar: false,
      //   icon: <HomeIcon color="inherit" />,
      //   component: UserMaster,
      // },
      {
        name: "Manage Vendors",
        category: "vendors",
        state: "pageCollapse",
        icon: <TwoPeopleIcon color="inherit" />,
        views: [
          {
            path: "/security-agency-master",
            name: "Security Agency Master",
            secondaryNavbar: true,

            component: SecurityAgencyMaster,
          },
        ],
      },
      {
        name: "Manage Security Guard",
        category: "security",
        state: "pageCollapse",
        icon: <PeopleIcon color="inherit" />,
        views: [
          {
            path: "/security-guard-master",
            name: "Security Guard Master",
            secondaryNavbar: true,
            component: SecurityGuardMaster,
          },
          {
            path: "/security-guard-transfer",
            name: "Security Guard Tranfer",
            secondaryNavbar: true,
            component: SecurityGuardTransfer,
          },
        ],
      },
    ],
  },
  {
    path: "/hiring-proposal-master",
    name: "Warehouse Proposal",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: HiringProposalMaster,
  },
  {
    path: "/inspection-master",
    name: "Warehouse Inspection",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: WarehouseInspection,
  },
  {
    path: "/re-inspection-master",
    name: "Warehouse Re-Inspection",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: WarehouseReInspection,
  },
  {
    path: "/gate-pass",
    name: "Gate Pass",
    secondaryNavbar: false,
    icon: <CommandIcon color="inherit" />,
    component: GatePass,
  },
  {
    path: "/service-contract-pwh",
    name: "Service contract PWH ",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: ServiceContractPwh,
  },
  {
    path: "/service-contract-wms",
    name: "Service contract WMS",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: ServiceContractWms,
  },
  {
    path: "/setting",
    name: "Setting",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: Setting,
  },
  // {
  //   name: "Settings",
  //   category: "Settings",
  //   state: "pageCollapse",
  //   icon: <CommandIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/setting/leased-utilization",
  //       name: "Leased Utilization",
  //       secondaryNavbar: true,

  //       component: LeasedUtilation,
  //     },
  //     {
  //       path: "/setting/revenue-sharing",
  //       name: "Revenue Sharing",
  //       secondaryNavbar: true,

  //       component: RevenueSharing,
  //     },
  //   ]
  // },
  {
    path: "/commodity-inward-report",
    name: "Commodity Inward Report",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: CommodityInwardReport,
  },
  {
    path: "/quality-control-report",
    name: "Quality Control Report",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: QualityControlReport,
  },
  {
    path: "/delivery-order",
    name: "Delivery Order",
    secondaryNavbar: false,
    icon: <HomeIcon color="inherit" />,
    component: DeliveryOrder,
  },

  // {
  //   name: "Manage Users",
  //   category: "role",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/manage-users/user-master",
  //       name: "User Master",
  //       secondaryNavbar: true,

  //       component: UserMaster,
  //     },
  //     {
  //       path: "/manage-users/role-master",
  //       name: "Role Master",
  //       secondaryNavbar: true,
  //       component: RoleMaster,
  //     },
  //     {
  //       path: "/manage-users/page-master",
  //       name: "Page Master",
  //       secondaryNavbar: true,
  //       component: PageMaster,
  //     },
  //     {
  //       path: "/manage-users/role-page-assignment-master",
  //       name: "Role Page Assignment Master",
  //       secondaryNavbar: true,
  //       component: RolePageAssignmentMaster,
  //     },
  //   ],
  // },
  // {
  //   name: "Manage Banks",
  //   category: "bank",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/bank-master/bank-master",
  //       name: "Bank Master",
  //       secondaryNavbar: true,
  //       icon: <HomeIcon color="inherit" />,
  //       component: BankMaster,
  //     },
  //     {
  //       path: "/bank-master/bank-branch-master",
  //       name: "Branch Master",
  //       secondaryNavbar: true,
  //       component: BankBranchMaster,
  //     },
  //     {
  //       path: "/bank-master/bank-cm-location-master",
  //       name: "Bank CM  Master",
  //       secondaryNavbar: true,
  //       icon: <HomeIcon color="inherit" />,
  //       component: BankCMLocationMaster,
  //     },
  //   ],
  // },
  // {
  //   name: "Manage Insurance",
  //   category: "insurance",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/manage-insurance/insurance-company-master",
  //       name: "Insurance Company Master",
  //       secondaryNavbar: true,
  //       icon: <HomeIcon color="inherit" />,
  //       component: InsuranceCompanyMaster,
  //     },
  //     {
  //       path: "/manage-insurance/earthquake-zone-type-master",
  //       name: "Earthquake Master",
  //       secondaryNavbar: true,
  //       icon: <HomeIcon color="inherit" />,
  //       component: EarthquakeZoneTypeMaster,
  //     },
  //   ],
  // },
  // {
  //   name: "Manage Commodity",
  //   category: "commodity",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/commodity-master/commodity-type",
  //       name: "Commodity Type Master",
  //       secondaryNavbar: true,
  //       component: CommodityType,
  //     },
  //     {
  //       path: "/commodity-master/commodity-master",
  //       name: "Commodity Master",
  //       secondaryNavbar: true,
  //       component: CommodityMaster,
  //     },

  //     {
  //       path: "/commodity-master/commodity-variety",
  //       name: "Commodity Variety Master",
  //       secondaryNavbar: true,
  //       component: CommodityVariety,
  //     },
  //     {
  //       path: "/commodity-master/commodity-grade",
  //       name: "Commodity Grade Master",
  //       secondaryNavbar: true,
  //       component: CommodityGrade,
  //     },
  //     {
  //       path: "/commodity-master/commodity-bag-master",
  //       name: "Commodity Bag Master",
  //       secondaryNavbar: true,
  //       component: CommodityBagMaster,
  //     },
  //     {
  //       path: "/commodity-master/hsn-master",
  //       name: "HSN Master",
  //       secondaryNavbar: true,
  //       component: HsnMaster,
  //     },
  //   ],
  // },

  // {
  //   name: "Manage Warehouse",
  //   category: "warehouse",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/warehouse-master/warehouse-type-master",
  //       name: "Warehouse Type Master",
  //       secondaryNavbar: true,
  //       component: WarehouseTypeMaster,
  //     },
  //     {
  //       path: "/warehouse-master/warehouse-sub-type-master",
  //       name: "Warehouse Sub Type Master",
  //       secondaryNavbar: true,
  //       component: WareHouseSubType,
  //     },
  //     {
  //       path: "/hiring-proposal-master",
  //       name: "Hiring Proposal Master",
  //       secondaryNavbar: true,

  //       component: HiringProposalMaster,
  //     },
  //   ],
  // },
  // {
  //   name: "Manage Employee",
  //   category: "employee",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/employee-master",
  //       name: "Employee Master",
  //       secondaryNavbar: true,
  //       component: EmployeeMaster,
  //     },
  //     {
  //       path: "/department-master",
  //       name: "Department Master",
  //       secondaryNavbar: true,
  //       component: DepartmentMaster,
  //     },
  //   ],
  // },

  // // {
  // //   path: "/user-master",
  // //   name: "User Master",
  // //   secondaryNavbar: false,
  // //   icon: <HomeIcon color="inherit" />,
  // //   component: UserMaster,
  // // },
  // {
  //   name: "Manage Vendors",
  //   category: "vendors",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/security-agency-master",
  //       name: "Security Agency Master",
  //       secondaryNavbar: true,

  //       component: SecurityAgencyMaster,
  //     },
  //   ],
  // },
  // {
  //   name: "Manage Security Guard",
  //   category: "security",
  //   state: "pageCollapse",
  //   icon: <CommunityIcon color="inherit" />,
  //   views: [
  //     {
  //       path: "/security-guard-master",
  //       name: "Security Guard Master",
  //       secondaryNavbar: true,
  //       component: SecurityGuardMaster,
  //     },
  //   ],
  // },
];

export default SidebarList;
