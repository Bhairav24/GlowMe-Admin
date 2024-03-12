

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";

import AddTimeSlot from "./AddTimeSlot";
import Slot from "../../components/ServiceComponents/Slot";
import EditMenu from "../../components/DropdownEditMenu";
import Buttons from '../../components/Buttons';
import BreadCrumbs from "../../components/BreadCrumbs";


const AllTimeSlot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]); // Provide a default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = localStorage.getItem("authToken");

 
    const fetchDataFromApi = async () => {
      try {
        const result = await axios.get('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeslot/getAll');
        setTimeSlots(result.data);
      } catch (error) {
        console.error('Error fetching time slots:', error);
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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full font-heading max-w-9xl mx-auto">
          <BreadCrumbs className='mb-5' currentPage='All TimeSlots' parentPage='Service'/>
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
              All Time Slots
            </h2>
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <Buttons buttonName='Add TimeSlot' modelOpen={() => setIsModalOpen(true)}/>
               
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
            
                  <Slot timeSlots={timeSlots[0]} accessToken={accessToken}  fetchDataFromApi={fetchDataFromApi} /> {/* Pass timeSlots data to Slot component */}
                </div>
               
              </div>
            </div>
          </div>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddTimeSlot
            closeModal={() => setIsModalOpen(false)}
            fetchDataFromApi={fetchDataFromApi}
            accessToken={accessToken}
          />
        </div>
      )}
    </div>
  );
};

export default AllTimeSlot;
