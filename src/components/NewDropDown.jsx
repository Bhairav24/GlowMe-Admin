import React from 'react';

export default function NewDropDown({ setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <select
        className="border px-2 py-0.5 rounded w-36 mb-4"
        name="partners"
        onChange={handleChange}
      >
        <option value="all">All Partners</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
