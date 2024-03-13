import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import EditMenu from "../../components/DropdownEditMenu";
import BreadCrumbs from "../../components/BreadCrumbs";
import capitalizeFirstLetter, {
  dateFormatterWithoutTime,
} from "../../components/CapitalizeFunction";
import { VendorDropdown } from "../../components/NewDropDown";
import AddTimeSlot from "./AddTimeSlot";
import SearchBar from "../../components/SearchBar";

const AllAppointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState("all");
  const accessToken = localStorage.getItem("authToken");

  const fetchDataFromApi = async () => {
    try {
      const result = await axios.get(
        "http://ec2-13-233-113-80.ap-south-1.compute.amazonaws.com:5000/admin/getAllAppointments"
      );
      console.log(result);
      const appointmentData = result.data.payload.reverse();

      setData(appointmentData);
      console.log(appointmentData);
    } catch (error) {
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
  const filteredAppointmentsData = data.filter((appointment) => {
    if (filteredAppointments === "all") {
      return true;
    } else {
      return appointment.status === filteredAppointments;
    }
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar component */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header component */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl font-heading mx-auto">
            {/* Breadcrumb */}
            <BreadCrumbs currentPage="All Appointments" parentPage="Service" />
            {/* Page title */}
            <div className="flex items-center  justify-between mb-6">
              <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-4xl">
                All Appointments
              </h2>

              {/* <SearchBar Search={(e) => setSearch(e.target.value)}/> */}
            </div>
            {/* Table */}
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
              {/* Table header */}

              <header className="px-4 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <VendorDropdown
                  setFilteredAppointments={setFilteredAppointments}
                />
              </header>
              {/* Table body */}

              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full  dark:text-slate-300">
                    <thead className="text-xs uppercase text-MAROON underline dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Customer Image
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Customer Name
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Partner Name
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Service
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Time Slot
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Appointment Date
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Appointment Phone
                          </div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">
                            Status
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium divide-y divide-slate-100 text-CUSTOM_BLACK dark:divide-slate-700">
                      {/* //   filter((user) =>
                    //     search.toLowerCase() === "" ||
                    //     (user.First_name && user.Email.toLowerCase().includes(search.toLowerCase()))
                    //   ). */}
                      {filteredAppointmentsData
                        .filter(
                          (appointment) =>
                            search.toLowerCase() === "" ||
                            (appointment.userId.First_name &&
                              appointment.vendorId.First_name.toLowerCase().includes(
                                search.toLowerCase()
                              ))
                        )
                        .map((appointment) => (
                          <tr key={appointment._id}>
                            <td className="p-2">
                              <div className="text-center object-contain object-center ">
                                <img
                                  src={appointment.userId.image}
                                  alt={appointment.userId.First_name}
                                  className="h-12 w-12 rounded-full mx-auto"
                                />
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-CUSTOM_BLACK">
                                {capitalizeFirstLetter(
                                  appointment.userId.First_name
                                )}{" "}
                                {capitalizeFirstLetter(
                                  appointment.userId.Last_name
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center  text-CUSTOM_BLACK">
                                {capitalizeFirstLetter(
                                  appointment.vendorId
                                    ? appointment.vendorId.First_name
                                    : "No Name Found"
                                )}{" "}
                                {capitalizeFirstLetter(
                                  appointment.vendorId
                                    ? appointment.vendorId.Last_name
                                    : ""
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {" "}
                                {appointment.itemIds.map(
                                  (appointmentType, index) => (
                                    <div key={index}>
                                      {/* Assuming appointmentId is the ID of each appointment */}
                                      {appointmentType.itemName}
                                    </div>
                                  )
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center  text-CUSTOM_BLACK">
                                {appointment.selectedTimeSlot}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center  text-CUSTOM_BLACK">
                                {dateFormatterWithoutTime(
                                  appointment.appointmentDate
                                )}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center text-CUSTOM_BLACK">
                                {appointment.vendorId &&
                                appointment.vendorId.phone_number
                                  ? appointment.vendorId.phone_number
                                  : "Not Found :("}
                              </div>
                            </td>

                            <td className="p-2">
                              <div className="text-right text-CUSTOM_BLACK">
                                {appointment.status === "cancelled" ? (
                                  <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                    Cancelled
                                  </span>
                                ) : appointment.status === "confirmed" ? (
                                  <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                    Confirmed
                                  </span>
                                ) : (
                                  <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                    Pending
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="p-2" align="center">
                              <EditMenu
                                align="right"
                                className="relative inline-flex"
                              >
                                {/* Add action buttons here */}
                              </EditMenu>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
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

export default AllAppointments;
