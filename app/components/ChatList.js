import React from 'react';

const ChatList = () => {
  return (
    <div className="bg-gray-100 w-1/4 p-4 overflow-y-auto rounded">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Today</h2>
        <ul>
          <li className="p-2 border-b border-gray-300">Chat Session 1</li>
          <li className="p-2 border-b border-gray-300">Chat Session 2</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Yesterday</h2>
        <ul>
          <li className="p-2 border-b border-gray-300">Chat Session 3</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">September</h2>
        <ul>
          <li className="p-2 border-b border-gray-300">Chat Session 4</li>
          <li className="p-2 border-b border-gray-300">Chat Session 5</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatList;