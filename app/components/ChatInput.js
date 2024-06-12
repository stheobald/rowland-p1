import React from 'react';
import { ArrowUpTrayIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';


const ChatInput = ({ placeholder, value, setInput, sendMessage, disclaimer }) => {
  return (
    <div className="pt-4 px-3 border-t border-gray-300">
      <div className="flex items-center flex-grow">
          <div className="flex flex-grow flex-row p-2 border border-gray-300 rounded-lg">
            <input
            type="text"
            value={value}  
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={placeholder}
            className="flex-grow w-full mr-3"
            />
            <ArrowUpTrayIcon className="h-6 w-6 text-gray-300 hover:text-gray-500 mr-1 cursor-pointer"/>
          </div>
        <PaperAirplaneIcon className="h-6 w-6 text-green-400 hover:text-green-500 ml-3 cursor-pointer transform -rotate-45" onClick={sendMessage} />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        {disclaimer}
      </p>
    </div>
  );
};

export default ChatInput;