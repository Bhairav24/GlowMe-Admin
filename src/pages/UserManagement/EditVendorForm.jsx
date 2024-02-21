// EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditVendorForm = ({ userData, closeModal, fetchDataFromApi, accessToken }) => {
  const [editedUser, setEditedUser] = useState({ ...userData });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await axios.post(
        'http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/vendor/updateProfile',
        {
          astrologerID: editedUser._id,
          updatedData: editedUser,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(result);

      if (result.status === 200) {
        // Refresh data after successful edit
        fetchDataFromApi();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 mx-4 md:mx-0 rounded-md w-96 h-96 overflow-y-scroll ">
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
      <h2 className="text-2xl font-semibold mb-4">Edit Partner</h2>
      <form onSubmit={handleSubmit}>
        {/* Add your input fields here */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            type="text"
            name="First_name"
            value={editedUser.First_name}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            type="text"
            name="Last_name"
            value={editedUser.Last_name}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                      <input
                      type="email"
                      name="Email"
                      value={editedUser.Email}
                      onChange={handleInputChange}
                    
                      className="border rounded-md p-2 w-full"
                      required
                    />
        </div>


        <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                      <input
                      type="text"
                      name="phone_number"
                      value={editedUser.phone_number}
                      onChange={handleInputChange}
                      className="border rounded-md p-2 w-full"
                      required
                    />
                    </div>

                    
        <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                  <select
                            type="gender"
                            name="Gender"
                            value={editedUser.Gender}
                            onChange={handleInputChange}
                            
                            className="border rounded-md p-2 w-full"
                            required
                          >
                            <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
                    </div>

        
                    <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
  <input
    type="text"
    name="country"
    value={editedUser.Address.country}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
  <input
    type="text"
    name="city"
    value={editedUser.Address.city}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Area</label>
  <input
    type="text"
    name="area"
    value={editedUser.Address.area}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
  <input
    type="text"
    name="district"
    value={editedUser.Address.district}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
    required
  />
</div>

<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
  <input
    type="text"
    name="pincode"
    value={editedUser.Address.pincode}
    onChange={handleInputChange}
    className="border rounded-md p-2 w-full"
    required
  />
</div>

                

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVendorForm;
