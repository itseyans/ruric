import React, { useState, useEffect, useRef } from "react";
import {
  getEmployeeAssignedChats,
  getChatWithClient,
  sendEmployeeMessageToClient,
  getMessagesFromAdmin,
} from "../../services/api";
import "../../styles/ChatInterface.css";

function EmployeeMessages() {
  const EMPLOYEE_ID = 1; // replace with logged-in user ID dynamically
  const [clients, setClients] = useState([]);
  const [activeClient, setActiveClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [adminMessages, setAdminMessages] = useState([]);
  const [view, setView] = useState("clients"); // "clients" | "admin"
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      const data = await getEmployeeAssignedChats(EMPLOYEE_ID);
      setClients(data);
    };
    fetchClients();

    const fetchAdminMessages = async () => {
      const msgs = await getMessagesFromAdmin(EMPLOYEE_ID);
      setAdminMessages(msgs);
    };
    fetchAdminMessages();
  }, []);

  const loadChat = async (clientId) => {
    setActiveClient(clientId);
    const data = await getChatWithClient(EMPLOYEE_ID, clientId);
    setMessages(data);
  };

  const handleSend = async () => {
    if (!messageInput.trim()) return;
    await sendEmployeeMessageToClient(EMPLOYEE_ID, activeClient, messageInput);
    setMessages((prev) => [
      ...prev,
      {
        sender_id: EMPLOYEE_ID,
        receiver_id: activeClient,
        message: messageInput,
        created_at: new Date().toISOString(),
      },
    ]);
    setMessageInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="employee-chat-page">
      <div className="employee-chat-header">
        <h2>📨 Messages</h2>
        <div className="view-toggle">
          <button
            className={view === "clients" ? "active" : ""}
            onClick={() => setView("clients")}
          >
            Client Chats
          </button>
          <button
            className={view === "admin" ? "active" : ""}
            onClick={() => setView("admin")}
          >
            From Admin
          </button>
        </div>
      </div>

      <div className="employee-chat-body">
        {view === "clients" ? (
          <div className="chat-interface">
            {/* Sidebar */}
            <aside className="chat-sidebar">
              <h4> Assigned Clients</h4>
              {clients.length === 0 ? (
                <p className="empty">No assigned clients.</p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.user_id}
                    className={`client-card ${
                      activeClient === client.user_id ? "active" : ""
                    }`}
                    onClick={() => loadChat(client.user_id)}
                  >
                    <div className="client-details">
                      <strong>{client.full_name}</strong>
                      <small>Assigned Client</small>
                    </div>
                  </div>
                ))
              )}
            </aside>

            {/* Chat main window */}
            <section className="chat-window">
              {activeClient ? (
                <>
                  <div className="message-thread">
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`bubble ${
                          msg.sender_id === EMPLOYEE_ID ? "sent" : "received"
                        }`}
                      >
                        <p>{msg.message}</p>
                        <span>
                          {new Date(msg.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="message-input">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <button onClick={handleSend}>Send</button>
                  </div>
                </>
              ) : (
                <div className="no-client-selected">
                  <p>Select a client to open a chat.</p>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="admin-messages-view">
            <h3>Messages from Admin</h3>
            {adminMessages.length === 0 ? (
              <p>No messages yet from Admin.</p>
            ) : (
              <div className="admin-message-thread">
                {adminMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`bubble ${
                      msg.sender_id === 3 ? "received admin" : "sent"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <span>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeMessages;