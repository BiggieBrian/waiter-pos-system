import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewOrderButton = () => {
  return (
    <>
      <div className="bg-emerald-500 border border-gray-700 rounded-xl p-4 text-center text-white shadow-md">
        <p className="">New Order</p>
      </div>
    </>
  );
};

export { NewOrderButton };
