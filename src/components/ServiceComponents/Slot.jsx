import React from 'react';

export const Slot = ({ timeSlots }) => {
  console.log(timeSlots);

  // Check if timeSlots.timeRanges exists and has at least one item
  if (timeSlots.timeRanges && timeSlots.timeRanges.length > 0) {
    const firstTimeRange = timeSlots.timeRanges[0];

    return (
        <div className="time-slot-container">
        <div className="time-slots grid grid-cols-4 gap-4">
          {timeSlots.timeRanges.map((timeRange, index) => (
            <div key={index} className="time-slot bg-green-500 text-white rounded-md flex items-center justify-center p-2">
              <span>{timeRange}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
   else {
    // Handle the case when timeSlots.timeRanges is empty or undefined
    return (
      <div className="time-slot-container">
        <div className="time-slots grid grid-cols-4 gap-4">
          <div className="time-slot bg-red-500 text-white rounded-md flex items-center justify-center p-2">
            <span>No time ranges available</span>
          </div>
        </div>
      </div>
    );
  }
};

export default Slot;
