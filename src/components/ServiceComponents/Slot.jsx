import React, { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const Slot = ({ timeSlots, accessToken, fetchDataFromApi }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeToDelete, setTimeToDelete] = useState(null);

  const handleDelete = async (timeslotId) => {
    try {
      const result = await axios.post(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/timeSlot/delete",
        { timeRanges: [timeslotId] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setTimeToDelete(result);

      setShowConfirmation(false);
      fetchDataFromApi();
      toast.success("Slot deleted permanently");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteConfirmation = (timeslotId) => {
    setTimeToDelete(timeslotId); // Set the time slot to delete
    setShowConfirmation(true); // Show the confirmation dialog
  };

  return (
    <div className="time-slot-container">
      <div className="time-slots grid grid-cols-3 gap-4">
        {timeSlots.timeRanges.map((timeRange, index) => (
          <div key={index} className="relative">
            <div className="time-slot bg-green-500 text-white rounded-md flex items-center justify-center p-2">
              <span>{timeRange}</span>
            </div>
            <button
              className="absolute top-1 right-0"
              onClick={() => handleDeleteConfirmation(timeRange)}
              style={{ padding: "0.3rem" }}
            >
              <svg
                className="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4">
              Are you sure you want to delete this time slot?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDelete(timeToDelete)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slot;
