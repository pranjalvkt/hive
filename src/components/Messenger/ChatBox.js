import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { useSelector } from "react-redux";
import { baseURL, getMessagess } from "../../services/chatService";
import ChatHeader from "./ChatHeader";
import { calculateTimeAgo, getImage } from "../../helper/utilities";
import useChatContext from "../../context/ChatContext";
import EmojiPicker from 'emoji-picker-react';

const ChatBox = () => {
  const {
    roomId,
    connected,
    setConnected,
    setRoomId,
  } = useChatContext();

  const naviagte = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!connected) {
      naviagte("/chat");
    }
  }, [connected, naviagte, user]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const fetchedMessages = await getMessagess(roomId);        
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, [connected, roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let client;
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };
    
    if (connected) {
      connectWebSocket();
    }

    return () => {
      if (client) {
        client?.disconnect();
      }
    };
  }, [connected, roomId]);

  const sendMessage = async () => {
    setShowEmojiPicker(false);
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: user.user_id,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  function handleLogout() {
    stompClient?.disconnect();
    setConnected(false);
    setRoomId("");
  }

  const addEmoji = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  const MessageStatus = ({ status }) => {
    if (status === "sent") return <BsCheck className="text-gray-500" />;
    if (status === "delivered") return <BsCheckAll className="text-gray-500" />;
    if (status === "read") return <BsCheckAll className="text-blue-500" />;
    return null;
  };

  return (
    <div className="bg-gray-50">
      <div className="h-screen w-full bg-gray-50 flex flex-col">
        <ChatHeader
          handleLogout={handleLogout}
          roomName={roomId}
        />
        <div className="flex-1 overflow-y-auto p-2 xs:p-4 space-y-2 xs:space-y-4 bg-gray-50">
          {messages.length > 0 && messages?.map((message) => (
            <div
              key={message.timeStamp}
              className={`flex ${
                message.userId === user?.user_id ? "justify-end" : "justify-start"
              } items-end space-x-1 xs:space-x-2`}
            >
              {message.userId !== user?.user_id && (
                <img
                  src={getImage(message?.senderProfilePicture)}
                  alt={message?.senderName}
                  className="w-8 h-8 xs:w-10 xs:h-10 rounded-full"
                />
              )}
              <div className="flex flex-col">
                <span className="text-xs xs:text-sm text-gray-600 mb-1 ml-2">
                  {message?.senderName}
                </span>
                <div
                  className={`max-w-[95%] xs:max-w-[85%] md:max-w-[70%] lg:max-w-[60%] rounded-2xl p-2 xs:p-4 min-w-[120px] xs:min-w-[200px] bg-white text-gray-800 border border-gray-200`}
                >
                  <p className="text-xs xs:text-sm md:text-base break-words leading-relaxed my-0 px-2">
                    {message?.content}
                  </p>
                  <div className="flex justify-end mt-1 xs:mt-2 items-center space-x-1">
                    <span className={`text-[10px] xs:text-xs text-gray-500`}>
                      {calculateTimeAgo(message?.timeStamp)}
                    </span>
                    {message.sender === user?.user_id && (
                      <MessageStatus status={"read"} />
                    )}
                  </div>
                </div>
              </div>
              {message.userId === user?.user_id && (
                <img
                  src={getImage(message?.senderProfilePicture)}
                  alt={message.user_name}
                  className="w-8 h-8 xs:w-10 xs:h-10 rounded-full"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showEmojiPicker && (
          <div className="absolute bottom-20 right-4 z-10">
            <EmojiPicker onEmojiClick={addEmoji} theme="light" />
          </div>
        )}

        <div className="border-t bg-white p-2 xs:p-4">
          <div className="flex items-center space-x-1 xs:space-x-2 max-w-4xl mx-auto">
            <button
              className="p-1 xs:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Add attachment"
            >
              <FiPaperclip className="ww-5 h-5 xs:w-6 xs:h-6 text-gray-500" />
            </button>
            <button
              className="p-1 xs:p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Add emoji"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FiSmile className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-2 xs:p-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-200 text-black"
              aria-label="Message input"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="p-2 xs:p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <FiSend className="w-4 h-4 xs:w-5 xs:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
