import {
  LayoutDashboard,
  Users,
  Utensils,
  Settings,
  Wallet,
  ShoppingCart,
  Table,
  FileBarChart,
  ChevronDown,
  UserCheck,
  UserCog,
  Flame
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "../../components/tooltip";

export default function SideBar({ isOpen, setIsOpen }) {
  const [openGroup, setOpenGroup] = useState(null);
  const location = useLocation();

  const toggleGroup = (group) => {
    setOpenGroup((prev) => (prev === group ? null : group));
  };

  const isActive = (path) => location.pathname === path;

  // small helper to render links with fixed icon column
  const NavLink = ({ to, Icon, label, tooltip, activeCheck }) => {
    const activeClass = activeCheck
      ? "bg-rose-900/40 text-rose-400 font-semibold"
      : "hover:bg-rose-900/30";
    const content = (
      <div
        className={`flex items-center gap-3 px-6 py-3 w-full rounded transition-colors ${activeClass}`}
      >
        <div className="w-6 flex-shrink-0 flex items-center justify-center">
          <Icon size={16} />
        </div>
        <span className="font-bold">{label}</span>
      </div>
    );

    return tooltip ? (
      <Tooltip message={tooltip}>
        <Link to={to}>{content}</Link>
      </Tooltip>
    ) : (
      <Link to={to}>{content}</Link>
    );
  };

  // child links: same icon column, but label slightly indented to look nested
  const ChildLink = ({ to, Icon, label, tooltip, activeCheck }) => {
    const activeClass = activeCheck
      ? "bg-rose-900/40 text-rose-400 font-semibold"
      : "hover:bg-rose-900/30";
    const content = (
      <button
        className={`flex items-center justify-between w-full px-6 pl-10 py-3 hover:bg-rose-900/30 rounded transition-colors ${activeClass}`}
      >
        <span className="flex items-center gap-3">
          <div className="w-6 flex-shrink-0 flex items-center justify-center">
            <Icon size={18} />
          </div>
          <span className="text-sm">{label}</span>
        </span>
      </button>
    );

    return tooltip ? (
      <Tooltip message={tooltip}>
        <Link to={to}>{content}</Link>
      </Tooltip>
    ) : (
      <Link to={to}>{content}</Link>
    );
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-0
          transition-transform duration-200 ease-in-out
          w-64 bg-transparent backdrop-blur flex flex-col border-r border-gray-800`}
      >
        {/* Header */}
        <div className=" px-6 py-4 flex items-center gap-1 text-rose-600">
            <Flame className="size-10 "/>
            <h1 className="text-4xl font-bold Lobster">Platter</h1>
          </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto space-y-2">
          <div className="flex flex-col">
            <NavLink
              to="/admin/dashboard"
              Icon={LayoutDashboard}
              label="Dashboard"
              tooltip="View overall statistics and KPIs"
              activeCheck={isActive("/admin/dashboard")}
            />
          </div>

          {/* Management Group */}
          <div>
            <button
              onClick={() => toggleGroup("management")}
              className="flex items-center justify-between w-full px-6 py-3 hover:bg-rose-900/30 rounded transition-colors"
            >
              <span className="flex items-center gap-3">
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <Users size={18} />
                </div>
                <span className="font-bold">Management</span>
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openGroup === "management" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openGroup === "management" && (
              <div className="flex flex-col">
                <ChildLink
                  to="/admin/menu"
                  Icon={Utensils}
                  label="Menu & Categories"
                  tooltip="Edit and organize the restaurant menu"
                  activeCheck={isActive("/admin/menu")}
                />
                <ChildLink
                  to="/admin/staff"
                  Icon={Users}
                  label="Staff"
                  tooltip="Assign and track staff members"
                  activeCheck={isActive("/admin/staff")}
                />
                <ChildLink
                  to="/admin/tables"
                  Icon={Table}
                  label="Tables"
                  tooltip="Manage and view table availability"
                  activeCheck={isActive("/admin/tables")}
                />
              </div>
            )}
          </div>

          {/* Reports Group */}
          <div>
            <button
              onClick={() => toggleGroup("reports")}
              className="flex items-center justify-between w-full px-6 py-3 hover:bg-rose-900/30 rounded transition-colors"
            >
              <span className="flex items-center gap-3">
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <FileBarChart size={18} />
                </div>
                <span className="font-bold">Reports</span>
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openGroup === "reports" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openGroup === "reports" && (
              <div className="flex flex-col">
                <ChildLink
                  to="/admin/orders"
                  Icon={ShoppingCart}
                  label="Orders"
                  tooltip="Track and review customer orders"
                  activeCheck={isActive("/admin/orders")}
                />
                 <ChildLink
                  to="/admin/customers"
                  Icon={UserCheck}
                  label="Customers"
                  tooltip="Manage customer profiles and history"
                  activeCheck={isActive("/admin/customers")}
                />
                <ChildLink
                  to="/admin/payments"
                  Icon={Wallet}
                  label="Payments"
                  tooltip="View and manage payment transactions"
                  activeCheck={isActive("/admin/payments")}
                />
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="flex flex-col">
            <Tooltip message="Configure system preferences and options">
              <Link
                to="/admin/settings"
                className={`flex items-center gap-3 px-6 py-3 rounded transition-colors ${
                  isActive("/admin/settings")
                    ? "bg-rose-900/40 text-rose-400 font-semibold"
                    : "hover:bg-rose-900/30"
                }`}
              >
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <Settings size={16} />
                </div>
                <span className="ml-2">Settings</span>
              </Link>
            </Tooltip>
            <Tooltip message="Configure system preferences and options">
              <Link
                to="/admin/profile"
                className={`flex items-center gap-3 px-6 py-3 rounded transition-colors ${
                  isActive("/admin/profile")
                    ? "bg-rose-900/40 text-rose-400 font-semibold"
                    : "hover:bg-rose-900/30"
                }`}
              >
                <div className="w-6 flex-shrink-0 flex items-center justify-center">
                  <UserCog size={16} />
                </div>
                <span className="ml-2">Profile</span>
              </Link>
            </Tooltip>
          </div>
        </nav>
      </div>
    </>
  );
}
