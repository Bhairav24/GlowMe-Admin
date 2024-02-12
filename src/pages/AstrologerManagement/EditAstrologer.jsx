import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAstrologer = ({ vendorData, closeModal, fetchDataFromApi, accessToken }) => {



  
  const [astrologerData, setAstrologerData] = useState({
    First_name: vendorData.First_name,
    Last_name: vendorData.Last_name,
    email: vendorData.email,
    phone_number: vendorData.phone_number,
    Gender: 
    vendorData.Gender,
    Address:vendorData.Address,
    kyc: false,
   
  });
  useEffect(() => {
    // Update the form fields when userData changes
    setAstrologerData({
      First_name: vendorData.First_name,
    Last_name: vendorData.Last_name,
    email: vendorData.email,
    phone_number: vendorData.phone_number,
    Gender: 
    vendorData.Gender,
    Address:vendorData.Address,
    kyc: false,
    });
  }, [vendorData]);



  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const fetchAstrologerData = async () => {
  //   try {
  //     const result = await axios.get(`http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/vendor/${vendorData._id}`, {
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`,
  //       },
  //     });

  //     console.log(result)
  //     setAstrologerData(result);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAstrologerData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.put(`http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/vendor/${vendorData._id}`, astrologerData, {
        headers: {                    
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      console.log(result);
      fetchDataFromApi();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Astrologer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="First_name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="First_name"
            value={vendorData.First_name}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Last_name">
            Name
          </label>
          <input
            type="text"
            id="name"
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
            id="email"
            name="email"
            value={astrologerData.email}
            onChange={handleInputChange}
            className="border rounded-md w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Phone_number">
            Phone Number
          </label>
          <input
            type="number"
            id="Phone_number"
            name="phone_number"
            value={astrologerData.phone_number}
            onChange={handleInputChange}
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
              onChange={handleInputChange}
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