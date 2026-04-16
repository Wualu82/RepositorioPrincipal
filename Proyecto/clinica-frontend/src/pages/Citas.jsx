import { useEffect, useState } from "react";
import { getMisCitas, cancelarCita } from "../api/citas";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarHistorial, setMostrarHistorial] = useState(false); // 🔥 NUEVO

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
      toast.success("Cita cancelada correctamente");
      cargarCitas();
    } catch (error) {
      console.error(error);
      toast.error("Error al cancelar cita");
    }
  };

  const ahora = new Date();

  // 🔥 SEPARAR
  const citasFuturas = citas.filter(c => new Date(c.fecha) >= ahora);
  const citasPasadas = citas.filter(c => new Date(c.fecha) < ahora);

  // 🔥 ORDENAR
  const ordenarPorFecha = (lista) => {
    return [...lista].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  };

  // 🔥 AGRUPAR + ORDENAR
  const agruparPorDia = (lista) => {
    const ordenadas = ordenarPorFecha(lista);

    return ordenadas.reduce((acc, cita) => {
      const fecha = new Date(cita.fecha).toLocaleDateString();

      if (!acc[fecha]) acc[fecha] = [];
      acc[fecha].push(cita);

      return acc;
    }, {});
  };

  const citasFuturasAgrupadas = agruparPorDia(citasFuturas);
  const citasPasadasAgrupadas = agruparPorDia(citasPasadas);

  return (
    <Layout>

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📅 Área personal</h1>

          <button
            onClick={() => navigate("/citas/nueva")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ➕ Nueva cita
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {/* 🔥 CITAS FUTURAS */}
        <h2 className="text-lg font-semibold mb-4">Próximas citas</h2>

        {Object.keys(citasFuturasAgrupadas).length === 0 ? (
          <p className="text-gray-500 mb-6">No tienes citas próximas</p>
        ) : (
          Object.entries(citasFuturasAgrupadas).map(([fecha, citasDia]) => (
            <div key={fecha} className="mb-6">

              <h3 className="font-bold mb-2">📅 {fecha}</h3>

              <div className="space-y-4">
                {citasDia.map((cita) => (
                  <div
                    key={cita.id}
                    className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">
                        {cita.medico?.especialidad?.nombre} —{" "}
                        {cita.medico?.nombre} {cita.medico?.apellido}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(cita.fecha).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-sm mt-1">
                        Estado:{" "}
                        <span className={
                          cita.estado === "CANCELADA"
                            ? "text-red-500"
                            : cita.estado === "CONFIRMADA"
                            ? "text-green-600"
                            : "text-gray-500"
                        }>
                          {cita.estado}
                        </span>
                      </p>
                    </div>

                    {cita.estado !== "CANCELADA" && (
                      <button
                        onClick={() => handleCancelar(cita.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          ))
        )}

        {/* 🔥 BOTÓN HISTORIAL */}
        {citasPasadas.length > 0 && (
          <div className="mt-8">

            <button
              onClick={() => setMostrarHistorial(!mostrarHistorial)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {mostrarHistorial ? "Ocultar historial" : "🕓 Ver historial de citas"}
            </button>

            {/* 🔥 HISTORIAL DESPLEGABLE */}
            {mostrarHistorial && (
              <div className="mt-6">

                <h2 className="text-lg font-semibold mb-4">
                  Historial de citas
                </h2>

                {Object.entries(citasPasadasAgrupadas).map(([fecha, citasDia]) => (
                  <div key={fecha} className="mb-6">

                    <h3 className="font-bold mb-2 text-gray-500">
                      {fecha}
                    </h3>

                    <div className="space-y-4">
                      {citasDia.map((cita) => (
                        <div
                          key={cita.id}
                          className="bg-gray-100 p-5 rounded-xl shadow flex justify-between items-center"
                        >
                          <div>
                            <p className="font-semibold text-gray-700">
                              {cita.medico?.especialidad?.nombre} —{" "}
                              {cita.medico?.nombre} {cita.medico?.apellido}
                            </p>

                            <p className="text-sm text-gray-500">
                              {new Date(cita.fecha).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>

                            <p className="text-sm mt-1 text-gray-500">
                              Estado: {cita.estado}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </div>

    </Layout>
  );
};

export default Citas;