import React from "react";
import { dateFormatter } from "../../components/CapitalizeFunction";
const ViewUser = ({ userData, closeModal }) => {
  console.log(userData)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
    <div className="bg-white p-8 rounded-lg max-w-lg w-full">
      <div className="mb-4 flex justify-center">
        <img
          src={userData.image}
          alt="Vendor"
          className="w-14 h-14  rounded-lg"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">User Details</h2>
     
      
        <div>
          
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {userData.First_name} {userData.Last_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {userData.Email}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {userData.phone_number}
          </p>
          <p>
            <span className="font-semibold">DOB:</span> {userData.DOB}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {userData.Gender}
          </p>
        
       
          <p className="font-semibold">Address:</p>
          {userData.Address && ( // Check if Address exists
            <ul className="list-disc pl-4 mb-4">
              <li>Area: {userData.Address.area}</li>
              <li>City: {userData.Address.city}</li>
              <li>Country: {userData.Address.country}</li>
              <li>District: {userData.Address.district}</li>
              <li>Pincode: {userData.Address.pincode}</li>
            </ul>
          )}


          <p>
            <span className="font-semibold">Services:</span> {[userData.Services]}
          </p>

          <p>
            <span className="font-semibold">Appointments:</span> {userData.appointments}
          </p>
          <p>
            <span className="font-semibold">On Boarded On :</span> {dateFormatter(userData.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span> {dateFormatter(userData.updatedAt)}
          </p>
          <p>
            <span className="font-semibold">Offers:</span> {[userData.offers]}
          </p>
          <p>
  <span className="font-semibold">Coupons:</span>{" "}
  {userData.coupons && userData.coupons.length}
</p>

          <p>
            <span className="font-semibold">Wallet Balance:</span> {userData.walletBalance}
          </p>

<div className="flex justify-center">



<button
            onClick={closeModal}
            className="bg-red-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded "
          >
            Close
          </button>
</div>
        
        </div>
     
    </div>
  </div>
  
  );
};

export default ViewUser;
