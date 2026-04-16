import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStats } from "../api/citas";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  // 🔥 TÍTULO
  useEffect(() => {
    document.title = "Dashboard | Clínica Vitalia";
    cargarStats();
  }, []);

  const cargarStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Error cargando stats:", error);
    }
  };

  return (
    <Layout>

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          🏥 Área personal
        </h1>

        <p className="mb-6 text-gray-600">
          Bienvenido a Clínica Vitalia
        </p>

        {/* 🔥 ACCESOS RÁPIDOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          <div
            onClick={() => navigate("/citas")}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">📅 Mis citas</h2>
            <p className="text-gray-500">
              Ver y gestionar tus citas
            </p>
          </div>

          <div
            onClick={() => navigate("/citas/nueva")}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">➕ Nueva cita</h2>
            <p className="text-gray-500">
              Reservar una nueva cita
            </p>
          </div>

          <div
            onClick={() => navigate("/calendario")}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">📊 Calendario</h2>
            <p className="text-gray-500">
              Visualizar citas en calendario
            </p>
          </div>

        </div>

        {/* 🔥 SOLO SI HAY STATS */}
        {stats && (
          <>
            {/* TARJETAS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-gray-500">Total</p>
                <h2 className="text-xl font-bold">{stats.total}</h2>
              </div>

              <div className="bg-green-100 p-4 rounded-xl text-center">
                <p>Confirmadas</p>
                <h2 className="font-bold">{stats.confirmadas}</h2>
              </div>

              <div className="bg-red-100 p-4 rounded-xl text-center">
                <p>Canceladas</p>
                <h2 className="font-bold">{stats.canceladas}</h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl text-center">
                <p>Hoy</p>
                <h2 className="font-bold">{stats.hoy}</h2>
              </div>

            </div>

            {/* GRÁFICO */}
            <div className="bg-white p-6 rounded-xl shadow">

              <h2 className="mb-4 font-semibold">
                📈 Estadísticas de citas
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Total", value: stats.total },
                    { name: "Confirmadas", value: stats.confirmadas },
                    { name: "Canceladas", value: stats.canceladas },
                    { name: "Hoy", value: stats.hoy },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>

            </div>
          </>
        )}

      </div>

    </Layout>
  );
};

export default Dashboard;