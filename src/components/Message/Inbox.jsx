// Inbox.jsx
import React, { useState, useEffect } from "react";
import Conversation from "./Conversation";
import { Link, useParams } from "react-router-dom";
import Display from "./Display";

function Inbox() {
  const { id } = useParams(); // Get the user ID from the URL
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const isToken = localStorage.getItem("@TokenUser");
      const userId = localStorage.getItem("userId");
      if (isToken && userId) {
        try {
          const options = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isToken}`,
            },
          };

          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/conversations`,
            options
          );
          if (!response.ok) {
            throw new Error("Failed to fetch conversations");
          }
          const data = await response.json();
          setConversations(data.conversations);
          console.log(conversations);
        } catch (error) {
          console.error("Error fetching conversations:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleClickConversation = (index) => {
    console.log("Clicked conversation index:", index); // Log the clicked index
    setSelectedConversationIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedConversationIndex(null);
    setIsModalOpen(false);
  };

  // Function to update conversations after a new message is sent
  const updateConversations = (updatedConversation) => {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.id === updatedConversation.id) {
        return updatedConversation;
      } else {
        return conversation;
      }
    });
    setConversations(updatedConversations);
  };

  return (
    <div className="inbox-container">
      <div className="inbox">
        <h1>Inbox</h1>
        <div className="conversations-list">
          {conversations.length > 0 ? (
            conversations.map((conversation, index) => (
              <Conversation
                key={index} // Use index as key since user ID might not be available
                conversation={conversation}
                onClick={() => handleClickConversation(index)} // Pass the index of the clicked conversation
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <Display conversation={conversations[selectedConversationIndex]} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Inbox;
