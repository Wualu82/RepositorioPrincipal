import { Link, useNavigate } from "react-router-dom";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

        <h1 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
          🏥 Clínica
        </h1>

        <div className="flex gap-6 items-center">

          <Link to="/">Inicio</Link>
          <Link to="/servicios">Servicios</Link>
          <Link to="/equipo">Equipo</Link>
          <Link to="/clinica">La clínica</Link>
          <Link to="/trabaja">Trabaja con nosotros</Link>

          <button
            onClick={() => navigate("/login")}
            className="text-blue-600"
          >
            Área personal
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Pedir cita
          </button>

        </div>

      </nav>

      {/* CONTENIDO */}
      <main className="p-6">
        {children}
      </main>

    </div>
  );
};

export default PublicLayout;