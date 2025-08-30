import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StartSession = () => {
  const navigate = useNavigate();
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("Profile Details"));
    if (storedProfile) {
      setProfileDetails(storedProfile);
      navigate("/client/home");
    }
  }, []);

  const validate = (field, value) => {
    let error = "";

    if (field === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      }
    }

    if (field === "mobile") {
      if (!value.trim()) {
        error = "Mobile number is required.";
      } else if (!/^(?:07|01)\d{8}$/.test(value)) {
        error = "Enter a valid Kenyan mobile (07xx or 01xx, 10 digits).";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setProfileDetails((prev) => ({ ...prev, [field]: value }));
    validate(field, value);
  };

  const saveDetails = (e) => {
    e.preventDefault();

    // run validation for all fields before submitting
    validate("name", profileDetails.name);
    validate("mobile", profileDetails.mobile);

    // if there are any errors, stop submission
    if (Object.values(errors).some((err) => err)) {
      return;
    }

    localStorage.setItem("Profile Details", JSON.stringify(profileDetails));
    setProfileDetails({ name: "", mobile: "" });
    navigate("/client/home");
  };

  return (
    <main className="min-h-screen  flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5 w-full max-w-md px-4">
        {/* User Icon */}
        <div className="flex flex-col items-center bg-emerald-500 p-5 rounded-full">
          <FontAwesomeIcon icon={faUser} size="2xl" />
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 w-full" onSubmit={saveDetails}>
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className={`border rounded-xl p-2  ${
                errors.name ? "border-red-500" : "border-black"
              }`}
              placeholder="Enter your name"
              value={profileDetails.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-1">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              className={`border rounded-xl p-2 text-white${
                errors.mobile ? "border-red-500" : "border-black"
              }`}
              placeholder="07xx xxx xxx"
              value={profileDetails.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              required
              maxLength={10}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-emerald-500 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            Start
          </button>
        </form>
      </div>
    </main>
  );
};

export { StartSession };
