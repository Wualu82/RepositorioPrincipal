const API_URL = "http://localhost:8080/auth";

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    throw new Error("Error en login");
  }

  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await response.json(); // 🔥 IMPORTANTE

  if (!response.ok) {
    throw data; // 🔥 AQUÍ ESTÁ LA MAGIA
  }

  return data;
};