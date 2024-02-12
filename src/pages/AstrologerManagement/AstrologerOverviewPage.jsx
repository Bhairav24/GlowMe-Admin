import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import EditMenu from '../../components/DropdownEditMenu';

import EditAstrologer from './EditAstrologer';
import AddAstrologer from './AddAstrologer';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { Breadcrumb } from 'antd';

const AstrologerOverviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
 const [search,setSearch]=useState('')

 const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"; 
 // const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual bearer token
//const accessToken=localStorage.getItem('authToken')
  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllvendors");
     const vendorData=result.data;
     
     console.log(vendorData)
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
    const userToEdit = data.find((user) => user._id === astrologerId);
    setSelectedUserForEdit(userToEdit);
    setIsEditModalOpen(true);
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
            "Content-Type": "application/json",
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
            <span>Partners</span>
          </>
        ),
      },
      {
        title: 'All Partners',
      },
    ]}
  />
    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-3xl">All Partners</h2>
         

            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
               
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Partner</span>
                </button>
                <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
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
                          <div className="font-semibold text-center">Name</div>
                        </th>
                        
                        <th className="p-2">
                          <div className="font-semibold text-center">Email</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Phone Number</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Gender</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Address</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Onboarded At</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">KYC Status</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Action</div>
                        </th>

                        
                      </tr>     
                   </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                      {data.filter((user) =>
                          search.toLowerCase() === "" ||
                          (user.First_name && user.Email.toLowerCase().includes(search.toLowerCase()))
                          ).map((astrologer) => (
                        <tr key={astrologer._id}>
                          <td className="p-2">
                            <div className="text-center">{astrologer.First_name} {astrologer.Last_name}</div>
                          </td>
                          
                          <td className="p-2">
                            <div className="text-center">{astrologer.Email}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.phone_number}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.Gender}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">
                            {astrologer && astrologer.Address && (
      ` ${astrologer.Address.area},${astrologer.Address.city},
      ${astrologer.Address.country},   ${astrologer.Address.pincode},`

    )}
                            
                            </div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">{astrologer.createdAt}</div>
                          </td>
                          <td className="p-2">
                            <div className="text-center">Status</div>
                          </td>
                          <td className="p-2" align="center">
                                <EditMenu align="right" className="relative inline-flex">
                                  <li>
                                    <Link
                                      onClick={() => handleBlock(astrologer._id, astrologer.block)}
                                      className={`font-medium text-sm ${astrologer.block ? 'text-green-500' : 'text-red-500'} hover:text-rose-600 flex py-1 px-3`}
                                      to="#0"
                                    >
                                      {astrologer.block ? 'Unblock' : 'Block'}
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => handleEdit(astrologer._id)} className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3" to="#0">
                                      Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link onClick={() => handleDelete(astrologer._id)} className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
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
          closeModal={() => setIsModalOpen(false)} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
        </div>
      )}

         {/* EditAstrologer User modal */}
         {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditAstrologer
          
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

export default AstrologerOverviewPage;
