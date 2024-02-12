import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import FilterButton from '../../components/DropdownFilter';
import Datepicker from '../../components/Datepicker';
import axios from 'axios';
import EditMenu from '../../components/DropdownEditMenu';
import AddAstrologer from './AddAstrologer';


const AstrologerRate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditable, setIsEditable] = useState(false)
    // State for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDataFromApi = async () => {
        try {
            const result = await axios.get("http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/astrologer/getallAstrologers"); // Replace with your actual API endpoint
            setData(result.data.payload);

            console.log(result.data.payload);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {isEditable ? (
                <Modal
                    isOpen={isEditable}
                    onRequestClose={closeModal}
                    contentLabel="Edit Astrologer Page Modal"
                    className="modal" // Use the custom modal class
                    overlayClassName="modal-overlay"
                >
                </Modal>
            ) : null}
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Dashboard actions */}
                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            {/* Right: Actions */}
                            <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                                {/* Filter button */}
                                <FilterButton />
                                {/* Datepicker built with flatpickr */}
                                <Datepicker />
                                {/* Add view button */}
                            </div>
                        </div>
                        {/* Your add page modal */}
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            contentLabel="Add Page Modal"
                            className="modal" // Use the custom modal class
                            overlayClassName="modal-overlay"
                        >
                            <AddAstrologer closeModal={closeModal} />
                        </Modal>            {/* Cards */}

                        <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100">All Astrologers</h2>
                            </header>
                            <div className="p-3">
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full dark:text-slate-300">
                                        {/* Table header */}
                                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                                            <tr>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Name</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Email</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Phone Number</div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Call Rate</div>
                                                </th>

                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Chat Rate
                                                    </div>
                                                </th>
                                                <th className="p-2">
                                                    <div className="font-semibold text-center">Action
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {/* Table body */}
                                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                            {/* Rows dynamically generated based on data */}
                                            {data.map((user, index) => (
                                                <tr key={index}>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.name}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.email}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="flex items-center">
                                                            <div className="text-slate-800 dark:text-slate-100">{user.data.phone_number}</div>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">
                                                        <div className="text-center">{user.data.numberOfCalls}</div>
                                                    </td>
                                                    <td className="p-2">
                                                        {/* <div className="text-center">{user.data.createdAt}</div> */}
                                                        <div className="text-center">{user.data.numberOfChats}</div>
                                                    </td>
                                                    <td className="p-2 text-center">
                                                        <EditMenu className="relative">
                                                            <li>
                                                                <Link
                                                                    onClick={() => handleCall(user._id)}
                                                                    className="font-medium text-sm text-black-600 hover:text-rose-600 flex py-1 px-3"
                                                                    to="#0"
                                                                >
                                                                    Update Call Rate
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link
                                                                    onClick={() => handleChat(user.data._id, user.data.block)}
                                                                    className="font-medium text-sm text-black-500 hover:text-rose-600 flex py-1 px-3"
                                                                    to="#0"
                                                                >
                                                                    Update Chat Rate
                                                                </Link>
                                                            </li>
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
        </div>
    )
}

export default AstrologerRate;
