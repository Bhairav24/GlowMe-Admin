import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const AstrologerKYC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsImlhdCI6MTcwMzYxMDc0MH0.3OqqLvQqpzQJjDjkMpDOAc0hIFmvohSy5ow4TdmYEes'; // Replace with your actual Bearer token

  const fetchKYCData = async () => {
    try {
      const response = await axios.get('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/getAllKycData', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setKycData(response.data.payload);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
    }
  };

  useEffect(() => {
    fetchKYCData();
  }, [accessToken]);

  const updateKycStatus = async (astrologerID) => {
  try {
    console.log('Updating KYC status. Astrologer ID:', astrologerID);
    console.log('Selected Status:', selectedStatus);
    console.log(selectedStatus==='approved');

    const response = await axios.post(
      'http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/changeKycStatus',
      {
        status: true,
        astrologerID,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Handle the response as needed (e.g., show a success message, update state, etc.)
    console.log('KYC Status updated successfully:', response.data);

    // Fetch updated KYC data
    fetchKYCData();
  } catch (error) {
    console.error('Error updating KYC status:', error);
  }
};


  const downloadFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-100">
          {/* Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-6 py-8">
              {/* Display KYC data */}
              <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-semibold mb-4">KYC Data</h1>
                <ul>
                  {kycData.map((item) => (
                    <li key={item._id} className="mb-4 border-b border-gray-300 pb-4">
                      <p className="text-gray-800">Astrologer ID: {item.astrologerID}</p>
                      <p className="text-gray-800">Aadhaar No: {item.addhaarNo}</p>
                      <p className="text-gray-800">PAN Card No: {item.panCardNo}</p>
                      <p className="text-gray-800">Status: {item.status}</p>
                      <p className="text-gray-800">Created At: {item.createdAt}</p>
                      <div className="mt-2">
                        <label className="text-gray-600">Update KYC Status:</label>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="ml-2 p-2 border rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => updateKycStatus(item.astrologerID)}
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Update
                        </button>
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() => downloadFile(item.addhaarImage)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Download Aadhaar
                        </button>
                        <button
                          onClick={() => downloadFile(item.panCardImage)}
                          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Download PAN Card
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AstrologerKYC;
