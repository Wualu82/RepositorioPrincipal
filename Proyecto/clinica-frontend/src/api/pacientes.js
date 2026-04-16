const API_URL = "http://localhost:8080/pacientes";

export const getPacientes = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Error al obtener pacientes");
  }

  return response.json();
};