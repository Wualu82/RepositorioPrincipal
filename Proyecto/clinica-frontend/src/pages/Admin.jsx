import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { getStats } from "../api/citas";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    cargarStats();
  }, []);

  const cargarStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) return <p className="p-6">Cargando estadísticas...</p>;

  const chartData = [
    { name: "Confirmadas", value: stats.confirmadas },
    { name: "Canceladas", value: stats.canceladas },
  ];

  return (
    <Layout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          📊 Panel de Administración
        </h1>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Total citas</p>
            <h2 className="text-2xl font-bold">{stats.total}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Citas hoy</p>
            <h2 className="text-2xl font-bold">{stats.hoy}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Confirmadas</p>
            <h2 className="text-2xl font-bold text-green-600">
              {stats.confirmadas}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">Canceladas</p>
            <h2 className="text-2xl font-bold text-red-600">
              {stats.canceladas}
            </h2>
          </div>

        </div>

        {/* 🔥 GRÁFICA */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-lg font-semibold mb-4">
            Distribución de citas
          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  <Cell fill="#16a34a" />
                  <Cell fill="#dc2626" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Admin;