import { useEffect, useState } from "react";
import { getMisCitas } from "../api/citas";
import Layout from "../components/Layout";

const HistorialCitas = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getMisCitas();

        // 🔥 SOLO PASADAS
        const ahora = new Date();
        const pasadas = data.filter(c => new Date(c.fecha) < ahora);

        setCitas(pasadas);

      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las citas");
      }
    };

    cargar();
  }, []);

  // 🔥 AGRUPAR POR DÍA
  const agruparPorDia = (lista) => {
    return lista.reduce((acc, cita) => {
      const fecha = new Date(cita.fecha).toLocaleDateString();

      if (!acc[fecha]) {
        acc[fecha] = [];
      }

      acc[fecha].push(cita);

      return acc;
    }, {});
  };

  const citasAgrupadas = agruparPorDia(citas);

  return (
    <Layout>

      <div className="max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          🕓 Historial de citas
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        {Object.keys(citasAgrupadas).length === 0 ? (
          <p className="text-gray-500">No tienes citas anteriores</p>
        ) : (
          Object.entries(citasAgrupadas).map(([fecha, citasDia]) => (
            <div key={fecha} className="mb-6">

              <h2 className="text-lg font-bold mb-2 text-gray-600">
                {fecha}
              </h2>

              <div className="space-y-4">
                {citasDia.map((cita) => (
                  <div
                    key={cita.id}
                    className="bg-gray-100 p-5 rounded-xl shadow flex justify-between items-center"
                  >

                    <div>
                      <p className="font-semibold text-lg text-gray-700">
                        {cita.medico?.especialidad?.nombre || "Especialidad"} —{" "}
                        {cita.medico?.nombre || ""} {cita.medico?.apellido || ""}
                      </p>

                      <p className="text-sm text-gray-500">
                        {new Date(cita.fecha).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-sm mt-1 text-gray-500">
                        Estado: {cita.estado || "N/A"}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))
        )}

      </div>

    </Layout>
  );
};

export default HistorialCitas;