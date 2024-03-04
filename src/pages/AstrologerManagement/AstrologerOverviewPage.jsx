import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import EditMenu from "../../components/DropdownEditMenu";

import EditAstrologer from "./EditAstrologer";
import AddAstrologer from "./AddAstrologer";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, FloatButton } from "antd";
import capitalizeFirstLetter, {
  dateFormatter,
} from "../../components/CapitalizeFunction";

import { TbEdit } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { MdOutlineDangerous, MdDelete } from "react-icons/md";
import ViewAstrologer from "./ViewAstrologer";
import ButtonGroupAstrolger from "../../components/ButtonGroupAstrolger";
import BreadCrumbs from "../../components/BreadCrumbs";
import Buttons from "../../components/Buttons";
import NewDropDown from "../../components/NewDropDown";
import SearchBar from "../../components/SearchBar";
import {SelectAvatar} from "../../components/AVATAR";
const AstrologerOverviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [isViewModelOpen, setIsViewModelOpen] = useState(false);
  const [selectedUserToView, setSelectedUserToView] = useState(null);
  const [filter, setFilter] = useState("all");
  const accessToken = localStorage.getItem("authToken");
  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllvendors"
      );
      const vendorData = result.data.reverse();

      console.log(vendorData);
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

  const handleView = (astrologerID) => {
    const vendorIdToView = data.find((user) => user._id === astrologerID);
    setSelectedUserToView(vendorIdToView);
    setIsViewModelOpen(true);
  };
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
  const filteredData = data.filter((astrologer) => {
    if (filter === "all") {
      return true;
    } else if (filter === "pending") {
      return !astrologer.kyc;
    } else if (filter === "approved") {
      return astrologer.kyc;
    } else if(filter==='rejected'){
      return !astrologer.kyc
    }
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* ... other code ... */}
            <BreadCrumbs currentPage="Partner" parentPage="All Partners" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-4xl">
                All Partners
              </h2>
              <div className="flex items-center">
                <Buttons
                  buttonName="Add Partner"
                  modelOpen={() => setIsModalOpen(true)}
                />
                <div className="ml-4">
                  <SearchBar Search={(e) => setSearch(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex justify-around items-center">
                  <div className="flex flex-col md:flex-row items-center">
                    <NewDropDown setFilter={setFilter} />
                  </div>
                </div>

                <div></div>
              </header>

              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-MAROON underline dark:text-slate-500 bg-gray-100  dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">Image</div>
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
                    <tbody className="text-sm font-medium divide-y divide-slate-100 text-CUSTOM_BLACK dark:divide-slate-700">
                      {filteredData
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
                          <SelectAvatar gender={astrologer.Gender}/>
                                    {/* <UserOutlined className="h-15 w-15 text-gray-500 mx-auto" /> */}
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
                              <div className="text-center">
                                {astrologer.kyc ? (
                                  <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Approved
                                  </span>
                                ) : (
                                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-2" align="center">
                              <EditMenu
                                align="right"
                                className="relative inline-flex"
                              >
                                <li>
                                  <Link
                                    onClick={() => handleEdit(astrologer._id)}
                                    className="font-semibold text-sm uppercase text-blue-700 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    <TbEdit
                                      className="inline mr-2"
                                      size="20px"
                                    />
                                    Edit
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    onClick={() => handleView(astrologer._id)}
                                    className="font-semibold text-sm uppercase text-blue-700 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    <GrView
                                      className="inline mr-2"
                                      size="20px"
                                    />
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
                                    className={`font-semibold text-sm uppercase ${
                                      astrologer.block
                                        ? "text-green-500"
                                        : "text-red-500"
                                    } hover:text-rose-600 flex py-1 px-3`}
                                    to="#0"
                                  >
                                    {astrologer.block ? (
                                      <TiTick
                                        className="inline mr-2"
                                        size="20px"
                                      />
                                    ) : (
                                      <MdOutlineDangerous
                                        className="inline mr-2"
                                        size="20px"
                                      />
                                    )}
                                    {astrologer.block ? "Unblock" : "Block"}
                                  </Link>
                                </li>

                                <li>
                                  <Link
                                    onClick={() => handleDelete(astrologer._id)}
                                    className="font-semibold text-sm uppercase text-rose-500 hover:text-rose-600 flex py-1 px-3"
                                    to="#0"
                                  >
                                    <MdDelete
                                      className="inline mr-2"
                                      size="20px"
                                    />
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

      {isViewModelOpen && selectedUserToView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ViewAstrologer
            vendorData={selectedUserToView}
            closeModal={() => setIsViewModelOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}
    </div>
  );
};

export default AstrologerOverviewPage;
