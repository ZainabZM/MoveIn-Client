import React, { useState } from "react";
import { Link } from "react-router-dom";
import Display from "./Display";
import "./Conversation.css"; // Import the CSS stylesheet

function Conversation({ conversation, onClick }) {
  const [messages, setMessages] = useState([]);
  const latestMessage = conversation.messages[conversation.messages.length - 1]; // Get the last message
  let latestMessageHour = "";

  if (latestMessage) {
    const messageDate = new Date(latestMessage.created_at);
    const today = new Date();
    const isSameDay =
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear();

    if (isSameDay) {
      latestMessageHour = messageDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      latestMessageHour = `${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    }
  }

  const fetchMessages = async (userId1, userId2) => {
    try {
      const isToken = localStorage.getItem("@TokenUser");
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isToken}`,
        },
      };
      console.log("hi");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/conversation/${userId1}/${userId2}`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data.messages);
      console.log(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleClick = () => {
    const userId1 = localStorage.getItem("userId");
    const userId2 = conversation.user?.id; // Use optional chaining to handle potential undefined user
    if (userId2) {
      fetchMessages(userId1, userId2);
      // Pass the userId2 to handleClickConversation
      onClick(userId2); // Pass the clicked user ID to the parent component
    }
  };

  return (
    <div className="conversation" onClick={handleClick}>
      <div className="conversation-content">
        <div className="conversation-details">
          <p className="username">{conversation.user?.username}</p>{" "}
          {/* Use optional chaining */}
          {latestMessage && (
            <>
              <p className="message">{latestMessage.message}</p>
              <p className="timestamp">{latestMessageHour}</p>
            </>
          )}
        </div>
      </div>
      {/* <Display conversation={conversation} /> */}
    </div>
  );
}

export default Conversation;
