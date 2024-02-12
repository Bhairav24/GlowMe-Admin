import React, { useState } from 'react';
import axios from 'axios';

const AddAstrologer = ({ closeModal, fetchDataFromApi, accessToken }) => {
  const [astrologerData, setAstrologerData] = useState({
    name: '',
    email: '',
    phone_number: '',
    Gender: '',
    Address:'',
    kyc: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAstrologerData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
     //   'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/createAstrologerProfile',
    ' http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin//vendor/updateProfile',
        astrologerData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal(); // Close the modal after adding an astrologer
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
        <h2 className="text-xl font-bold mb-4">Add New Partner</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={astrologerData.name}
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
              value={astrologerData.email}
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
              value={astrologerData.phone_number}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
              Adddress
            </label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={astrologerData.Address}
              onChange={handleChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                  <select
                            type="gender"
                            name="Gender"
                            value={astrologerData.Gender}
                            onChange={handleChange}
                            
                            className="border rounded-md p-2 w-full"
                            required
                          >
                            <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
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
                checked={astrologerData.kyc}
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAstrologer;
