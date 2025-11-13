const API_URL = import.meta.env.VITE_API_BASE_URL;

/* =======================
   AUTHENTICATION
======================= */
export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const signupUser = async (data) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProfile = async (data) => {
  const res = await fetch(`${API_URL}/update_profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const changePassword = async (data) => {
  const res = await fetch(`${API_URL}/change_password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

/* =======================
   CATALOG / ORDERS
======================= */
export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
};

export const getOrdersForUser = async (user_id) => {
  const res = await fetch(`${API_URL}/orders/${user_id}`);
  return res.json();
};

export const getAllClientOrders = async () => {
  const res = await fetch(`${API_URL}/orders/all`);
  return res.json();
};

/* =======================
   ATTENDANCE
======================= */
export const getAttendance = async () => {
  const res = await fetch(`${API_URL}/attendance`);
  return res.json();
};

// ===== Attendance =====
export const getAttendanceForEmployee = async (employee_id) => {
  const res = await fetch(`${API_URL}/attendance/${employee_id}`);
  return res.json();

export const markAttendance = async (employee_id, status) => {
  const res = await fetch(`${API_URL}/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id, status }),
  });
  return res.json();
};

/* =======================
   RATINGS
======================= */
export const getRatings = async () => {
  const res = await fetch(`${API_URL}/ratings`);
  return res.json();
};

/* =======================
   CLIENT ↔ AI CHAT
======================= */
export const sendMessage = async (sender_id, message) => {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender_id, message }),
  });
  return res.json();
};

/* =======================
   CLIENT ↔ EMPLOYEE SUPPORT
======================= */

// ✅ Get assigned clients for a specific employee
export async function getEmployeeAssignedChats(employeeId) {
  try {
    const res = await fetch(`${API_URL}/employee/${employeeId}/assignments`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("💥 getEmployeeAssignedChats error:", err);
    return [];
  }
}

// ✅ Fetch full chat history between employee and client
export async function getChatWithClient(employeeId, clientId) {
  try {
    const res = await fetch(`${API_URL}/chat/employee/${employeeId}/client/${clientId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("💥 getChatWithClient error:", err);
    return [];
  }
}

// ✅ Employee sends message to client
export async function sendEmployeeMessageToClient(employeeId, clientId, message) {
  try {
    const res = await fetch(`${API_URL}/chat/employee/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employee_id: employeeId, client_id: clientId, message }),
    });
    return await res.json();
  } catch (err) {
    console.error("💥 sendEmployeeMessageToClient error:", err);
    return { error: "Failed to send" };
  }
}

/* =======================
   ADMIN ↔ EMPLOYEE CHAT
======================= */
export const getEmployees = async () => {
  const res = await fetch(`${API_URL}/employees`);
  return res.json();
};

export const getAdminChatHistory = async (employee_id) => {
  const res = await fetch(`${API_URL}/chat/admin/${employee_id}`);
  return res.json();
};

export const sendEmployeeMessageToAdmin = async (sender_id, message) => {
  const res = await fetch(`${API_URL}/chat/admin/employee-to-admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender_id, message }),
  });
  return res.json();
};

export const sendAdminMessageToEmployee = async (sender_id, receiver_id, message) => {
  const res = await fetch(`${API_URL}/chat/admin/admin-to-employee`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sender_id, receiver_id, message }),
  });
  return res.json();
};

// ===== Admin Dashboard =====
export const getAdminSummary = async () => {
  const res = await fetch(`${API_URL}/admin/summary`);
  return res.json();
};

// ===== Admin ↔ Employee Messaging =====
export const getAdminEmployees = async () => {
  const res = await fetch(`${API_URL}/admin/employees`);
  return res.json();
};

export const getAdminEmployeeChat = async (employee_id) => {
  const res = await fetch(`${API_URL}/admin/chat/${employee_id}`);
  return res.json();
};

export const sendAdminMessage = async (employee_id, message) => {
  const res = await fetch(`${API_URL}/admin/chat/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id, message }),
  });
  return res.json();
};

// ===== Admin Attendance + Ratings =====
export const getAdminAttendanceSummary = async () => {
  const res = await fetch(`${API_URL}/admin/attendance`);
  return res.json();
};

export const getAdminEmployeeRatings = async () => {
  const res = await fetch(`${API_URL}/admin/employee_ratings`);
  return res.json();
};

// ✅ Employee fetches messages from Admin
export const getMessagesFromAdmin = async (employee_id) => {
  const res = await fetch(`${API_URL}/chat/admin/${employee_id}`);
  return res.json();
};
