import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faHome,
  faUtensils,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const StartSession = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    mobile: "",
  });
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("Profile Details"));
    if (storedProfile) {
      setProfileDetails(storedProfile);
      navigate("/client");
    }
  }, []);
  const saveDetails = (e) => {
    e.preventDefault();
    console.log(profileDetails);
    localStorage.setItem("Profile Details", JSON.stringify(profileDetails));
    setProfileDetails({
      name: "",
      mobile: "",
    });
    navigate("/client");
  };
  return (
    <>
      <main className="min-h-screen bg-[#0A0A0A] text-white flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col items-center bg-emerald-500 p-5 rounded-full">
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </div>

          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={saveDetails}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="border-1 rounded-xl p-2"
                value={profileDetails.name}
                onChange={(e) => {
                  setProfileDetails((prev) => ({
                    ...prev, // keep existing fields
                    name: e.target.value, // update only "name"
                  }));
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">Mobile</label>
              <input
                type="phone"
                className="border-1 rounded-xl p-2"
                value={profileDetails.mobile}
                onChange={(e) => {
                  setProfileDetails((prev) => ({
                    ...prev, // keep existing fields
                    mobile: e.target.value, // update only "mobile"
                  }));
                }}
              />
            </div>

            <button type="submit" className="bg-emerald-500 py-3 rounded-xl">
              Start
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export { StartSession };
