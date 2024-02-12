import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const SupportTickets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Placeholder data for support tickets
  const tickets = [

    // Add more ticket entries as needed
  ];

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <main className="p-4">
          <h1 className="text-3xl font-bold mb-6">Support Tickets</h1>

          {/* Display support tickets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white p-4 rounded-md shadow-md">
                <p className="font-semibold text-blue-600 mb-2">{ticket.user}</p>
                <p className="text-gray-800 mb-2">{ticket.subject}</p>
                <p className={`text-${ticket.status === 'Closed' ? 'red' : 'green'}-500 font-semibold mb-2`}>{ticket.status}</p>
                <p className="text-gray-500 text-sm">{new Date(ticket.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SupportTickets;
