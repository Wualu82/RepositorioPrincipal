import { fetchWithAuth } from "./apiClient";

// 👤 MIS CITAS
export const getMisCitas = async () => {
  return await fetchWithAuth("/citas/mis-citas");
};

// ➕ CREAR CITA
export const crearCita = async (citaData) => {
  return await fetchWithAuth("/citas", {
    method: "POST",
    body: JSON.stringify(citaData),
  });
};

// ❌ CANCELAR
export const cancelarCita = async (id) => {
  return await fetchWithAuth(`/citas/cancelar/${id}`, {
    method: "PUT",
  });
};

// 🔥 HORAS DISPONIBLES (ESTA ES LA CLAVE)
export const getHorasDisponibles = async (medicoId, fecha) => {
  return await fetchWithAuth(
    `/citas/disponibles?medicoId=${medicoId}&fecha=${fecha}`
  );
};

// 👑 ADMIN
export const getTodasCitas = async () => {
  return await fetchWithAuth("/citas");
};

// 📊 STATS
export const getStats = async () => {
  return await fetchWithAuth("/citas/stats");
};