import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import EditMenu from '../../components/DropdownEditMenu';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import capitalizeFirstLetter, {dateFormatterWithoutTime } from '../../components/CapitalizeFunction';

import AddTimeSlot from './AddTimeSlot';

const AllAppointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get("http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllAppointments");
      setData(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
      const accessToken=localStorage.getItem('authToken')
  useEffect(() => {
    fetchDataFromApi();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header component */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Breadcrumb */}
            <Breadcrumb className='mb-5' items={[
              { title: <HomeOutlined /> },
              { title: (
                  <>
                    <UserOutlined />
                    <span>Appointments</span>
                  </>
                )},
              { title: 'All Appointments' },
            ]} />
            {/* Page title */}
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">All Appointments</h2>

            {/* Table */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              {/* Table header */}
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                {/* Add Appointment button */}
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add TimeSlot</span>
                </button>
                {/* Search input */}
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search Partner" 
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-1 w-64 rounded focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>
              </header>
              {/* Table body */}
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-slate-300">
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">Customer Image</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Customer Name</div>
                        </th>
                        {/* <th className="p-2">
                          <div className="font-semibold text-center">Partner Name</div>
                        </th> */}
                        <th className="p-2">
                          <div className="font-semibold text-center">Service</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Time Slot</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Appointment Date</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Appointment Phone</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Status</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    
                    {/* //   filter((user) =>
                    //     search.toLowerCase() === "" ||
                    //     (user.First_name && user.Email.toLowerCase().includes(search.toLowerCase()))
                    //   ). */}
                    {data.payload.filter((appointment) =>
    search.toLowerCase() === "" ||
    (appointment.userId.First_name && appointment.vendorId.First_name.toLowerCase().includes(search.toLowerCase()))
  ).map((appointment) => (
                        <tr key={appointment._id}>
                     <td className="p-2">
                              <div className="text-center object-contain object-center ">
                                <img src={appointment.userId.image} alt={appointment.userId.First_name} className="h-12 w-12 rounded-full mx-auto" />
                              </div>
                            </td>
      <td className="p-2">
        <div className="text-center">{capitalizeFirstLetter(appointment.userId.First_name)} {capitalizeFirstLetter(appointment.userId.Last_name)}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{capitalizeFirstLetter(appointment.vendorId?appointment.vendorId.First_name:'No Name Found')} {capitalizeFirstLetter(appointment.vendorId?appointment.vendorId.Last_name:'')}</div>
      </td>
      {/* <td className="p-2">
        <div className="text-center">{capitalizeFirstLetter(appointment.itemId.itemName)}</div>
      </td> */}
      <td className="p-2">
        <div className="text-center">{appointment.selectedTimeSlot}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{dateFormatterWithoutTime(appointment.appointmentDate)}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{appointment.phone_number}</div>
      </td>
      <td className="p-2">
        <div className="text-center">{capitalizeFirstLetter(appointment.status)}</div>
      </td>
                          <td className="p-2" align="center">
                            <EditMenu align="right" className="relative inline-flex">
                              {/* Add action buttons here */}
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
          <AddTimeSlot
          closeModal={() => setIsModalOpen(false)} fetchDataFromApi={fetchDataFromApi} accessToken={accessToken} />
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
