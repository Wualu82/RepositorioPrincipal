import { fetchWithAuth } from "./apiClient";

export const getMedicos = async () => {
  return await fetchWithAuth("/medicos");
};