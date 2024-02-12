// user.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import EditMenu from '../../components/DropdownEditMenu';
import AddUserForm from './AddUserForm';
import EditUserForm from './EditUserForm';
import notfound from '../../images/Notfound.svg'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { Breadcrumb } from 'antd';

const User = () => {
  const [search,setSearch]=useState('')

 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
 const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"; // Replace with your actual access token
//const accessToken=localStorage.getItem('authToken')

  const fetchDataFromApi = async () => {
    try {//
  // const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/user/findAll");
   const result = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllusers");
     
//console.log(result.data)

const userData= result.data
setData(userData)
console.log(userData)
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
    const userToEdit = data.find((user) => user._id === userId);
    setSelectedUserForEdit(userToEdit);
    setIsEditModalOpen(true);
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

          <Breadcrumb className='mb-5'
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Users</span>
          </>
        ),
      },
      {
        title: 'All Users',
      },
    ]}
  />
    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-3xl">All Users</h2>
         
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
         
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton />
                <Datepicker />
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add User</span>
                </button>
                
              </div>
            </div>
    

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                
                <div className="flex items-center">
            <input
              type="text"
              placeholder="Search users"
              onChange={(e)=>setSearch(e.target.value)}
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
                          <div className="font-semibold text-left">First Name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Last Name</div>
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
                          <div className="font-semibold text-center">Created At</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {/* {data
                     .filter((user) =>
                     search.toLowerCase() === "" ||
                     (user.First_name && user.Email.toLowerCase().includes(search.toLowerCase()))
               )
                      .map((user, index) => ( */}


{data.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">
                            <img src={notfound} alt="No Users Found" className="mx-auto" />
                            <div>No users found.</div>
                          </td>
                        </tr>
                      ) : (
                        data
                          .filter((user) => search.toLowerCase() === "" || user.Email.toLowerCase().includes(search.toLowerCase()))
                          .map((user, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <div className="flex items-center">
                              <div className="text-slate-800 dark:text-slate-100">{user.First_name}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.Last_name}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.Email}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.phone_number}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.DOB}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{user.updatedAt}</div>
                          </td>
                          <td className="p-2" align="center">
                            <EditMenu align="right" className="relative inline-flex">
                              <li>
                                <Link
                                /* onClick={() => handleBlock(user._id, user.block)}*/
                                  className={`font-medium text-sm ${user.block ? 'text-green-500' : 'text-red-500'} hover:text-rose-600 flex py-1 px-3`}
                                  to="#0"
                                >
                                  {user.block ? 'Unblock' : 'Block'}
                                </Link>
                              </li>
                              <li>
                                <Link onClick={() => handleEdit(user._id)} className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3" to="#0">
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link /*onClick={() => handleDelete(user._id)} */className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                                  Delete
                                </Link>
                              </li>
                            </EditMenu>
                          </td>
                        </tr>
                      ))
                    )}
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
          <AddUserForm closeModal={() => setIsModalOpen(false)} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
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
    </div>
  );
};

export default User;
