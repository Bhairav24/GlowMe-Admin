// EditUserForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditUserForm = ({ userData, closeModal, fetchDataFromApi, accessToken }) => {
  const [editedUser, setEditedUser] = useState({
    First_name: userData.First_name,
    Last_name: userData.Last_name,
    Email: userData.Email,
    phone_number: userData.phone_number,
    // DOB: userData.DOB
   
  });

  useEffect(() => {
    // Update the form fields when userData changes
    setEditedUser({
      First_name: userData.First_name,
    Last_name: userData.Last_name,
    Email: userData.Email,
    phone_number: userData.phone_number,
    userIdToUpdate: userData._id
    // DOB: userData.DOB
   
    });
  }, [userData]);

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  
  

  const handleEditUser = async () => {
    try {
        
        console.log(editedUser);
        console.log(userData._id)
        
        
      const result = await axios.put("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/user/updateProfile",
        
          
        editedUser
        ,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
     
      fetchDataFromApi();
      closeModal(); // Close the modal after editing the user
      toast.success(result.data.message)
    } catch (error) {
      console.log(error);
      toast.error(result.data.message)
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
      <h2 className="text-lg font-semibold mb-4">Edit User</h2>

      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
      <input
        type="text"
        name="First_name"
        value={editedUser.First_name}
        onChange={handleInputChange}
    
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      </div>

      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
      <input
        type="text"
        name="Last_name"
        value={editedUser.Last_name}
        onChange={handleInputChange}
    
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      /> 
      </div>

      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
      
      <input
      type="email"
      name="Email"
      value={editedUser.Email}
      onChange={handleInputChange}
   
      className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
    />
   </div>


   <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
      <input
        type="tel"
        name="phone_number"
        value={editedUser.phone_number}
        onChange={handleInputChange}
      
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      </div>
{/* 
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
      <input
        type="date"
        name="DOB"
        value={editedUser.DOB}
        onChange={handleInputChange}
      
        className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
      />
      </div> */}
      {/* <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                  <select
                            type="gender"
                            name="gender"
                            value={editedUser.gender}
                            onChange={handleInputChange}
                            
                            className="border rounded-md p-2 w-full"
                            required
                          >
                            <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
                    </div> */}
    
      <button
        className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
        onClick={handleEditUser}
      >
        Edit User
      </button>
    </div>
  );
};

export default EditUserForm;
