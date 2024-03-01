import React, { useState } from "react";
import SideLogo from "../../images/SideLogo.png";
import axios from "axios";

export default function AddCoupon({
  closeModal,
  accessToken,
  fetchDataFromApi,
}) {
  const [coupon, setCoupon] = useState({
    title: "",
    description: "",
    code: "",
    discount: "",
    discountType: "",
    validityPeriod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((couponData) => ({
      ...couponData,
      [name]: value,
    }));
  };

  const handleclick = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/coupon/create",
        coupon,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto flex-center w-full md:w-2/3 lg:w-1/3">
      <div className="bg-white py-10 px-20 rounded-lg shadow-md relative">
        <div className="flex justify-end">
          <button
            className="text-MAROON hover:text-DARK_CREAM"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <img
          src={SideLogo}
          className="w-12 mx-auto mb-3 rounded-lg"
          alt="Coupon Logo"
        /><h1 className="text-MAROON text-center text-2xl">ADD COUPON</h1>
        <div className="mb-4">
          <label
            className="block text-CUSTOM_BLACK text-sm font-bold mb-0"
            htmlFor="cname"
          >
            Coupon Name:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={coupon.title}
            onChange={handleChange}
            className="border rounded-md w-full py-2 px-3 "
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-CUSTOM_BLACK">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={coupon.description}
            onChange={handleChange}
            className="border rounded-md w-full py-2 px-3 "
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-CUSTOM_BLACK">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={coupon.code}
            onChange={handleChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
          <div className="mb-4">
            <label className="text-CUSTOM_BLACK">Discount:</label>
            <input
              type="text"
              name="discount"
              value={coupon.discount}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-CUSTOM_BLACK">Discount Type:</label>
            <input
              type="text"
              name="discountType"
              value={coupon.discountType}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <p className="text-CUSTOM_BLACK">Valid Till:</p>
          <input
            type="text"
            id="validityPeriod"
            name="validityPeriod"
            value={coupon.validityPeriod}
            onChange={handleChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>
        <div className="flex justify-center">

        <button
          type="submit"
          onClick={handleclick}
          className="bg-MAROON hover:bg-DARK_CREAM text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        </div>
       

      </div>
    </div>
  );
}
