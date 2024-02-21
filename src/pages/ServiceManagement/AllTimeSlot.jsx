// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../../partials/Sidebar";
// import Header from "../../partials/Header";
// import EditMenu from "../../components/DropdownEditMenu";
// import { HomeOutlined, UserOutlined } from "@ant-design/icons";
// import { Breadcrumb } from "antd";
// import AddTimeSlot from "./AddTimeSlot";

// const AllTimeSlot = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const accessToken = localStorage.getItem("authToken");
//   // const fetchDataFromApi = async () => {
//   //   try {
//   //     const result = await axios.get(
//   //       "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeslot/getAll"
//   //     );
//   //     setData(result.data);
//   //   } catch (error) {
//   //     setError(error);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const [timeSlots, setTimeSlots] = useState([]);

//   useEffect(() => {
//     // Fetch time slots from the API when the component mounts
//     const fetchDataFromApi = async () => {
//       try {
//         const result = await axios.get('http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeslot/getAllt');
//         setTimeSlots(result.data);
//       } catch (error) {
//         console.error('Error fetching time slots:', error);
//       } finally {
//             setLoading(false);
//           }
//     };

//     fetchDataFromApi();
//   }, []);

//   const handleDelete = async (timeslotId) => {
//     try {
//       const result = await axios.post(
//         "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeslot/delete",
//         {
//           timeslotID: timeslotId, // Renamed to timeslotID
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log(result);
//       fetchDataFromApi(); // Refresh data after deletion
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDataFromApi();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {/* Sidebar component */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//         {/* Header component */}
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         <main>
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             {/* Breadcrumb */}
//             <Breadcrumb
//               className="mb-5"
//               items={[
//                 { title: <HomeOutlined /> },
//                 {
//                   title: (
//                     <>
//                       <UserOutlined />
//                       <span>Service</span>
//                     </>
//                   ),
//                 },
//                 { title: "All Time Slots" },
//               ]}
//             />
//             {/* Page title */}
//             <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
//               All Time Slots
//             </h2>

//             {/* Table */}
//             <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
//               {/* Table header */}
//               <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
//                 {/* Add Appointment button */}
//                 <button
//                   className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
//                   onClick={() => setIsModalOpen(true)}
//                 >
//                   <svg
//                     className="w-4 h-4 fill-current opacity-50 shrink-0"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
//                   </svg>
//                   <span className="hidden xs:block ml-2">Add TimeSlot</span>
//                 </button>
//                 {/* Search input */}
//                 <div className="flex items-center">
//                   <input
//                     type="text"
//                     placeholder="Search Partner"
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="border p-1 w-64 rounded focus:outline-none focus:ring focus:border-indigo-500"
//                   />
//                 </div>
//               </header>
//               {/* Table body */}
//               <div className="p-3">
//                 <div className="overflow-x-auto">
//                   {/* <table className="table-auto w-full dark:text-slate-300">
//                     <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
//                       <tr>
//                         <th className="p-2">
//                           <div className="font-semibold text-center">Timeslot</div>
//                         </th>
                       
//                       </tr>
//                     </thead>
//                     <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                    
                  
//                     {data.map((time) => (
//                         <tr key={time._id}>
                     
     
//       <td className="p-2">
//         <div className="text-center">{time.timeRanges}</div>
//       </td>
      
//                           <td className="p-2" align="center">
//                             <EditMenu align="right" className="relative inline-flex">
//                            < Link
//                                     onClick={() => handleDelete(time._id)}
//                                     className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
//                                     to="#0"
//                                   >
//                                   <MdDelete className="inline mr-1" size="20px"/> 
//                                    Delete
//                                   </Link>
//                             </EditMenu>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table> */}

//                   <div className="time-slot-container">
//                     {/* Render the list of time slots as small rectangles */}
//                     <div className="time-slots">
//                       {timeSlots
//                         .sort((a, b) => a.localeCompare(b)) // Sort time slots in increasing order
//                         .map((slot, index) => (
//                           <div key={index} className="time-slot">
//                             {slot}
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <AddTimeSlot
//             closeModal={() => setIsModalOpen(false)}
//             fetchDataFromApi={fetchDataFromApi}
//             accessToken={accessToken}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllTimeSlot;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import AddTimeSlot from "./AddTimeSlot";
import Slot from "../../components/ServiceComponents/Slot";


const AllTimeSlot = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]); // Provide a default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
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

  const handleDelete = async (timeslotId) => {
    try {
      await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeslot/delete",
        {
          timeslotID: timeslotId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTimeSlots(prevSlots => prevSlots.filter(slot => slot._id !== timeslotId));
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Breadcrumb
              className="mb-5"
              items={[
                { title: <HomeOutlined /> },
                {
                  title: (
                    <>
                      <UserOutlined />
                      <span>Service</span>
                    </>
                  ),
                },
                { title: "All Time Slots" },
              ]}
            />
            <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-8 text-4xl">
              All Time Slots
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
                  <span className="hidden xs:block ml-2">Add TimeSlot</span>
                </button>
               
              </header>
              <div className="p-3">
                <div className="overflow-x-auto">
                  <Slot timeSlots={timeSlots[0]} /> {/* Pass timeSlots data to Slot component */}
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
