import React, { useState } from "react";
import { sendMessage } from "../services/api";
import axios from "axios";
import "../styles/ChatBox.css";

const API_BASE = "http://127.0.0.1:5000"; // Flask backend

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [assignedEmployee, setAssignedEmployee] = useState(null);
  const [isTalkingToAI, setIsTalkingToAI] = useState(true);
  const CLIENT_ID = 4; // replace this with logged-in client id when login connects later

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return;

    // Show user's message immediately
    const newMsg = { sender: "You", text: input };
    setMessages((prev) => [...prev, newMsg]);

    try {
      if (isTalkingToAI) {
        // --- Send message to AI ---
        const res = await sendMessage(CLIENT_ID, input);
        setMessages((prev) => [
          ...prev,
          { sender: "Ruri AI", text: res.response },
        ]);

        // --- If AI says human needed ---
        if (res.human_needed) {
          const assign = await axios.post(`${API_BASE}/chat/request-human`, {
            user_id: CLIENT_ID,
          });

          // ✅ Update assigned employee details
          setAssignedEmployee({
            id: assign.data.assigned_employee,
            name: assign.data.assigned_name,
          });

          // Switch to human chat
          setIsTalkingToAI(false);

          // Display connection message
          setMessages((prev) => [
            ...prev,
            {
              sender: "System",
              text: `You are now connected to ${assign.data.assigned_name}.`,
            },
          ]);
        }
      } else {
        // --- Send message directly to assigned employee ---
        await axios.post(`${API_BASE}/chat/client/send`, {
          client_id: CLIENT_ID, // ✅ Correct field name
          employee_id: assignedEmployee.id,
          message: input,
        });

        // Confirm delivery visually
        setMessages((prev) => [
          ...prev,
          {
            sender: assignedEmployee.name,
            text: "(Message delivered to employee)",
          },
        ]);
      }
    } catch (err) {
      console.error("💥 Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "System", text: "⚠️ Message could not be sent." },
      ]);
    }

    setInput(""); // Clear input box
  };

  return (
    <div className="chatbox">
      <div className="chatbox-header">
        {isTalkingToAI
          ? "💬 Chat with Ruri AI"
          : `👩‍💼 Chat with ${assignedEmployee?.name || "Employee"}`}
      </div>

      <div className="chatbox-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg ${
              msg.sender === "You" ? "client-msg" : "other-msg"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbox-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
