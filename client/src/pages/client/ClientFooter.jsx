import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faHome,
  faUtensils,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

const ClientFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0  bg-[#0A0A0A]">
      <nav className=" shadow-lg border-t border-gray-200 flex justify-around items-center py-5">
        {/* Home */}
        <Link to={"home"}>
          <button className="flex flex-col items-center text-emerald-500">
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="text-xs mt-1">Home</span>
          </button>
        </Link>

        {/* Orders */}
        <Link to={"orders"}>
          <button className="flex flex-col items-center text-emerald-500">
            <FontAwesomeIcon icon={faUtensils} size="lg" />
            <span className="text-xs mt-1">Orders</span>
          </button>
        </Link>

        <Link to={"new-order"}>
          <button className="flex flex-col items-center bg-emerald-500 p-5 rounded-full">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </Link>

        {/* Payments */}
        <Link to={"pay"}>
          <button className="flex flex-col items-center text-emerald-500">
            <FontAwesomeIcon icon={faCreditCard} size="lg" />
            <span className="text-xs mt-1">Pay</span>
          </button>
        </Link>

        {/* Profile */}
        <Link to={"about-app"}>
          <button className="flex flex-col items-center text-emerald-500">
            <FontAwesomeIcon icon={faUser} size="lg" />
            <span className="text-xs mt-1">eWaiter?</span>
          </button>
        </Link>
      </nav>
    </footer>
  );
};

export { ClientFooter };
