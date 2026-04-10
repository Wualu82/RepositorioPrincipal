import { useEffect, useState } from "react";
import { getMisCitas, cancelarCita } from "../api/citas";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const cargarCitas = async () => {
    try {
      const data = await getMisCitas();
      setCitas(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar las citas");
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleCancelar = async (id) => {
    try {
      await cancelarCita(id);
      cargarCitas();
    } catch (error) {
      alert("Error al cancelar cita");
    }
  };

  return (
    <Layout>

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📅 Mis citas</h1>

          <button
            onClick={() => navigate("/citas/nueva")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Nueva cita
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">

          {citas.length === 0 ? (
            <p className="text-gray-500">No tienes citas</p>
          ) : (
            citas.map((cita) => (
              <div
                key={cita.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >

                {/* INFO */}
                <div>

                  {/* MÉDICO + ESPECIALIDAD */}
                  <p className="font-semibold text-lg">
                    {cita.medico?.especialidad?.nombre} — {cita.medico?.nombre} {cita.medico?.apellido}
                  </p>

                  {/* FECHA BONITA */}
                  <p className="text-sm text-gray-500">
                    {new Date(cita.fecha).toLocaleDateString()} ·{" "}
                    {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>

                  {/* ESTADO */}
                  <p className="text-sm mt-1">
                    Estado:{" "}
                    <span
                      className={`font-medium ${
                        cita.estado === "CANCELADA"
                          ? "text-red-500"
                          : cita.estado === "CONFIRMADA"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {cita.estado}
                    </span>
                  </p>

                </div>

                {/* BOTÓN */}
                {cita.estado !== "CANCELADA" && (
                  <button
                    onClick={() => handleCancelar(cita.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                )}

              </div>
            ))
          )}

        </div>

      </div>

    </Layout>
  );
};

export default Citas;