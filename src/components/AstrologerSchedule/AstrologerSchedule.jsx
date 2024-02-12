import React, { useState } from 'react';
const AstrologerSchedule = () => {
  const [availability, setAvailability] = useState({
    calls: true,
    messages: false,
    liveSessions: true,
  });

  const toggleAvailability = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
<div class="container mx-auto p-8">
  <h1 class="text-3xl font-bold mb-4">Astrologers</h1>
       <div className="flex space-x-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Availability</h2>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="calls"
                checked={availability.calls}
                onChange={() => toggleAvailability('calls')}
                className="mr-2"
              />
              <label htmlFor="calls">Calls</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="messages"
                checked={availability.messages}
                onChange={() => toggleAvailability('messages')}
                className="mr-2"
              />
              <label htmlFor="messages">Messages</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="liveSessions"
                checked={availability.liveSessions}
                onChange={() => toggleAvailability('liveSessions')}
                className="mr-2"
              />
              <label htmlFor="liveSessions">Live Sessions</label>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Schedule</h2>
          {/* Your schedule management UI goes here */}
          <p>Your schedule management UI goes here.</p>
        </div>
      </div>
    </div>
  );
};

export default AstrologerSchedule;
