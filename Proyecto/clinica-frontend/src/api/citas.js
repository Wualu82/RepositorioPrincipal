import { fetchWithAuth } from "./apiClient";

export const getMisCitas = async () => {
  return await fetchWithAuth("/citas/mis-citas");
};

export const crearCita = async (citaData) => {
  return await fetchWithAuth("/citas", {
    method: "POST",
    body: JSON.stringify(citaData),
  });
};

export const cancelarCita = async (id) => {
  return await fetchWithAuth(`/citas/cancelar/${id}`, {
    method: "PUT",
  });
};

export const getHorasDisponibles = async (medicoId, fecha) => {
  return await fetchWithAuth(
    `/citas/disponibles?medicoId=${medicoId}&fecha=${fecha}`
  );
};

export const getTodasCitas = async () => {
  return await fetchWithAuth("/citas");
};

export const confirmarCita = async (id) => {
  return await fetchWithAuth(`/citas/confirmar/${id}`, {
    method: "PUT",
  });
};