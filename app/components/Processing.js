import React from "react"
import { UserIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

const ChatMessage = ({ message, sender, time, isUser, references=[] }) => {
    if(sender == 'ai') sender = 'Rowland.AI'
    return (
      <div className={`flex first:pt-5 ${isUser ? "justify-end" : "justify-start"} mb-7`}>
        <div
          className={`relative max-w-md rounded-lg shadow p-4  basis-6/7 ${
            isUser ? "right-3 mr-1 bg-gray-100" : "left-6 ml-1 pl-5 bg-gray-50"
          } flex items-start`}
        >
          <div
            className={`absolute z-10 flex flex-row w-96 items-center ${
              isUser
                ? "-right-4 -top-5 flex-row-reverse"
                : "-left-4 -top-5"
            }`}
          >
            <div className="relative rounded-full bg-gray-200 h-10 w-10 border-2 border-white overflow-hidden">
              <Image
                src="/logo.png"
                width={40}
                height={40}
                alt="RowlandAI"
              />
            </div>
            <span className="font-semibold mx-2">{sender}</span>
            <span className="text-xs text-gray-400">{time}</span>
          </div>
          <div className={`mt-2 ${isUser ? "text-right" : "text-left"} flex-1`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  }

export default ChatMessage
