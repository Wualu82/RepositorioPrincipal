const API_URL = "http://localhost:8080";

export const getMedicos = async () => {
  const response = await fetch(`${API_URL}/medicos`);

  if (!response.ok) {
    throw new Error("Error al obtener médicos");
  }

  return response.json();
};