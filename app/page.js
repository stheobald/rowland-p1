"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Header from "./components/Header"
import ChatList from "./components/ChatList"
import ChatInput from "./components/ChatInput"
import ChatMessage from "./components/ChatMessage"
import ReferenceCard from "./components/ReferenceCard"
// import Processing from "./components/Processing"
// const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_URL = "ws://localhost:8000/chat"

const greeting =
  "Hi, I'm Rowland. What Landman information can I help you explore today?"
const disclaimer =
  "Rowland's AI can make mistakes - it remains your responsibility to perform due diligence before acting on any information provided here."
const placeholder = "Ask your question here"

export default function Home() {
  const [messages, setMessages] = useState([])
  const [references, setReferences] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [input, setInput] = useState("")
  const [socket, setSocket] = useState(null)
  const chatRef = useRef(null)
  useEffect(() => {
    if (socket === null) {
      const newSocket = new WebSocket(API_URL)
      setSocket(newSocket)
      newSocket.onopen = () => {
        console.log("WebSocket connection established")
      }
      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("received data", data)
        if (data.response) {
          setIsProcessing(false)
          setMessages((prev) => [
            ...prev,
            { sender: "ai", content: data.response },
          ])
        } else if (data.reference) {
          setReferences((prev) => [...prev, data.reference])
        }
      }
      newSocket.onclose = () => {
        console.error("Socket closed unexpectedly")
      }
    }
  }, [socket])
  const sendMessage = () => {
    if (input.trim() === "") return
    const newMessage = { sender: "user", content: input }
    setIsProcessing(true)
    setMessages((prev) => [...prev, newMessage])
    const payload = {
      question: input,
      chat_history: messages.map(({ sender, content }) => ({
        human: sender === "user" ? content : null,
        ai: sender === "ai" ? content : null,
      })),
    }
    console.log("Sending payload:", payload)
    socket.send(JSON.stringify(payload))
    setReferences([])
    setInput("")
  }
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, references])
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 p-4">
        <ChatList />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <ChatMessage message={greeting} sender="ai" timestamp={"now()"}>
                <Image src="/rowbot.png" width={60} height={60} alt="RowlandAI" />
            </ChatMessage>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.content}
                isUser={msg.sender == "user"}
                sender={msg.sender}
                timestamp={msg.timestamp}
              />
            ))}
            {isProcessing && <ChatMessage
                isUser={false}
                sender={'Processing..'}
              >
                <Image src="/rowbot.png" width={40} height={40} alt="RowlandAI" />
            </ChatMessage>}
            <div className="mt-auto">
                {references.length > 0 && <b className="pl-4">References</b>}
                {references.map((reference, index) => {
                return <ReferenceCard key={index} reference={reference} />
                })}
            </div>
            
          </div>
          <div ref={chatRef} />
          <ChatInput
            placeholder={placeholder}
            value={input}
            setInput={setInput}
            sendMessage={sendMessage}
            disclaimer={disclaimer}
          />
        </div>
      </div>
    </div>
  )
}
