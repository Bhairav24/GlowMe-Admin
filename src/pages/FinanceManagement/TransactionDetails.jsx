import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const TransactionDetails = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'dummy-api-endpoint' with your actual API endpoint
                const response = await axios.get('dummy-api-endpoint');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Rest of your component code...

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/* Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            {/* Transaction table */}
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* ... (rest of your table code) */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    onClick={() => handleRefund(transaction.id)}
                                                >
                                                    Refund
                                                </button>
                                                <button
                                                    className="text-blue-600 hover:text-blue-900"
                                                    onClick={() => handleAdjust(transaction.id)}
                                                >
                                                    Adjust
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default TransactionDetails;


// // ... (import statements)

// const TransactionDetails = () => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [transactions, setTransactions] = useState([
//         // Sample transactions, replace with actual data
//         { id: 1, description: 'Transaction 1', amount: 100.00 },
//         { id: 2, description: 'Transaction 2', amount: 50.00 },
//         // Add more transactions as needed
//     ]);

//     const handleRefund = (transactionId) => {
//         // Implement your refund logic here
//         console.log(`Refund initiated for transaction ${transactionId}`);
//     };

//     const handleAdjust = (transactionId) => {
//         // Implement your adjust logic here
//         console.log(`Adjust initiated for transaction ${transactionId}`);
//     };

//     return (
//         <>
//             <div className="flex h-screen overflow-hidden">
//                 {/* Sidebar */}
//                 <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//                 {/* Content area */}
//                 <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
//                     {/* Site header */}
//                     <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//                     <main>
//                         <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//                             {/* Transaction table */}
//                             <table className="min-w-full divide-y divide-gray-200">
//                                 <thead>
//                                     <tr>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white divide-y divide-gray-200">
//                                     {transactions.map(transaction => (
//                                         <tr key={transaction.id}>
//                                             <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">{transaction.description}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">{transaction.amount}</td>
//                                             <td className="px-6 py-4 whitespace-nowrap">
//                                                 <button
//                                                     className="text-indigo-600 hover:text-indigo-900 mr-2"
//                                                     onClick={() => handleRefund(transaction.id)}
//                                                 >
//                                                     Refund
//                                                 </button>
//                                                 <button
//                                                     className="text-blue-600 hover:text-blue-900"
//                                                     onClick={() => handleAdjust(transaction.id)}
//                                                 >
//                                                     Adjust
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default TransactionDetails;
