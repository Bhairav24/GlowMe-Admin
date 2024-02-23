import React from "react";
import { dateFormatter } from "../../components/CapitalizeFunction";
import { UserOutlined } from "@ant-design/icons";
const ViewAstrologer = ({ vendorData, closeModal }) => {
  console.log(vendorData)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
    <div className="bg-white p-8 rounded-lg max-w-lg w-full">
      <div className="mb-4 flex justify-center">
     {vendorData.image? (<img
          src={vendorData.image}
          alt="Vendor"
          className="w-14 h-14 rounded-lg"
        />):(<img
          src={UserOutlined}
          alt="Vendor"
          className="w-14 h-14 rounded-lg"
        />)
     
    
    }  
      </div>
      <h2 className="text-xl font-semibold mb-2 text-center">Vendor Details</h2>
     
      
        <div>
          
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {vendorData.First_name} {vendorData.Last_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {vendorData.Email}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span>{" "}
            {vendorData.phone_number}
          </p>
          <p>
            <span className="font-semibold">DOB:</span> {vendorData.DOB}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {vendorData.Gender}
          </p>
        
       
          <p className="font-semibold">Address:</p>
          {vendorData.Address && ( // Check if Address exists
            <ul className="list-disc pl-4 mb-4">
              <li>Area: {vendorData.Address.area}</li>
              <li>City: {vendorData.Address.city}</li>
              <li>Country: {vendorData.Address.country}</li>
              <li>District: {vendorData.Address.district}</li>
              <li>Pincode: {vendorData.Address.pincode}</li>
            </ul>
          )}


          <p>
            <span className="font-semibold">Services:</span> {[vendorData.Services]}
          </p>

          <p>
            <span className="font-semibold">Appointments:</span> {vendorData.appointments}
          </p>
          <p>
            <span className="font-semibold">On Boarded On :</span> {dateFormatter(vendorData.createdAt)}
          </p>
          <p>
            <span className="font-semibold">Updated At:</span> {dateFormatter(vendorData.updatedAt)}
          </p>



          </div>

          <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="bg-red-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded mt-6 flex justify-center"
          >
            Close
          </button>
          </div>
         
       
     
    </div>
  </div>
  
  );
};

export default ViewAstrologer;
