import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  // 🔥 AQUÍ VA
  const rol = localStorage.getItem("rol");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          🏥 Clínica
        </h1>

        <div className="flex gap-4 items-center">

          <button
            onClick={() => navigate("/citas")}
            className="text-gray-700 hover:text-blue-600"
          >
            Mis citas
          </button>

          <button
            onClick={() => navigate("/citas/nueva")}
            className="text-gray-700 hover:text-blue-600"
          >
            Nueva cita
          </button>

          {/* 🔥 SOLO ADMIN VE ESTO */}
          {rol === "ADMIN" && (
            <button
              onClick={() => navigate("/admin")}
              className="text-gray-700 hover:text-blue-600"
            >
              Admin
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="p-6">
        {children}
      </div>

    </div>
  );
};

export default Layout;