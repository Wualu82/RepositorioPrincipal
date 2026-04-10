import { useEffect, useState } from "react";
import {
  getTodasCitas,
  cancelarCita,
  confirmarCita,
} from "../api/citas";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const Admin = () => {
  const [citas, setCitas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [busqueda, setBusqueda] = useState(""); // 🔥 NUEVO

  const cargarCitas = async () => {
    try {
      const data = await getTodasCitas();
      setCitas(data);
    } catch (error) {
      toast.error("Error cargando citas");
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleConfirmar = async (id) => {
    try {
      await confirmarCita(id);
      toast.success("Cita confirmada");
      cargarCitas();
    } catch (error) {
      toast.error("Error al confirmar cita");
    }
  };

  const handleCancelar = async (id) => {
    try {
      await cancelarCita(id);
      toast.success("Cita cancelada");
      cargarCitas();
    } catch (error) {
      toast.error("Error al cancelar cita");
    }
  };

  // 🔥 FILTRO + BUSCADOR
  const citasFiltradas = citas.filter((cita) => {
    const coincideEstado =
      filtroEstado === "TODOS" || cita.estado === filtroEstado;

    const texto = busqueda.toLowerCase();

    const coincideBusqueda =
      cita.paciente?.nombre?.toLowerCase().includes(texto) ||
      cita.paciente?.apellido?.toLowerCase().includes(texto) ||
      cita.medico?.nombre?.toLowerCase().includes(texto) ||
      cita.medico?.apellido?.toLowerCase().includes(texto) ||
      cita.medico?.especialidad?.nombre?.toLowerCase().includes(texto);

    return coincideEstado && coincideBusqueda;
  });

  return (
    <Layout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">
          👑 Panel Admin - Citas
        </h1>

        {/* 🔎 BUSCADOR */}
        <input
          type="text"
          placeholder="Buscar por paciente, médico o especialidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full mb-4 border p-2 rounded"
        />

        {/* FILTRO */}
        <div className="mb-6">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="TODOS">Todos</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="CONFIRMADA">Confirmadas</option>
            <option value="CANCELADA">Canceladas</option>
          </select>
        </div>

        <div className="space-y-4">

          {citasFiltradas.length === 0 ? (
            <p className="text-gray-500">No hay resultados</p>
          ) : (
            citasFiltradas.map((cita) => (
              <div
                key={cita.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >

                <div>

                  <p className="font-semibold">
                    {cita.medico?.especialidad?.nombre} — {cita.medico?.nombre} {cita.medico?.apellido}
                  </p>

                  <p className="text-sm text-gray-500">
                    Paciente: {cita.paciente?.nombre} {cita.paciente?.apellido}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(cita.fecha).toLocaleDateString()} ·{" "}
                    {new Date(cita.fecha).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <p className="text-sm">
                    Estado:{" "}
                    <span
                      className={
                        cita.estado === "CONFIRMADA"
                          ? "text-green-600"
                          : cita.estado === "CANCELADA"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                    >
                      {cita.estado}
                    </span>
                  </p>

                </div>

                <div className="flex gap-2">

                  {cita.estado === "PENDIENTE" && (
                    <button
                      onClick={() => handleConfirmar(cita.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Confirmar
                    </button>
                  )}

                  {cita.estado !== "CANCELADA" && (
                    <button
                      onClick={() => handleCancelar(cita.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Cancelar
                    </button>
                  )}

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </Layout>
  );
};

export default Admin;