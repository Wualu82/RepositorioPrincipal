const API_URL = "http://localhost:8080/medicos";

export const getMedicos = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) throw new Error("Error al obtener médicos");

  return res.json();
};

export const getMedicoById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) throw new Error("Error al obtener médico");

  return res.json();
};