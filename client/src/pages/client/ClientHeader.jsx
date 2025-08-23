import React from "react";
import { NewOrderButton } from "../../components/newOrderButton";
import { Link } from "react-router";
const ClientHeader = () => {
  return (
    <>
      <header className="w-11/12 mx-auto py-2">
        <div className="flex flex-col md:flex-row justify-between py-3 gap-3">
          <div>
            <h1 className="text-2xl py-2">Whizperz Cafe and Pizza</h1>
            <p className="text-2xl text-emerald-500">
              Table <span>9</span>
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

export { ClientHeader };
