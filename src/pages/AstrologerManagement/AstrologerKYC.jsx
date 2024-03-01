import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { dateFormatter } from "../../components/CapitalizeFunction";
import capitalizeFirstLetter from "../../components/CapitalizeFunction";
import SearchBar from "../../components/SearchBar";
import BreadCrumbs from "../../components/BreadCrumbs";
const AstrologerKYC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [kycData, setKycData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const accessToken = localStorage.getItem("authToken");

  const fetchKYCData = async () => {
    try {
      const response = await axios.get(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllvendors",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      const filteredData = await response.data.filter(
        (user) => user.kyc === false || user.kyc === "pending"
      );
      setKycData(filteredData);
    } catch (error) {
      console.error("Error fetching KYC data:", error);
    }
  };

  useEffect(() => {
    fetchKYCData();
  }, [accessToken]);

  const updateKycStatus = async (_id) => {
    try {
      console.log("Updating KYC status. Astrologer ID:", _id);
      console.log("Selected Status:", selectedStatus);

      const response = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/changeKycStatus",
        {
          status: selectedStatus,
          vendorId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle the response as needed (e.g., show a success message, update state, etc.)
      console.log("KYC Status updated successfully:", response.data);

      // Fetch updated KYC data
      fetchKYCData();
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  const downloadFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
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
           
           <div className="mt-4 p-7">
           
            <BreadCrumbs currentPage="Partner KYC" parentPage="Partners" />
            <div className="flex items-center justify-between ">
              <h2 className="font-semibold text-MAROON dark:text-slate-100 text-4xl">
                Partner KYC
              </h2>
              <div className="flex items-center">
                <div className="ml-4">
                  <SearchBar />
                </div>
              </div>
            </div>
            </div>
            <div className="container mx-auto px-6 py-8">
              {/* Display KYC data */}
              <div className="bg-white p-6 rounded-md shadow-md">
                
                <ul>
                  {kycData.map((item) => (
                    <li
                      key={item._id}
                      className="mb-4 border-b border-gray-300 pb-4"
                    >
                      <p className="text-gray-800">
                        Partner Name:{" "}
                        {capitalizeFirstLetter(item.First_name) +
                          " " +
                          capitalizeFirstLetter(item.Last_name)}
                      </p>
                      <p className="text-gray-800">Partner ID: {item._id}</p>
                      <p className="text-gray-800">
                        Aadhaar No: {item.addhaarNo}
                      </p>
                      <p className="text-gray-800">
                        PAN Card No: {item.panCardNo}
                      </p>
                      <p className="text-gray-800">
                        Status: {item.kyc ? "true" : "false"}
                      </p>
                      <p className="text-gray-800">
                        Created At: {dateFormatter(item.createdAt)}
                      </p>
                      <div className="mt-2">
                        <label className="text-gray-600">
                          Update KYC Status:
                        </label>
                        {/* <select
                        name='kyc'
                        value={selectedStatus}  
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="ml-2 p-2 border w-28 rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="Success">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select> */}
                        <select
                          name="kyc"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="ml-2 p-2 border w-28 rounded-md"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <button
                          onClick={() => updateKycStatus(item._id)}
                          className="ml-2 bg-MAROON hover:bg-DARK_CREAM text-white font-bold py-2 px-4 rounded"
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
