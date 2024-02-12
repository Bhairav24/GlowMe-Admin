import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAstrologerData = ({ astrologerId, closeModal, fetchDataFromApi, accessToken }) => {
  const [editedAstrologerData, setEditedAstrologerData] = useState({
    name: '',
    email: '',
    phone_number: '',
    specialization: '',
    kyc: false,
  });

  useEffect(() => {
    const fetchAstrologerData = async () => {
      try {
        const result = await axios.get(
          `http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/getAstrologerProfile/${astrologerId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEditedAstrologerData(result.data.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAstrologerData();
  }, [astrologerId, accessToken]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedAstrologerData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/editAstrologerProfile',
        {
          astrologerID: astrologerId,
          updatedData: editedAstrologerData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal(); // Close the modal after editing astrologer data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Edit Astrologer Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAstrologerData.name}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedAstrologerData.email}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              type="number"
              id="phone_number"
              name="phone_number"
              value={editedAstrologerData.phone_number}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="specialization"
              value={editedAstrologerData.specialization}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kyc">
              KYC Status
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="kyc"
                name="kyc"
                checked={editedAstrologerData.kyc}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="kyc" className="text-gray-700 text-sm">
                Approved
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAstrologerData;
