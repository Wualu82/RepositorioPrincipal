import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  // 🔥 TÍTULO DE LA PESTAÑA
  useEffect(() => {
    document.title = "Dashboard | Clínica Vitalia";
  }, []);

  return (
    <Layout>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          🏥 Dashboard
        </h1>

        <p className="mb-6 text-gray-600">
          Bienvenido a la clínica
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* MIS CITAS */}
          <div
            onClick={() => navigate("/citas")}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">📅 Mis citas</h2>
            <p className="text-gray-500">
              Ver y gestionar tus citas
            </p>
          </div>

          {/* NUEVA CITA */}
          <div
            onClick={() => navigate("/citas/nueva")}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-lg font-semibold">➕ Nueva cita</h2>
            <p className="text-gray-500">
              Reservar una nueva cita
            </p>
          </div>

          {/* 🔥 CALENDARIO */}
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

      </div>

    </Layout>
  );
};

export default Dashboard;