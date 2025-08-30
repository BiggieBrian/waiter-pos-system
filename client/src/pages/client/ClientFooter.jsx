import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faHome,
  faUtensils,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const ClientFooter = () => {
  const location = useLocation();

  const tabs = [
    { label: "Home", icon: faHome, path: "/client/home" },
    { label: "Orders", icon: faUtensils, path: "/client/orders" },
    { label: "Pay", icon: faCreditCard, path: "/client/pay" },
    { label: "eWaiter?", icon: faUser, path: "/client/about-app" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0A0A0A] z-50 rounded-t-xl">
      <nav className="shadow-lg  border-gray-700 flex justify-around items-center py-5">
        {tabs.slice(0, 2).map((tab) => (
          <Link key={tab.path} to={tab.path}>
            <button
              className={`flex flex-col items-center ${
                location.pathname === tab.path
                  ? "text-emerald-500 font-semibold"
                  : "text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} size="lg" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          </Link>
        ))}

        {/* Floating New Order */}
        <Link to="/client/new-order">
          <button className="flex flex-col items-center bg-emerald-500 p-5 rounded-full text-white shadow-lg">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </Link>

        {tabs.slice(2).map((tab) => (
          <Link key={tab.path} to={tab.path}>
            <button
              className={`flex flex-col items-center ${
                location.pathname === tab.path
                  ? "text-emerald-500 font-semibold"
                  : "text-gray-400"
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} size="lg" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export { ClientFooter };
