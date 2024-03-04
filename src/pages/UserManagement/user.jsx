// user.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import FilterButton from "../../components/DropdownFilter";
import Datepicker from "../../components/Datepicker";
import EditMenu from "../../components/DropdownEditMenu";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import notfound from "../../images/Notfound.svg";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

import capitalizeFirstLetter from "../../components/CapitalizeFunction";
import { dateFormatter } from "../../components/CapitalizeFunction";
import ViewUser from "./ViewUser";
import { TbEdit } from "react-icons/tb";
import { GrView } from "react-icons/gr";
import { TiTick } from "react-icons/ti";
import { MdOutlineDangerous, MdDelete } from "react-icons/md";
import Buttons from "../../components/Buttons";
import BreadCrumbs from "../../components/BreadCrumbs";
import SearchBar from "../../components/SearchBar";
import AVATAR, { SelectAvatar } from '../../components/AVATAR'
import Skeleton from "../../components/Skeleton";
import Pagination from "../../components/Pagination";


const User = () => {
  const [search, setSearch] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);

  const [isViewUserModelOpen,setisViewUserModelOpen]=useState(false);
  const[selectedUserToView,SetselectedUserToView]=useState(null);
  // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"; // Replace with your actual access token
  const accessToken = localStorage.getItem("authToken");

 
  const fetchDataFromApi = async () => {
    try {
      //
      // const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/user/findAll");
      const result = await axios.get(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllusers"
      );

      //console.log(result.data)

      const userData = result.data.reverse();
      setData(userData);
      console.log(userData);
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

  const handleEdit = (userId) => {
    const userIdToUpdate = data.find((user) => user._id === userId);
    setSelectedUserForEdit(userIdToUpdate);
    setIsEditModalOpen(true);
  };


const handleView=(userId)=>{
  const userIdToView=data.find((user)=>user._id===userId)
  SetselectedUserToView(userIdToView)
  setisViewUserModelOpen(true)
};
  // const handleDelete = async (userId) => {
  //   try {
  //     const result = await axios.post(
  //       "http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/deleteUserByAdmin",
  //       {
  //         userID: userId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log(result);
  //     fetchDataFromApi();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleBlock = async (userId, isBlocked) => {
  //   try {
  //     const result = await axios.post(
  //       "http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/admin/block",
  //       {
  //         userType: "User",
  //         _id: userId,
  //         block: !isBlocked,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     console.log(result);
  //     fetchDataFromApi();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex h-screen overflow-hidden">
    
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
           <BreadCrumbs currentPage='Users' parentPage='All Users'/>
          
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <h1 className="font-semibold text-slate-800 dark:text-slate-100 text-4xl">
              All Users
            </h1>

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              
                <Buttons buttonName='Add User' modelOpen={() => setIsModalOpen(true)}/>
                <SearchBar Search={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            
                <div className="flex items-center">
                <FilterButton  />
             
                </div>
              </header>

              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-MAROON dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-left">image</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            First Name
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Last Name
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Phone</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">DOB</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Created At
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Action
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y text-CUSTOM_BLACK divide-slate-100 dark:divide-slate-700">
                      {/* {data
                     .filter((user) =>
                     search.toLowerCase() === "" ||
                     (user.First_name && user.Email.toLowerCase().includes(search.toLowerCase()))
               )
                      .map((user, index) => ( */}

                      {data.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <img
                              src={notfound}
                              alt="No Users Found"
                              className="mx-auto"
                            />
                            <div>No users found.</div>
                          </td>
                        </tr>
                      ) : (
                        data
                          .filter(
                            (user) =>
                              search.toLowerCase() === "" ||
                              (user.First_name &&
                                user.Email.toLowerCase().includes(
                                  search.toLowerCase()
                                ))
                          )
                          .map((user, index) => (
                            <tr key={index}>
                               
                            
                               <td className="p-2">
                              
                                {user.image ? ( 
                                    
                                  <div className="relative h-12 ring-gray-300 w-12 object-contain object-center">
                                    <img
                                      src={user.image}
                                      alt={user.First_name}
                                      className="absolute w-12 h-12 rounded-full mx-auto"
                                    />
                                       </div>
                                     
                                  ) : (
                                  <div className="text-center object-contain object-center ">

                                    {/* <UserOutlined className="h-15 w-15 text-gray-500 mx-auto" /> */}
                                    <SelectAvatar />
                                    </div> )}
                             
                             
                                    </td> 
                              <td className="p-2">
                                <div className=" text-center">
                                  <div className="text-slate-800 dark:text-slate-100">
                                    {capitalizeFirstLetter(user.First_name)}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {capitalizeFirstLetter(user.Last_name)}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.Email}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {user.phone_number}
                                </div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">{user.DOB}</div>
                              </td>
                              <td className="p-2">
                                <div className="text-center">
                                  {dateFormatter(user.updatedAt)}
                                </div>
                              </td>
                              <td className="p-2" align="center">
                                <EditMenu
                                  align="right"
                                  className="relative inline-flex"
                                >
                             
                                  <li>
                                    <Link
                                      onClick={() => handleEdit(user._id)}
                                      className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3"
                                      
                                    >
                                      <TbEdit className="inline mr-2" size="20px"/>   
                                      Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                  onClick={() => handleView(user._id)}
                                      className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3"             
                                    >
                                      <GrView className="inline mr-2" size="20px"/> 
                                     View
                                    </Link>
                                  </li>
                            
                                  <li>
                                    <Link
                                      /* onClick={() => handleBlock(user._id, user.block)}*/
                                      className={`font-medium text-sm ${
                                        user.block
                                          ? "text-green-500"
                                          : "text-red-500"
                                      } hover:text-rose-600 flex py-1 px-3`}
                                      to="#0"
                                    >
                                       {user.block ? <TiTick className="inline mr-2" size="20px"/> : <MdOutlineDangerous className="inline mr-2" size="20px" />} 
                                      {user.block ? "Unblock" : "Block"}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link
                                      /*onClick={() => handleDelete(user._id)} */ className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                                      to="#0"
                                    >

                                       <MdDelete className="inline mr-2" size="20px"/>
                                      Delete
                                    </Link>
                                  </li>
                         
                                </EditMenu>
                              </td>
                            </tr>
                          ))
                      )}
                      
                      {/* <Pagination className=" justify-center"/> */}
                    </tbody>
                   
                  </table>
                  
                </div>
              </div>


             
            </div>
          </div>
        </main>
      </div>

      {/* Add User modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddUserForm
            closeModal={() => setIsModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}

      {/* Edit User modal */}
      {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditUserForm
            userData={selectedUserForEdit}
            closeModal={() => setIsEditModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}

{/*View Model*/ }
{
  isViewUserModelOpen && selectedUserToView &&(
    <div className=" bg-black bg-opacity-50 flex items-center justify-center">

<ViewUser
userData={selectedUserToView}
closeModal={()=>setisViewUserModelOpen(false)}
fetchDataFromApi={fetchDataFromApi}
accessToken={accessToken}

/>

    </div>
  )
}




    </div>
  );
};

export default User;
