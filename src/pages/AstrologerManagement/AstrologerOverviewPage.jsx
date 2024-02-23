import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import EditMenu from "../../components/DropdownEditMenu";

import EditAstrologer from "./EditAstrologer";
import AddAstrologer from "./AddAstrologer";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import capitalizeFirstLetter, {
  dateFormatter,
} from "../../components/CapitalizeFunction";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { MdOutlineDangerous, MdDelete } from "react-icons/md";
import ViewAstrologer from "./ViewAstrologer";

const AstrologerOverviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [isViewModelOpen,setIsViewModelOpen]=useState(false)
  const [selectedUserToView,setSelectedUserToView]=useState(null)

  const accessToken = localStorage.getItem("authToken");
  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllvendors"
      );
      const vendorData = result.data.reverse();

    
      setData(vendorData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = (astrologerId) => {
    const vendorIdToUpdate = data.find((user) => user._id === astrologerId);
    setSelectedUserForEdit(vendorIdToUpdate);
    setIsEditModalOpen(true);
  };

  const handleView=(astrologerID)=>{
    const vendorIdToView=data.find((user)=>user._id===astrologerID);
    setSelectedUserToView(vendorIdToView);
    setIsViewModelOpen(true);

  }
  const handleDelete = async (astrologerId) => {
    try {
      const result = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/deleteVendor",
        {
          astrologerID: astrologerId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi(); // Refresh data after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (astrologerId, isBlocked) => {
    try {
      const result = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/blockVendor",
        {
          astrologerID: astrologerId,
          block: !isBlocked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(result);
      fetchDataFromApi(); //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* ... other code ... */}
            <Breadcrumb
              className="mb-5"
              items={[
                {
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <>
                      <UserOutlined />
                      <span>Partners</span>
                    </>
                  ),
                },
                {
                  title: "All Partners",
                },
              ]}
            />
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
              All Partners
            </h2>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Partner</span>
                </button>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-1 w-64 rounded focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>
              </header>

              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center"></div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Partner Name
                          </div>
                        </th>

                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Phone Number
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Gender
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Address
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Onboarded At
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            KYC Status
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {data
                        .filter(
                          (user) =>
                            search.toLowerCase() === "" ||
                            (user.First_name &&
                              user.Email.toLowerCase().includes(
                                search.toLowerCase()
                              ))
                        )
                        .map((astrologer) => (
                          <tr key={astrologer._id}>
                            <td className="p-2">
                              <div className="h-12 w-12 rounded-full mx-auto ">
                                {astrologer.image ? (
                                  <img
                                    src={astrologer.image}
                                    alt={astrologer.First_name}
                                    className="h-12 w-12 rounded-full mx-auto"
                                  />
                                ) : (
                                  <div className="text-center object-contain object-center ">
                                    <UserOutlined className="h-15 w-15 text-gray-500 mx-auto" />
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {capitalizeFirstLetter(astrologer.First_name)}{" "}
                                {capitalizeFirstLetter(astrologer.Last_name)}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-center">
                                {astrologer.Email}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {astrologer.phone_number}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {capitalizeFirstLetter(astrologer.Gender)}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {astrologer &&
                                  astrologer.Address &&
                                  ` ${capitalizeFirstLetter(
                                    astrologer.Address.area
                                  )}, ${capitalizeFirstLetter(
                                    astrologer.Address.city
                                  )},
      ${capitalizeFirstLetter(astrologer.Address.country)}- ${
                                    astrologer.Address.pincode
                                  }`}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {dateFormatter(astrologer.createdAt)}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">Status</div>
                            </td>
                            <td className="p-2" align="center">
                              <EditMenu
                                align="right"
                                className="relative inline-flex"
                              >
                                <li>
                                  <Link
                                    onClick={() => handleEdit(astrologer._id)}
                                    className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    {/* <CiEdit className="inline mr-1" size="20px"/>    */}
                                    Edit
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                     onClick={() => handleView(astrologer._id)}
                                    className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    View
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    onClick={() =>
                                      handleBlock(
                                        astrologer._id,
                                        astrologer.block
                                      )
                                    }
                                    className={`font-medium text-sm ${
                                      astrologer.block
                                        ? "text-green-500"
                                        : "text-red-500"
                                    } hover:text-rose-600 flex py-1 px-3`}
                                    to="#0"
                                  >
                                    {/* {astrologer.block ? <TiTick className="inline mr-1" size="20px"/> : <MdOutlineDangerous className="inline mr-1" size="20px" />}  */}
                                    {astrologer.block ? "Unblock" : "Block"}
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    onClick={() => handleDelete(astrologer._id)}
                                    className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    {/* <MdDelete className="inline mr-1" size="20px"/>  */}
                                    Delete
                                  </Link>
                                </li>
                              </EditMenu>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddAstrologer
            closeModal={() => setIsModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}

      {/* EditAstrologer User modal */}
      {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditAstrologer
            vendorData={selectedUserForEdit}
            closeModal={() => setIsEditModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}

      {/* View Astrologer*/}


{isViewModelOpen&&selectedUserToView&&(
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

    <ViewAstrologer
    
    vendorData={selectedUserToView}
    closeModal={()=>setIsViewModelOpen(false)}
    fetchDataFromApi={fetchDataFromApi}
    accessToken={accessToken}
    
    
    />
    </div>
)}




    </div>
  );
};

export default AstrologerOverviewPage;
