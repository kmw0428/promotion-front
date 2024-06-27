import React, { useEffect, useRef, useState } from "react";
import { askChatbot } from "../services/api";

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return; // 빈 메시지일 경우 전송하지 않음

    const userMessage: ChatMessage = { sender: "user", text: message };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setMessage(""); // 메시지 전송 후 입력 필드를 비웁니다.

    try {
      const botResponse = await askChatbot(message);
      const botMessage: ChatMessage = { sender: "bot", text: botResponse };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chat-interface">
      <div className="chatheader">Chat Bot</div>
      <div className="chatbody" ref={chatBodyRef}>
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chatmessage ${chat.sender}`}>
            {chat.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="질문을 입력하세요"
        className="chatinput"
      />
      <button onClick={handleSend} className="chatbutton">전송</button>
    </div>
  );
};

export default ChatBot;
