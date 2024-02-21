import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditAstrologer = ({ vendorData, closeModal, fetchDataFromApi, accessToken }) => {



  
  const [astrologerData, setAstrologerData] = useState({
    First_name: vendorData.First_name,
    Last_name: vendorData.Last_name,
    Email: vendorData.Email,
    phone_number: vendorData.phone_number,
    Gender: vendorData.Gender,
    Services:[vendorData.Services],
    vendorIdToUpdate:vendorData._id,
    kyc: false,
   
  });
  useEffect(() => {
    // Update the form fields when userData changes
    setAstrologerData({
    First_name: vendorData.First_name,
    Last_name: vendorData.Last_name,
    Email: vendorData.Email,
    phone_number: vendorData.phone_number,
    Gender:  vendorData.Gender,
    Services:vendorData.Services,
    vendorIdToUpdate:vendorData._id,
    
    kyc: false,
    });
  }, [vendorData]);



  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleChangeService = (e, index) => {
    const updatedServices = [...astrologerData.Services];
    updatedServices[index] = e.target.value;
    setAstrologerData((prevData) => ({
      ...prevData,
      Services: updatedServices,
    }));
  };
  
  const handleAddService = () => {
    setAstrologerData((prevData) => ({
      ...prevData,
      Services: [...prevData.Services, ""],
    }));
  };
  
  const handleRemoveService = (index) => {
    const updatedServices = [...astrologerData.Services];
    updatedServices.splice(index, 1);
    setAstrologerData((prevData) => ({
      ...prevData,
      Services: updatedServices,
    }));
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(astrologerData)
    try {
      const result = await axios.put('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/vendor/updateProfile', 
      astrologerData, {
        headers: {                    
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
      closeModal();
      toast.success("Partner Added Successfully!")
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while creating partner")
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
      <h2 className="text-xl font-bold mb-4">Edit Astrologer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="First_name">
            First Name
          </label>
          <input
            type="text"
            name="First_name"
            value={astrologerData.First_name}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Last_name">
            Last Name
          </label>
          <input
            type="text"
           
            name="Last_name"
            value={astrologerData.Last_name}
            onChange={handleInputChange}
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
           
            name="Email"
            value={astrologerData.Email}
            onChange={handleInputChange}
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
            
            name="phone_number"
            value={astrologerData.phone_number}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>

        {/* <div className="mb-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Address">
              Address
            </label>
            <input
              type="text"
              id="Address"
              name="Address"
              value={astrologerData.Address}
              onChange={handleInputChange}
              className="border rounded-md w-full py-2 px-3"
              required
            />
          </div> */}

<div className="mb-1">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Services">
      Services
    </label>
    {astrologerData.Services.map((service, index) => (
      <div key={index} className="mb-1">
        <input
          type="text"
          value={service}
          onChange={(e) => handleChangeService(e, index)}
          className="border rounded-md w-full py-2 px-3"
          required
        />
        <button type="button" onClick={() => handleRemoveService(index)}>Remove</button>
      </div>
    ))}
    <button type="button" onClick={handleAddService}>Add Service</button>
  </div>

        <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                  <select
                            type="gender"
                            name="Gender"
                            value={astrologerData.Gender}
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
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="kyc" className="text-gray-700 text-sm">
              Approved
            </label>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditAstrologer;
