import React from 'react';

export default function NewDropDown({ setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className='text-CUSTOM_BLACK font-heading '>
      <select
        className="focus:ring-0  focus:border-MAROON px-2 py-0.5  rounded w-36 mb-4"
        name="partners"
        onChange={handleChange}
      >
        <option value="all">All Partners</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
     {/* <option value="rejected">Rejected</option> */}
      </select>
    </div>
  );
}


export const VendorDropdown=({setFilteredAppointments})=>{
  const handleChange = (event) => {
    setFilteredAppointments(event.target.value);
  };

  return(
    <div className='text-CUSTOM_BLACK font-heading '>
      <select
        className="focus:ring-0  focus:border-MAROON px-2 py-0.5  rounded w-40 mb-4"
        name="partners"
        onChange={handleChange}
      >
        <option value="all">All Appointments</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  )
}
