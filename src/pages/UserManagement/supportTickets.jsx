import React, { useState, useEffect } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

const SupportTickets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  // ... (previous code)

  useEffect(() => {
    // Function to fetch support tickets
    const fetchSupportTickets = async () => {
      try {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzlhZmQ4YWY0ZDMxMzM0M2I3M2FhMyIsImlhdCI6MTcwNDc5ODU3OX0.60LQ2LOrh-ObilgJjYl3sGFUFLRWnED8NTDnAGQFWYQ'; // Replace 'your_bearer_token' with the actual token
        const response = await fetch('http://ec2-13-233-152-110.ap-south-1.compute.amazonaws.com:5000/support/getChatByUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming the tickets are in the 'tickets' property of the response
          setTickets(data.tickets); // Update state with fetched tickets
        } else {
          console.error('Failed to fetch support tickets');
        }
      } catch (error) {
        console.error('Error fetching support tickets:', error);
      }
    };

    // Call the fetch function
    fetchSupportTickets();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  // ... (rest of the code)


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
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-semibold text-blue-600 mb-2">{ticket.user}</p>
                  <p className="text-gray-800 mb-2">{ticket.subject}</p>
                  <p className={`text-${ticket.status === 'Closed' ? 'red' : 'green'}-500 font-semibold mb-2`}>{ticket.status}</p>
                  <p className="text-gray-500 text-sm">{new Date(ticket.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No support tickets available.</p>
            )}
          </div>
        </main>


      </div>
    </div>
  );
};

export default SupportTickets;
