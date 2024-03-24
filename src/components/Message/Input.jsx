// Input.jsx
import React, { useState } from "react";

function Input({ onSubmit }) {
  const [messageContent, setMessageContent] = useState("");

  const handleChange = (event) => {
    setMessageContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (messageContent.trim() !== "") {
      onSubmit(messageContent);
      setMessageContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={messageContent}
        onChange={handleChange}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Input;
