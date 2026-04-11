const API_URL = "http://localhost:8080";

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  console.log("🔥 TOKEN ENVIADO:", token); // DEBUG

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 CLAVE
      ...options.headers,
    },
  });

  if (!response.ok) {
    console.error("❌ ERROR BACKEND:", response.status);
    throw new Error("Error en la petición");
  }

  return response.json();
};