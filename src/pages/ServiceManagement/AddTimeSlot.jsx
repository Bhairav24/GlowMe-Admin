

// import axios from 'axios';
// import React, { useState } from 'react';
// import {toast} from 'react-toastify'

// export default function AddTimeSlot({ closeModal, fetchDataFromApi, accessToken }) {

//   const [timeRange, setTimeRange] = useState(['', '']); // Array to store start and end time

//   const handleChange = (index, value) => {
//     const updatedTimeRange = [...timeRange];
//     updatedTimeRange[index] = value;
//     setTimeRange(updatedTimeRange);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await axios.post(
//         'http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeSlot/create',
//         { 
//           timeRanges: [timeRange] }, 
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         }
//       );
//       console.log(result)
//       fetchDataFromApi();
//       closeModal();
//       toast.success('Time Slot Added!');
//     } catch (error) {
//       toast.error('Something went wrong :(')
//       console.log(error);
//     }
//   }

//   return (
//     <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
//       <div className="flex justify-end">
//         <button className="text-MAROON hover:DARK_CREAM" onClick={closeModal}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//       <h2 className="text-2xl font-semibold mb-4 text-center text-MAROON ">Add Time-slot</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-CUSTOM_BLACK text-sm font-bold mb-2">Time Ranges </label>
//           <input
//             type="time"
//             value={timeRange[0]}
//             onChange={(e) => handleChange(0, e.target.value)}
//             className="mb-2 p-2 border border-slate-200 rounded-sm mx-2"
//           />

//           -
//            <input
//             type="time"
//             value={timeRange[1]}
//             onChange={(e) => handleChange(1, e.target.value)}
//             className="mb-2 p-2 border border-slate-200 rounded-sm mx-2"
//           />
//         </div>
//         <div className='flex justify-center'>
//         <button type="submit" className="btn bg-MAROON hover:bg-DARK_CREAM text-white">
//           Add
//         </button>




//         </div>
        
//       </form>
//     </div>
//   )
// }





import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
export default function AddTimeSlot({ closeModal, fetchDataFromApi, accessToken }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeSlot/create',
        { 
          timeRanges: [`${startTime} - ${endTime}`] // Format time range as "start - end"
        }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log(result);
      fetchDataFromApi();
      closeModal();
      toast.success('Time Slot Added!');
    } catch (error) {
      toast.error('Something went wrong :(');
      console.log(error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 shadow-lg rounded-sm">
      <div className="flex justify-end">
        <button className="text-MAROON hover:DARK_CREAM" onClick={closeModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center text-MAROON ">Add Time-slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-CUSTOM_BLACK text-sm font-bold mb-2">Time Ranges </label>
         

           <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mb-2 p-2 border border-slate-200 rounded-sm mx-2"
          /> 

          -
           <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mb-2 p-2 border border-slate-200 rounded-sm mx-2"
          />
        </div>
        <div className='flex justify-center'>
        <button type="submit" className="btn bg-MAROON hover:bg-DARK_CREAM text-white">
          Add
        </button>
        </div>
      </form>
    </div>
  );
}

