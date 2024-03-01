import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import EditMenu from '../../components/DropdownEditMenu';
import AddServices from './AddServices';
import EditServices from './EditServices';
import {toast} from 'react-toastify'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import BreadCrumbs from '../../components/BreadCrumbs';
import Buttons from '../../components/Buttons';
// import EditAstrologer from './EditAstrologer';
// import AddAstrologer from './AddAstrologer';

const AllServices = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
 const [search,setSearch]=useState('')

 //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"; 
 // const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual bearer token
const accessToken=localStorage.getItem('authToken')
const fetchDataFromApi = async () => {
    try {
      const response = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getServicesCatogory");
      const serviceData = await response.data.payload;
      console.log("Service data:", serviceData);
      setData(serviceData);
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
    return <div>Error: {toast.error(error.message)}</div>;
  }
 

  const handleEdit = (serviceId) => {
    const userToEdit = data.find((service) => service._id === serviceId);
    setSelectedUserForEdit(userToEdit);
    setIsEditModalOpen(true);
  };

  
  
  
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* ... other code ... */}
            <BreadCrumbs currentPage='Service' parentPage='All Services'/>
    <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">All Services</h2>

         
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <Buttons buttonName='Create New Service' modelOpen={() => setIsModalOpen(true)}/>

                
                <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
             onChange={(e)=>setSearch(e.target.value)}
              className="border p-1 w-64 rounded focus:outline-none focus:ring focus:border-indigo-500"
            />
          </div>

                            </header>


              <div className="p-3 ">
                <div className="overflow-x-auto ">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-MAROON underline dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center ">Image</div>
                        </th>
                        
                        <th className="p-2">
                          <div className="font-semibold text-center">Service Name</div>
                        </th>
                        {/* <th className="p-2">
                          <div className="font-semibold text-center">Price</div>
                        </th> */}
                        <th className="p-2">
                          <div className="font-semibold text-center">Action</div>
                        </th>
                        
                      </tr>     
                   </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    {data
                     .filter((serviceType) =>
                     search.toLowerCase() === "" ||
                     (serviceType.name.toLowerCase().includes(search.toLowerCase()))
               )
                      .map((serviceType, index) => (
                        <tr key={index}>
                           <td className="p-2">
                              <div className="text-center object-contain object-center  text-CUSTOM_BLACK">
                                <img src={serviceType.url} alt={serviceType.name} className="h-16 w-16 rounded-full mx-auto" />
                              </div>
                            </td>
                                                
                          <td className="p-2">
                            <div className="text-center">{serviceType.name}</div>
                          </td>
                          {/* <td className="p-2">
                            <div className="text-center">{serviceType.price}</div>
                          </td> */}
                        
                          
                         
                          <td className="p-2" align="center">
                                <EditMenu align="right" className="relative inline-flex">
                                
                                  <li>
                                    <Link onClick={() => handleEdit(serviceType._id)}  className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3" to="#0">
                                      Edit
                                    </Link>
                                  </li>
                                  <li>
                                    <Link  className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
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
          <AddServices
          closeModal={() => setIsModalOpen(false)} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
        </div>
      )}

         {/* Edit Services User modal */}
           {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditServices
          
            serviceData={selectedUserForEdit}
            closeModal={() => setIsEditModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}  
    </div>
  );
};

export default AllServices;
