// AddUserForm.jsx
import React, { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify';

const AddUserForm = ({ closeModal, fetchDataFromApi, accessToken }) => {
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    phone_number: "",
    images:null
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    setFormData({
      ...formData,
      images:URL.createObjectURL(file)
      
    })

    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Add this line to log the form data

    try {
      const result = await axios.put(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/user/updateProfile",
        formData,
        {
          headers: {
           
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal();
      toast.success('User Created Successfully!')
    } catch (error) {
      console.log(error);
      toast.success('Something went wrong')
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="p-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
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
        <div className="p-4 modal-content">
          <h2 className="text-xl font-bold mb-4">Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fname"
              >
                First Name:
              </label>
              <input
                type="text"
                id="fname"
                name="First_name"
                value={formData.First_name}
                onChange={handleChange}
                className="border rounded-md w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lname"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="Last_name"
                value={formData.Last_name}
                onChange={handleChange}
                className="border rounded-md w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                className="border rounded-md w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="p_number"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="p_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="border rounded-md w-full py-2 px-3"
                required
              />
            </div>

            {/* <div className="mb-1">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date Of Birth
              </label>
              <input
                type="text"
                id="dob"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                className="border rounded-md w-full py-2 px-3 mb-4"
                required
              />
            </div> */}

            <div className="mb-1">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dob"
              >
                Photo
              </label>
              {imagePreview && (
                <img
                  className="h-20 w-20 rounded-full mx-auto"
                  alt="selected"
                  src={imagePreview}
                ></img>
              )}

              <input
                type="file"
                className="mb-5 mt-1"
                onChange={handleImageChange}
                required
              />
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
    </div>
  );
};

export default AddUserForm;
