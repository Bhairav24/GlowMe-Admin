

import axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify'

export default function AddTimeSlot({ closeModal, fetchDataFromApi, accessToken }) {
  const [timeRanges, setTimeRanges] = useState('');
  
  const handleChange = (e) => {
    setTimeRanges(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeSlot/create',
        { 
          timeRanges: timeRanges.split(',') }, // Splitting input by comma to create an array
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      console.log(result)
      fetchDataFromApi();
      closeModal();
      toast.success('Time Slot Added!');
    } catch (error) {
      toast.error('Something went wrong :(')
      console.log(error);
    }
  }

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
            type="text"
            value={timeRanges}
            onChange={handleChange}
            className="mb-2 p-2 border border-slate-200 rounded-sm w-full"
          />
        </div>
        <div className='flex justify-center'>
        <button type="submit" className="btn bg-MAROON hover:bg-DARK_CREAM text-white">
          Add
        </button>




        </div>
        
      </form>
    </div>
  )
}
