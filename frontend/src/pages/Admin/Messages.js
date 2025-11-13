import React, { useEffect, useState, useRef } from "react";
import {
  getAdminEmployees,
  getAdminEmployeeChat,
  sendAdminMessage,
} from "../../services/api";
import "../../styles/AdminMessages.css";

function AdminMessages() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await getAdminEmployees();
      setEmployees(data);
    };
    loadEmployees();
  }, []);

  const loadChat = async (id) => {
    setSelectedEmployee(id);
    const data = await getAdminEmployeeChat(id);
    setMessages(data);
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedEmployee) return;
    await sendAdminMessage(selectedEmployee, input);
    setInput("");
    const updated = await getAdminEmployeeChat(selectedEmployee);
    setMessages(updated);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="admin-messages-page">
      <div className="admin-messages-container">
        {/* Sidebar */}
        <div className="admin-messages-sidebar">
          <h3>Employees</h3>
          <div className="employee-list">
            {employees.map((e) => (
              <div
                key={e.user_id}
                className={`employee-card ${
                  selectedEmployee === e.user_id ? "active" : ""
                }`}
                onClick={() => loadChat(e.user_id)}
              >
                <div className="employee-avatar">
                  {e.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="employee-info">
                  <p className="employee-name">{e.full_name}</p>
                  <p className="employee-role">Employee</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="admin-chat-box">
          {selectedEmployee ? (
            <>
              <div className="chat-header">
                <h4>
                  Chat with{" "}
                  {
                    employees.find((e) => e.user_id === selectedEmployee)
                      ?.full_name
                  }
                </h4>
              </div>

              <div className="chat-body">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`chat-message ${
                      msg.sender_id === 3 ? "sent" : "received"
                    }`}
                  >
                    <div className="chat-bubble">
                      <p>{msg.message}</p>
                      <span className="timestamp">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select an employee to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMessages;