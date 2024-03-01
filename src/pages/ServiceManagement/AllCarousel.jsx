import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import EditMenu from '../../components/DropdownEditMenu';
import AddServices from './AddServices';

import EditCarousel from './EditCarousel';
import AddCarousel from './AddCarousel';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import BreadCrumbs from '../../components/BreadCrumbs';
import capitalizeFirstLetter from '../../components/CapitalizeFunction';
import Buttons from '../../components/Buttons';
// import EditAstrologer from './EditAstrologer';
// import AddAstrologer from './AddAstrologer';

const AllCarousel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [selectedUserForEdit, setSelectedUserForEdit] = useState(null);
 

 //const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2M2NGRjMGU3MWYxYzVmNGUwM2RiMSIsImVtYWlsIjoid2FzZWVtQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNjM5MzA2Nn0.qW547zMKOn3a2Tv6ikp0tdGcNCRTrF7SMnx5mGbNFPg"; 
 // const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual bearer token
const accessToken=localStorage.getItem('authToken')
const fetchDataFromApi = async () => {
    try {
      const response = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllSliderImages");
      const carouselData = await response.data.payload;
      console.log("Carousel data:", carouselData);
      setData(carouselData);
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
 

  const handleEdit = (carouselId) => {
    const carouselToEdit = data.find((service) => service._id === carouselId);
    setSelectedUserForEdit(carouselToEdit);
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
          
            <BreadCrumbs currentPage='Carousels' parentPage='Service'/>
               
              

<h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">Carousel</h2>
              

                     


            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
          


              <div className="p-3">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center align-items-center">
              <Buttons buttonName='Add Carousel' modelOpen={() => setIsModalOpen(true)}/>

                    </header>

                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-MAROON underline dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                    <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center  ">Image</div>
                        </th>
                        
                        <th className="p-2">
                          <div className="font-semibold text-center">Carousel Name</div>
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
                    {data.map((carouselType, index) => (
                        <tr key={index}>
                           <td className="p-2">
                              <div className="text-center object-contain object-center  ">
                                <img src={carouselType.image} alt={carouselType.name} className="h-16 w-16 rounded-full mx-auto" />
                              </div>
                            </td>
                                                
                          <td className="p-2">
                            <div className="text-center  text-CUSTOM_BLACK">{capitalizeFirstLetter(carouselType.name)}</div>
                          </td>
                          {/* <td className="p-2">
                            <div className="text-center">{serviceType.price}</div>
                          </td> */}
                        
                          
                         
                          <td className="p-2" align="center">
                                <EditMenu align="right" className="relative inline-flex">
                                
                                  <li>
                                    <Link onClick={() => handleEdit(carouselType._id)}  className="font-medium text-sm text-indigo-600 hover:text-rose-600 flex py-1 px-3" to="#0">
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
          <AddCarousel
          closeModal={() => setIsModalOpen(false)} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
        </div>
      )}

         {/* Edit Services User modal */}
           {isEditModalOpen && selectedUserForEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <EditCarousel
          
            carouselData={selectedUserForEdit}
            closeModal={() => setIsEditModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}  
    </div>
  );
};

export default AllCarousel;
