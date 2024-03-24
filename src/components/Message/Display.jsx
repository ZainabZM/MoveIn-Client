import React, { useState, useEffect } from "react";
import "./Display.css";
import Input from "./Input";

function Display({ conversation }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Set messages when conversation changes
    setMessages(conversation.messages);
  }, [conversation]);

  const renderHour = (timestamp) => {
    const messageDate = new Date(timestamp);
    const hour = messageDate.getHours();
    const minute = messageDate.getMinutes();
    return `${hour}:${minute < 10 ? "0" + minute : minute}`;
  };

  const handleSubmit = async (messageContent) => {
    try {
      // Make the API call to save the message in the database
      const token = localStorage.getItem("@TokenUser");
      const userId = localStorage.getItem("userId");

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: messageContent,
          sender_id: userId,
          recipient_id: conversation.user.id,
        }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/send`,
        options
      );

      if (!response.ok) {
        throw new Error("Failed to save message");
      }

      // Fetch updated conversation with new message
      const updatedConversationResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/conversation/${userId}/${
          conversation.user.id
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!updatedConversationResponse.ok) {
        throw new Error("Failed to fetch updated conversation");
      }

      const updatedConversationData = await updatedConversationResponse.json();
      setMessages(updatedConversationData.messages);

      setInputValue(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  return (
    <div className="display">
      <div className="user-banner">
        <img
          src="src\files\userlogo.png"
          alt="User Logo"
          className="user-logo"
        />
        <p className="username">{conversation.user.username}</p>
      </div>
      <div className="conversation-details">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container ${
              message.sender_id === conversation.user.id
                ? "sent-message-container"
                : "received-message-container"
            }`}
          >
            <div
              className={`message ${
                message.sender_id === conversation.user.id
                  ? "sent-message"
                  : "received-message"
              }`}
            >
              <p>{message.message}</p>
            </div>
            <div className="message-info">
              {message.sender_id !== conversation.user.id ? (
                <p className="message-sender">You</p>
              ) : (
                <p className="message-recipient">
                  {conversation.user.username}
                </p>
              )}
              <p className="message-time">{renderHour(message.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
      <Input onSubmit={handleSubmit} />
    </div>
  );
}

export default Display;
