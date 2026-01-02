// API base URL (demo frontend)
const API_URL = "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(endpoint, method = "GET", body = null, auth = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (auth) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  const response = await fetch(API_URL + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return response.json();
}
